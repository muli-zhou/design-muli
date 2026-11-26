#!/usr/bin/env node
// Advisory design lint for an HTML or CSS file. No dependencies. Always exits 0.
// Reports off-spec values and default-kit tells; each finding points to references/ai-tells.md or craft.md.
// Usage: node lint-design.mjs <file.html|file.css>
// Each hit needs a decision: remove it, or point to the anchor line in DESIGN-NOTES.md that requires it.

import { readFileSync } from 'node:fs';
import { extname } from 'node:path';

const LIMITS = { fontSizes: 6, fontFamilies: 2, fontWeights: 3 };

const file = process.argv[2];
if (!file) { console.log('Usage: node lint-design.mjs <file.html|file.css>'); process.exit(0); }
let src;
try { src = readFileSync(file, 'utf8'); } catch (e) { console.log(`Cannot read ${file}: ${e.message}`); process.exit(0); }

const lineAt = (text, idx) => text.slice(0, idx).split('\n').length;
const isHtml = /\.html?$/i.test(extname(file)) || /<html|<body|<div|<style/i.test(src.slice(0, 4000));

// ---------- Collect CSS chunks with their starting line ----------
const chunks = [];
if (isHtml) {
  for (const m of src.matchAll(/<style\b[^>]*>([\s\S]*?)<\/style>/gi)) {
    chunks.push({ css: m[1], line0: lineAt(src, m.index + m[0].indexOf(m[1])) });
  }
  for (const m of src.matchAll(/\sstyle\s*=\s*("([^"]*)"|'([^']*)')/gi)) {
    const body = m[2] ?? m[3];
    chunks.push({ css: `[style attribute]{${body}}`, line0: lineAt(src, m.index) });
  }
} else {
  chunks.push({ css: src, line0: 1 });
}

// ---------- Parse into rules: { sel, decls: [{prop, val}], line, media } ----------
const rules = [];
let hasReducedMotion = false;
for (const { css, line0 } of chunks) {
  const clean = css.replace(/\/\*[\s\S]*?\*\//g, (c) => c.replace(/[^\n]/g, ' '));
  if (/prefers-reduced-motion/.test(clean)) hasReducedMotion = true;
  for (const m of clean.matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
    const sel = m[1].trim().replace(/\s+/g, ' ');
    if (sel.startsWith('@')) continue;
    const decls = m[2].split(';').map((d) => {
      const i = d.indexOf(':');
      return i < 0 ? null : { prop: d.slice(0, i).trim().toLowerCase(), val: d.slice(i + 1).trim() };
    }).filter((d) => d && d.prop);
    rules.push({ sel, decls, line: line0 + lineAt(clean, m.index) - 1 });
  }
}

// Custom properties, for resolving var() on page backgrounds
const vars = {};
for (const r of rules) for (const d of r.decls) if (d.prop.startsWith('--') && !(d.prop in vars)) vars[d.prop] = d.val;
const resolve = (v, depth = 0) => v.replace(/var\(\s*(--[\w-]+)\s*(?:,([^)]*))?\)/g, (_, n, fb) => depth > 5 ? '' : resolve(vars[n] ?? fb ?? '', depth + 1));

const findings = [];
const add = (title, ref, items, always = false) => { if (always || items.length) findings.push({ title, ref, items }); };
const where = (r) => `${r.sel.slice(0, 60)} (L${r.line})`;
const COLOR = /#[0-9a-f]{3,8}\b|\b(?:rgba?|hsla?|oklch|oklab|lab|lch|color)\([^)]*\)/gi;

