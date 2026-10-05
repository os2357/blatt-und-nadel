// SPDX-FileCopyrightText: 2026 Oliver Simon
// SPDX-License-Identifier: MIT
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';
import { root, esc, loadIcons, geometry } from './lib.mjs';

const icons = loadIcons();
await sharp(path.join(root, 'docs/preview.svg'))
  .resize(1814)
  .png()
  .toFile(path.join(root, 'docs/preview.png'));
const height = 112 + icons.length * 76;
let svg =
  '<svg xmlns="http://www.w3.org/2000/svg" width="1120" height="' +
  height +
  '"><rect width="560" height="' +
  height +
  '" fill="#f7f7f0"/><rect x="560" width="560" height="' +
  height +
  '" fill="#14271f"/>';
for (let half = 0; half < 2; half++) {
  const ink = half ? '#d4dfbd' : '#34573e',
    x = half * 560;
  svg +=
    '<g fill="' +
    ink +
    '" font-family="DejaVu Sans,sans-serif"><text x="' +
    (20 + x) +
    '" y="30" font-size="14">Blatt &amp; Nadel · Size reference</text><text x="' +
    (20 + x) +
    '" y="52" font-size="10">Compact 24 / 32 px · Detail 48 / 64 px</text></g>';
  icons.forEach((icon, index) => {
    const y = 72 + index * 76;
    svg +=
      '<text x="' +
      (18 + x) +
      '" y="' +
      (y + 38) +
      '" font-family="DejaVu Sans,sans-serif" font-size="10" fill="' +
      ink +
      '">' +
      esc(icon.name) +
      '</text>';
    [24, 32, 48, 64].forEach((size, column) => {
      svg +=
        '<svg x="' +
        (185 + x + column * 84) +
        '" y="' +
        (y + 32 - size / 2) +
        '" width="' +
        size +
        '" height="' +
        size +
        '" viewBox="0 0 96 96" color="' +
        ink +
        '" stroke-linecap="round" stroke-linejoin="round">' +
        geometry(icon, size < 48 ? 'compact' : 'detail') +
        '</svg>';
    });
  });
  svg +=
    '<text x="' +
    (20 + x) +
    '" y="' +
    (height - 14) +
    '" font-size="10" font-family="DejaVu Sans,sans-serif" fill="' +
    ink +
    '">© 2026 Oliver Simon · CC BY 4.0</text>';
}
svg += '</svg>';
await sharp(Buffer.from(svg)).png().toFile(path.join(root, 'docs/sizes.png'));
for (const file of ['preview.png', 'sizes.png']) {
  fs.writeFileSync(
    path.join(root, 'docs', file + '.license'),
    'SPDX-FileCopyrightText: 2026 Oliver Simon\nSPDX-License-Identifier: CC-BY-4.0\n',
  );
}
console.log('Rendered docs/preview.png and docs/sizes.png. System fonts affect text rendering.');
