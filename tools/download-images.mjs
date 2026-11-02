// Fetches the Unsplash photography used on the Kopper Kettle site.
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const outDir = 'kopper-kettle/assets/img';
const picks = [
  ['diner-counter', 'photo-1773067043310-d4049234c44f'],
  ['diner-booths', 'photo-1767769354554-efeaa233f697'],
  ['diner-neon', 'photo-1765087909999-754261788116'],
  ['biscuits-skillet', 'photo-1762388371122-3ad9b573588e'],
  ['biscuits-tray', 'photo-1774025627495-f0610ffbdc8f'],
  ['eggs-bacon', 'photo-1734770205674-d117e4ba7926'],
  ['breakfast-plate', 'photo-1527598041828-aea5d622f3a8'],
  ['pancakes', 'photo-1710533820700-dd6f6623cc97'],
  ['meatloaf', 'photo-1705945021699-7374c3fd34cb'],
  ['pecan-pie', 'photo-1767065584339-5d58fb4d8a04'],
  ['gravy-plate', 'photo-1708782341179-37e0f0e60154'],
  ['cheesesteak', 'photo-1778449736460-9a8f2117571a'],
  ['sandwich-fries', 'photo-1734769853702-c7444c039c8c'],
  ['coffee-plate', 'photo-1710533835063-ef6e502226b5'],
];

fs.mkdirSync(outDir, { recursive: true });
const meta = [];
for (const [name, id] of picks) {
  const url = `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=74`;
  const out = path.join(outDir, `${name}.jpg`);
  execFileSync('curl', ['-sL', '--max-time', '60', '-o', out, url]);
  const size = fs.statSync(out).size;
  const jpeg = fs.readFileSync(out).subarray(0, 2).toString('hex') === 'ffd8';
  meta.push({ name, id, bytes: size, ok: size > 20000 && jpeg });
}
console.log(meta.map((m) => `${m.ok ? 'OK  ' : 'FAIL'} ${m.name} ${m.bytes}b`).join('\n'));