// ---------- Type scale ----------
const sizes = new Map(), families = new Map(), weights = new Map();
const note = (map, key, r) => { if (!map.has(key)) map.set(key, []); map.get(key).push(r); };
for (const r of rules) for (const d of r.decls) {
  if (d.prop.startsWith('--') || /var\(/.test(d.val) && !/^font$/.test(d.prop)) continue;
  if (d.prop === 'font-size') note(sizes, d.val, r);
  if (d.prop === 'font-family' && !/^(inherit|initial|unset)$/.test(d.val)) note(families, d.val.replace(/\s+/g, ' '), r);
  if (d.prop === 'font-weight') note(weights, { normal: '400', bold: '700' }[d.val] || d.val, r);
  if (d.prop === 'font') {
    const fs = d.val.match(/(\d+(?:\.\d+)?(?:px|rem|em|pt))(?:\/\S+)?/); if (fs) note(sizes, fs[1], r);
    const fw = d.val.match(/\b([1-9]00|bold)\b/); if (fw) note(weights, fw[1] === 'bold' ? '700' : fw[1], r);
  }
}
if (sizes.size > LIMITS.fontSizes) add(`${sizes.size} distinct font sizes (limit ${LIMITS.fontSizes}): ${[...sizes.keys()].join(', ')}`, 'craft.md #1', [], true);
if (families.size > LIMITS.fontFamilies) add(`${families.size} font-family stacks (limit ${LIMITS.fontFamilies})`, 'craft.md #1, ai-tells.md (serif + sans by default)', [...families].map(([k, rs]) => `${k.slice(0, 60)}  at ${where(rs[0])}`));
if (weights.size > LIMITS.fontWeights) add(`${weights.size} font weights (limit ${LIMITS.fontWeights}): ${[...weights.keys()].join(', ')}`, 'craft.md #2', [], true);

// ---------- Colour literals outside custom properties ----------
const literals = [];
for (const r of rules) {
  if (/^:root\b|\[data-theme/.test(r.sel)) continue;
  for (const d of r.decls) {
    if (d.prop.startsWith('--')) continue;
    const hits = d.val.match(COLOR);
    if (hits) literals.push(`${hits.join(' ')} in ${d.prop} at ${where(r)}`);
  }
}
add(`${literals.length} colour literals outside tokens`, 'craft.md #1, tokens.md', literals);

// ---------- Tells ----------
const shadows = [], gradients = [], dashed = [], stripes = [], eyebrows = [], pills = [], transAll = [];
let animates = false;
for (const r of rules) {
  const props = Object.fromEntries(r.decls.map((d) => [d.prop, d.val]));
  for (const d of r.decls) {
    const v = d.val.toLowerCase();
    if (d.prop === 'box-shadow' && !/^none$/.test(v) && !/:focus/.test(r.sel)) shadows.push(`${where(r)}${/var\(/.test(v) ? ' (token: floating surfaces only)' : ''}`);
    if (/gradient\(/.test(v)) gradients.push(`${d.prop} at ${where(r)}`);
    if (/^(border|border-(top|right|bottom|left|inline|block)(-start|-end)?|border-style|outline|outline-style)$/.test(d.prop) && /\bdashed\b/.test(v)) dashed.push(where(r));
    if (/^border-(left|inline-start)(-width)?$/.test(d.prop)) {
      const w = v.match(/(\d+(?:\.\d+)?)px/);
      if (w && Number(w[1]) >= 3 && (d.prop.endsWith('width') || /#|rgb|hsl|oklch|var\(|[a-z]+$/.test(v.replace(/\d+px|solid|dashed/g, '').trim()))) stripes.push(`${d.prop}: ${d.val} at ${where(r)}`);
    }
    if (d.prop === 'border-radius' && (/\b(9{3,})px\b/.test(v) || /^50%$/.test(v))) pills.push(`${d.val} at ${where(r)}`);
    if ((d.prop === 'transition' && (/\ball\b/.test(v) || /^[\d.]+m?s\b/.test(v))) || (d.prop === 'transition-property' && /\ball\b/.test(v))) transAll.push(`${d.prop}: ${d.val} at ${where(r)}`);
    if (/^(transition|animation)(-name|-duration)?$/.test(d.prop) && !/^none$/.test(v)) animates = true;
  }
  if (/uppercase/.test(props['text-transform'] || '') && props['letter-spacing'] && !/^(0|normal|0em|0px)$/.test(props['letter-spacing'])) eyebrows.push(where(r));
}
add(`${shadows.length} box-shadow declarations`, 'ai-tells.md (shadow on in-flow cards); craft.md: floating surfaces only', shadows);
add(`${gradients.length} gradients`, 'ai-tells.md (gradients, glow, glass)', gradients);
add(`${dashed.length} dashed borders`, 'ai-tells.md (dashed pending)', dashed);
add(`${stripes.length} coloured left stripes of 3px or more`, 'ai-tells.md (left-stripe callout)', stripes);
add(`${eyebrows.length} uppercase + letter-spaced labels`, 'ai-tells.md (eyebrow labels)', eyebrows);
add(`${pills.length} pill or circle radii (fine on square avatars and switches)`, 'ai-tells.md (status pills)', pills);
add(`${transAll.length} transitions on all properties`, 'craft.md #23', transAll);

// ---------- Cream page background ----------
const toRgb = (c) => {
  c = c.trim().toLowerCase();
  let m = c.match(/^#([0-9a-f]{3,8})$/);
  if (m) { let h = m[1]; if (h.length <= 4) h = [...h].map((x) => x + x).join(''); return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16)); }
  m = c.match(/^rgba?\(\s*(\d+)[\s,]+(\d+)[\s,]+(\d+)/); if (m) return m.slice(1, 4).map(Number);
  return null;
};
const cream = [];
for (const r of rules) {
  if (!/(^|[\s,])(html|body|main|:root)\b/.test(r.sel)) continue;
  for (const d of r.decls) {
    if (!/^background(-color)?$/.test(d.prop)) continue;
    const val = resolve(d.val);
    for (const c of val.match(COLOR) || []) {
      const rgb = toRgb(c); if (!rgb) continue;
      const [R, G, B] = rgb, max = Math.max(R, G, B), min = Math.min(R, G, B);
      if (max > 215 && R >= G && G >= B && R - B >= 8) cream.push(`${c} (${d.val}) at ${where(r)}`);
    }
  }
}
add(`${cream.length} cream or beige page backgrounds`, 'ai-tells.md (cream background)', cream);

// ---------- Missing safeguards ----------
const allCss = chunks.map((c) => c.css).join('\n');
const visible = isHtml ? src.replace(/<(script|style)\b[\s\S]*?<\/\1>/gi, '').replace(/<[^>]*>/g, ' ') : '';
if ((!isHtml || /\d/.test(visible)) && !/tabular-nums/.test(allCss)) add('No tabular-nums anywhere, but the page shows digits', 'craft.md #5', [], true);
if (animates && !hasReducedMotion) add('Transitions or animations without a prefers-reduced-motion block', 'craft.md #25', [], true);

// ---------- Report ----------
console.log(`lint-design: ${file}  (${rules.length} rules)`);
if (!findings.length) console.log('\nNo findings.');
for (const f of findings) {
  console.log(`\n- ${f.title}  -> ${f.ref}`);
  for (const it of f.items.slice(0, 8)) console.log(`    ${it}`);
  if (f.items.length > 8) console.log(`    ... ${f.items.length - 8} more`);
}
console.log('\nAdvisory only: remove each hit, or point to the anchor line in DESIGN-NOTES.md that requires it.');
process.exitCode = 0;
