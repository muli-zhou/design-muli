#!/usr/bin/env node
// Render a page at several widths with a locally installed Chrome, Chromium, Edge or Brave.
// No dependencies. Node 22+ uses the DevTools protocol (full-page, --dark, --scroll, --steps,
// --emulate-reduced-motion); older Node falls back to Chrome's --screenshot flag (viewport-height only).
//
// Usage:
//   node shot.mjs <url|file> [--widths 375,768,1280] [--out shots] [--name page]
//                 [--dark] [--viewport] [--height 900] [--scroll <px|bottom>]
//                 [--scale 1] [--wait 600] [--steps steps.json] [--emulate-reduced-motion]
//
// --steps runs a JSON array of steps after load, in order, at each width, and writes only the shots it asks for:
//   {"click": "css selector"}  {"hover": "selector"}  {"type": "selector", "text": "..."}
//   {"key": "Escape" | "Enter" | "Tab" | "ArrowDown" ...}  {"wait": 300}  {"scroll": 400 | "bottom"}
//   {"shot": "name"}            viewport screenshot ({"shot": "name", "full": true} for full page)
//   {"burst": {"name": "open", "frames": 4, "interval": 80}}   N viewport frames, for a transition's start, middle and end
// Env: CHROME_PATH overrides binary detection.

import { spawn, execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { basename, extname, join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

function parseArgs(argv) {
  const o = { widths: [375, 768, 1280], out: 'shots', dark: false, viewport: false, height: 0, scroll: null, scale: 1, wait: 600, steps: null, reduced: false };
  const rest = [];
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    const next = () => argv[++i];
    if (a === '--widths') o.widths = next().split(',').map(Number).filter(Boolean);
    else if (a === '--out') o.out = next();
    else if (a === '--name') o.name = next();
    else if (a === '--dark') o.dark = true;
    else if (a === '--viewport') o.viewport = true;
    else if (a === '--height') o.height = Number(next());
    else if (a === '--scroll') o.scroll = next();
    else if (a === '--scale') o.scale = Number(next());
    else if (a === '--wait') o.wait = Number(next());
    else if (a === '--steps') o.steps = next();
    else if (a === '--emulate-reduced-motion') o.reduced = true;
    else if (a === '-h' || a === '--help') o.help = true;
    else rest.push(a);
  }
  o.target = rest[0];
  return o;
}

function findChrome() {
  if (process.env.CHROME_PATH && existsSync(process.env.CHROME_PATH)) return process.env.CHROME_PATH;
  const p = process.platform;
  const candidates = [];
  if (p === 'darwin') {
    for (const app of ['Google Chrome', 'Chromium', 'Google Chrome Canary', 'Microsoft Edge', 'Brave Browser']) {
      candidates.push(`/Applications/${app}.app/Contents/MacOS/${app}`);
      candidates.push(join(process.env.HOME || '', `Applications/${app}.app/Contents/MacOS/${app}`));
    }
  } else if (p === 'win32') {
    const roots = [process.env.PROGRAMFILES, process.env['PROGRAMFILES(X86)'], process.env.LOCALAPPDATA].filter(Boolean);
    for (const r of roots) {
      candidates.push(join(r, 'Google/Chrome/Application/chrome.exe'));
      candidates.push(join(r, 'Chromium/Application/chrome.exe'));
      candidates.push(join(r, 'Microsoft/Edge/Application/msedge.exe'));
      candidates.push(join(r, 'BraveSoftware/Brave-Browser/Application/brave.exe'));
    }
  } else {
    for (const bin of ['google-chrome', 'google-chrome-stable', 'chromium', 'chromium-browser', 'microsoft-edge', 'brave-browser']) {
      try {
        const found = execFileSync('which', [bin], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
        if (found) candidates.push(found);
      } catch {}
    }
  }
  return candidates.find((c) => existsSync(c));
}

function toUrl(target) {
  if (/^[a-z][a-z0-9+.-]*:/i.test(target)) return target;
  return pathToFileURL(resolve(target)).href;
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// ---------- DevTools protocol path ----------
async function launchWithCdp(chrome) {
  const profile = mkdtempSync(join(tmpdir(), 'shot-'));
  const proc = spawn(chrome, [
    '--headless=new', '--remote-debugging-port=0', `--user-data-dir=${profile}`,
    '--no-first-run', '--no-default-browser-check', '--hide-scrollbars', '--disable-gpu', 'about:blank',
  ], { stdio: 'ignore' });
  const portFile = join(profile, 'DevToolsActivePort');
  for (let i = 0; i < 100 && !existsSync(portFile); i++) await sleep(100);
  if (!existsSync(portFile)) throw new Error('Chrome did not open a debugging port');
  const [port] = readFileSync(portFile, 'utf8').split('\n');
  const list = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
  const page = list.find((t) => t.type === 'page');
  const ws = new WebSocket(page.webSocketDebuggerUrl);
  await new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej; });
  let id = 0;
  const pending = new Map();
  const listeners = [];
  ws.onmessage = (ev) => {
    const msg = JSON.parse(ev.data);
    if (msg.id && pending.has(msg.id)) {
      const { res, rej } = pending.get(msg.id);
      pending.delete(msg.id);
      msg.error ? rej(new Error(msg.error.message)) : res(msg.result);
    } else if (msg.method) listeners.forEach((l) => l(msg));
  };
  const send = (method, params = {}) => new Promise((res, rej) => {
    const n = ++id;
    pending.set(n, { res, rej });
    ws.send(JSON.stringify({ id: n, method, params }));
  });
  const once = (method) => new Promise((res) => {
    const l = (m) => { if (m.method === method) { listeners.splice(listeners.indexOf(l), 1); res(m); } };
    listeners.push(l);
  });
  const close = () => { try { ws.close(); } catch {} proc.kill(); setTimeout(() => rmSync(profile, { recursive: true, force: true }), 300); };
  return { send, once, close };
}

async function shootCdp(chrome, o, url, files) {
  const b = await launchWithCdp(chrome);
  try {
    await b.send('Page.enable');
    await b.send('Emulation.setEmulatedMedia', { features: [
      { name: 'prefers-color-scheme', value: o.dark ? 'dark' : 'light' },
      { name: 'prefers-reduced-motion', value: o.reduced ? 'reduce' : 'no-preference' },
    ] });
    for (const w of o.widths) {
      const vh = o.height || (w < 640 ? 812 : w < 1024 ? 1024 : 800);
      const mobile = w < 768;
      await b.send('Emulation.setDeviceMetricsOverride', { width: w, height: vh, deviceScaleFactor: o.scale, mobile });
      await b.send('Emulation.setTouchEmulationEnabled', { enabled: mobile });
      const loaded = b.once('Page.loadEventFired');
      await b.send('Page.navigate', { url });
      let timer;
      await Promise.race([loaded, new Promise((r) => { timer = setTimeout(r, 15000); })]);
      clearTimeout(timer);
      await sleep(o.wait);
      if (o.stepList) {
        await runSteps(b, o.stepList, (label) => files(w, label), { w, vh, mobile, scale: o.scale });
        continue;
      }
      if (o.viewport) {
        if (o.scroll != null) {
          const y = o.scroll === 'bottom' ? 'document.documentElement.scrollHeight' : Number(o.scroll);
          await b.send('Runtime.evaluate', { expression: `window.scrollTo(0, ${y})` });
          await sleep(400);
        }
      } else {
        const { cssContentSize, contentSize } = await b.send('Page.getLayoutMetrics');
        const h = Math.ceil((cssContentSize || contentSize).height);
        await b.send('Emulation.setDeviceMetricsOverride', { width: w, height: Math.min(Math.max(h, vh), 16000), deviceScaleFactor: o.scale, mobile });
        await sleep(o.wait); // let lazy images in the taller viewport load
      }
      const { data } = await b.send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: !o.viewport });
      const file = files(w);
      writeFileSync(file, Buffer.from(data, 'base64'));
      console.log(file);
    }
  } finally {
    b.close();
  }
}

