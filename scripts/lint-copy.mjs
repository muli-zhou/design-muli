#!/usr/bin/env node
// Advisory copy check for interface text. No dependencies. Always exits 0.
// Scans the visible text of an HTML file (or a plain text file) for:
//   - copy smells: how-to-use phrases, marketing words, chatty filler, exclamation marks
//   - the same short fact (time, date, count, amount, duration) repeated 3 or more times
// Usage: node lint-copy.mjs <file> [--min 3]
// The file is scanned as a whole; a repeated fact may sit on different screens, so judge each hit.

import { readFileSync } from 'node:fs';
import { extname } from 'node:path';

// Edit this list when a new smell recurs. Each entry: kind, a regular expression, and a short note.
const PATTERNS = [
  // How to use the interface
  ['how-to', /\b(click|tap|press|swipe|scroll|drag|hover)\b[^.]{0,40}\b(to|here|below|above|on)\b/i, 'explains how to use the UI; let form and position say it'],
  ['how-to', /\bclick here\b|\btap here\b|\bsee below\b|\bas shown\b/i, 'explains how to use the UI'],
  ['how-to', /\byou can\b|\bfeel free\b|\bsimply\b|\bjust (tap|click|select)\b/i, 'instructional filler'],
  ['how-to', /\b(will|are) (automatically )?(sync|synced|saved|updated)\b/i, 'narrates behaviour the reader does not need'],
  ['how-to', /(点击|点一下|点按|轻点|轻触|长按|左滑|右滑|上滑|下拉|滑动)[^。]{0,12}(查看|打开|进入|切换|展开|即可|可以|在)/, '解释界面用法'],
  ['how-to', /(你|您)可以|即可查看|在这里|此处|如下所示|以下是/, '解释界面用法或叙述可见内容'],
  ['how-to', /会(自动)?同步|已为(你|您)/, '叙述读者不需要知道的行为'],
  // Marketing voice
  ['marketing', /\b(seamless(ly)?|effortless(ly)?|powerful|robust|cutting[- ]edge|state[- ]of[- ]the[- ]art|revolutionary|game[- ]chang\w*|world[- ]class|next[- ]level|supercharge\w*|unlock|elevate|delightful|amazing|awesome|comprehensive|ultimate|magic(al)?)\b/i, 'marketing voice'],
  ['marketing', /一键|极致|全新|赋能|无缝|强大的|轻松|畅享|尽享|开启.{0,6}之旅|为(你|您)打造|沉浸式|颠覆|革命性|超值|爆款/, '营销腔'],
  // Chatty filler
  ['filler', /\b(heads[- ]up|pro tip|don't forget|remember to|note that|please note)\b/i, 'chatty filler; state the warning itself'],
  ['filler', /温馨提示|小贴士|友情提示|别忘了|记得|请注意/, '口语化提示；直接写要注意的事'],
  // Exclamation
  ['exclamation', /[!！]/, 'exclamation mark'],
];

// Facts worth counting. Each match is normalised (spaces collapsed) before counting.
const FACT = new RegExp([
  String.raw`\b\d{1,2}:\d{2}\b`,                                              // 14:30
  String.raw`\b\d{1,2}\/\d{1,2}\b`,                                           // 12/8
  String.raw`\d{1,2}月\d{1,2}日`,                                             // 12月8日
  String.raw`[$€£¥]\s?\d[\d,]*(\.\d+)?`,                                      // $120
  String.raw`\b\d+(\.\d+)?\s?(days?|nights?|weeks?|hours?|hrs?|h|mins?|minutes?|km|mi|kg|items?|%)\b`,
  String.raw`\d+(\.\d+)?\s?(天|晚|周|小时|分钟|公里|千米|元|项|个|人|%)`,
].join('|'), 'gi');

function visibleLines(src, isHtml) {
  if (!isHtml) return src.split('\n');
  const keepNewlines = (m) => m.replace(/[^\n]/g, ' ');
  let s = src
    .replace(/<!--[\s\S]*?-->/g, keepNewlines)
    .replace(/<(script|style|template|svg)\b[\s\S]*?<\/\1>/gi, keepNewlines)
    // Attribute text a reader sees or hears
    .replace(/<[^>]*>/g, (tag) => {
      const attrs = [...tag.matchAll(/\b(alt|title|placeholder|aria-label)\s*=\s*("([^"]*)"|'([^']*)')/gi)].map((m) => m[3] ?? m[4]);
      const nl = tag.replace(/[^\n]/g, '');
      return ` ${attrs.join(' | ')} ${nl}`;
    });
  s = s.replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'");
  return s.split('\n');
}

function main() {
  const args = process.argv.slice(2);
  const file = args.find((a) => !a.startsWith('--'));
  const minIdx = args.indexOf('--min');
  const min = minIdx >= 0 ? Number(args[minIdx + 1]) || 3 : 3;
  if (!file) {
    console.log('Usage: node lint-copy.mjs <file.html|file.txt> [--min 3]');
    return;
  }
  let src;
  try { src = readFileSync(file, 'utf8'); } catch (e) { console.log(`Cannot read ${file}: ${e.message}`); return; }
  const isHtml = /\.(html?|xhtml|vue|svelte|jsx|tsx)$/i.test(extname(file)) || /<\w+[^>]*>/.test(src.slice(0, 2000));
  const lines = visibleLines(src, isHtml);

  const smells = [];
  const facts = new Map();
  lines.forEach((raw, i) => {
    const line = raw.replace(/\s+/g, ' ').trim();
    if (!line) return;
    for (const [kind, re, note] of PATTERNS) {
      const m = line.match(re);
      if (m) smells.push({ n: i + 1, kind, hit: m[0], note, text: line.length > 90 ? line.slice(0, 87) + '...' : line });
    }
    for (const m of line.matchAll(FACT)) {
      const key = m[0].replace(/\s+/g, ' ').toLowerCase();
      if (!facts.has(key)) facts.set(key, []);
      facts.get(key).push(i + 1);
    }
  });

  console.log(`lint-copy: ${file}`);
  if (!smells.length) console.log('\nCopy smells: none');
  else {
    console.log(`\nCopy smells: ${smells.length}`);
    for (const s of smells) console.log(`  L${s.n}  [${s.kind}] "${s.hit}" - ${s.note}\n        ${s.text}`);
  }
  const repeated = [...facts].filter(([, ls]) => ls.length >= min).sort((a, b) => b[1].length - a[1].length);
  if (!repeated.length) console.log(`\nFacts repeated ${min}+ times: none`);
  else {
    console.log(`\nFacts repeated ${min}+ times: ${repeated.length} (check whether they share a screen; a top-strip statement plus one bare fact below is allowed)`);
    for (const [k, ls] of repeated) console.log(`  "${k}" x${ls.length}  lines ${ls.join(', ')}`);
  }
  console.log('\nAdvisory only: judge each hit against references/copy.md.');
}

try { main(); } catch (e) { console.log(`lint-copy error: ${e.message}`); }
process.exitCode = 0;