// ---------- Steps: interact, then capture states and transition frames ----------
const KEYS = { Escape: 27, Enter: 13, Tab: 9, ArrowDown: 40, ArrowUp: 38, ArrowLeft: 37, ArrowRight: 39, Space: 32, Backspace: 8 };

async function center(b, sel) {
  const { result, exceptionDetails } = await b.send('Runtime.evaluate', {
    returnByValue: true,
    expression: `(() => { const el = document.querySelector(${JSON.stringify(sel)}); if (!el) return null;
      el.scrollIntoView({ block: 'center', inline: 'center' }); const r = el.getBoundingClientRect();
      return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; })()`,
  });
  if (exceptionDetails || !result.value) throw new Error(`Step selector not found: ${sel}`);
  return result.value;
}

async function capture(b, file, full, m) {
  if (full) {
    const { cssContentSize, contentSize } = await b.send('Page.getLayoutMetrics');
    const h = Math.ceil((cssContentSize || contentSize).height);
    await b.send('Emulation.setDeviceMetricsOverride', { width: m.w, height: Math.min(Math.max(h, m.vh), 16000), deviceScaleFactor: m.scale, mobile: m.mobile });
  }
  const { data } = await b.send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: !!full });
  if (full) await b.send('Emulation.setDeviceMetricsOverride', { width: m.w, height: m.vh, deviceScaleFactor: m.scale, mobile: m.mobile });
  writeFileSync(file, Buffer.from(data, 'base64'));
}

async function runSteps(b, steps, fileFor, m) {
  for (const [i, st] of steps.entries()) {
    if (st.click) {
      const { x, y } = await center(b, st.click);
      await b.send('Input.dispatchMouseEvent', { type: 'mouseMoved', x, y });
      await b.send('Input.dispatchMouseEvent', { type: 'mousePressed', x, y, button: 'left', clickCount: 1 });
      await b.send('Input.dispatchMouseEvent', { type: 'mouseReleased', x, y, button: 'left', clickCount: 1 });
    } else if (st.hover) {
      const { x, y } = await center(b, st.hover);
      await b.send('Input.dispatchMouseEvent', { type: 'mouseMoved', x, y });
    } else if (st.type) {
      await b.send('Runtime.evaluate', { expression: `document.querySelector(${JSON.stringify(st.type)})?.focus()` });
      await b.send('Input.insertText', { text: String(st.text ?? '') });
    } else if (st.key) {
      const code = KEYS[st.key] ?? 0;
      const base = { key: st.key, code: st.key, windowsVirtualKeyCode: code, nativeVirtualKeyCode: code };
      await b.send('Input.dispatchKeyEvent', { type: 'keyDown', ...base, ...(st.key === 'Enter' ? { text: '\r' } : {}) });
      await b.send('Input.dispatchKeyEvent', { type: 'keyUp', ...base });
    } else if (st.wait != null) {
      await sleep(Number(st.wait));
    } else if (st.scroll != null) {
      const y = st.scroll === 'bottom' ? 'document.documentElement.scrollHeight' : Number(st.scroll);
      await b.send('Runtime.evaluate', { expression: `window.scrollTo(0, ${y})` });
      await sleep(300);
    } else if (st.shot) {
      const file = fileFor(st.shot);
      await capture(b, file, st.full, m);
      console.log(file);
    } else if (st.burst) {
      const { name = `burst${i}`, frames = 4, interval = 80 } = st.burst;
      const t0 = Date.now();
      for (let f = 1; f <= frames; f++) {
        const file = fileFor(`${name}-f${f}`);
        const t = Date.now() - t0;
        await capture(b, file, false, m);
        console.log(`${file}  (+${t}ms)`);
        if (f < frames) await sleep(interval);
      }
    } else {
      throw new Error(`Unknown step ${i + 1}: ${JSON.stringify(st)}`);
    }
  }
}

// ---------- Plain command-line fallback ----------
function shootCli(chrome, o, url, files) {
  if (o.scroll != null) console.warn('--scroll needs Node 22+; ignored.');
  console.warn('Fallback mode: captures the viewport only (use --height to make it taller).');
  if (o.widths.some((w) => w < 500)) console.warn('Fallback mode: Chrome may lay out widths under about 500px wider than asked; use Node 22+ for phone widths.');
  for (const w of o.widths) {
    const h = o.height || 2000;
    const file = resolve(files(w));
    const profile = mkdtempSync(join(tmpdir(), 'shot-'));
    const args = ['--headless=new', '--hide-scrollbars', '--disable-gpu', `--user-data-dir=${profile}`,
      `--window-size=${w},${h}`, `--screenshot=${file}`, `--virtual-time-budget=${Math.max(o.wait, 2000)}`];
    if (o.dark) args.push('--force-dark-mode', '--blink-settings=preferredColorScheme=0');
    if (o.scale !== 1) args.push(`--force-device-scale-factor=${o.scale}`);
    execFileSync(chrome, [...args, url], { stdio: 'ignore' });
    rmSync(profile, { recursive: true, force: true });
    console.log(file);
  }
}

async function main() {
  const o = parseArgs(process.argv.slice(2));
  if (o.help || !o.target) {
    console.log('Usage: node shot.mjs <url|file> [--widths 375,768,1280] [--out shots] [--name page] [--dark] [--viewport] [--height N] [--scroll <px|bottom>] [--scale 1] [--wait 600] [--steps steps.json] [--emulate-reduced-motion]');
    process.exit(o.help ? 0 : 1);
  }
  const chrome = findChrome();
  if (!chrome) {
    console.error('No Chrome, Chromium, Edge or Brave found. Install one or set CHROME_PATH.');
    process.exit(1);
  }
  const url = toUrl(o.target);
  const name = o.name || (basename(o.target, extname(o.target)).replace(/[^\w.-]+/g, '_') || 'page');
  mkdirSync(o.out, { recursive: true });
  const suffix = `${o.dark ? '-dark' : ''}${o.reduced ? '-rm' : ''}${o.viewport ? '-vp' : ''}${o.scroll != null ? `-scroll-${o.scroll}` : ''}`;
  const files = (w, label) => join(o.out, `${name}-${w}${suffix}${label ? `-${label.replace(/[^\w.-]+/g, '_')}` : ''}.png`);
  if (o.steps) {
    o.stepList = JSON.parse(readFileSync(o.steps, 'utf8'));
    if (!Array.isArray(o.stepList)) throw new Error('--steps file must hold a JSON array of steps');
  }
  if (typeof WebSocket === 'function') await shootCdp(chrome, o, url, files);
  else if (o.steps || o.reduced) throw new Error('--steps and --emulate-reduced-motion need Node 22 or later (the DevTools protocol path). Upgrade Node, or capture states by hand.');
  else shootCli(chrome, o, url, files);
}

main().catch((e) => { console.error(e.message || e); process.exit(1); });
