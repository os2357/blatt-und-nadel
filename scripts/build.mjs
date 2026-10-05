// SPDX-FileCopyrightText: 2026 Oliver Simon
// SPDX-License-Identifier: MIT
import fs from 'node:fs';
import path from 'node:path';
import {
  root,
  read,
  pkg,
  catalog,
  variants,
  license,
  licenseUrl,
  notice,
  esc,
  loadIcons,
  geometry,
} from './lib.mjs';
import { overview } from './overview.mjs';

const check = process.argv.includes('--check');
const icons = loadIcons();
const stale = [];
let count = 0;

function output(file, contents) {
  const value = contents.trimEnd() + '\n';
  if (check) {
    if (!fs.existsSync(path.join(root, file)) || read(file) !== value) stale.push(file);
  } else {
    fs.mkdirSync(path.dirname(path.join(root, file)), { recursive: true });
    fs.writeFileSync(path.join(root, file), value);
  }
  count++;
}

for (const variant of variants) {
  const symbols = icons
    .map(
      (icon) =>
        '<symbol id="leaf-' +
        icon.id +
        '" viewBox="0 0 96 96" stroke-linecap="round" stroke-linejoin="round">' +
        geometry(icon, variant) +
        '</symbol>',
    )
    .join('\n');
  output(
    'sprites/leaves-' + variant + '.svg',
    notice + '<svg xmlns="http://www.w3.org/2000/svg">\n<defs>\n' + symbols + '\n</defs>\n</svg>',
  );
}

output(
  'data/manifest.json',
  JSON.stringify(
    {
      name: 'Blatt & Nadel',
      version: pkg.version,
      author: 'Oliver Simon',
      copyright: 'Copyright 2026 Oliver Simon',
      license,
      licenseUrl,
      updated: catalog.updated,
      viewBox: '0 0 96 96',
      variants: {
        compact: { recommendedSize: '24–40 px' },
        detail: { recommendedSize: '48 px and larger; 64 px for fine detail' },
      },
      icons: catalog.icons.map((icon) => ({
        ...icon,
        symbol: 'leaf-' + icon.id,
        files: Object.fromEntries(
          variants.map((variant) => [variant, 'icons/' + variant + '/' + icon.id + '.svg']),
        ),
      })),
    },
    null,
    2,
  ),
);

function card(icon, index) {
  const group = icon.group === 'conifer' ? 'Nadelgehölze' : 'Laubgehölze';
  const search = esc(
    [icon.name, icon.names.en, icon.latin, icon.description].join(' '),
  ).toLocaleLowerCase('de');
  const specimen =
    '<svg class="specimen" viewBox="0 0 96 96" role="img" aria-label="' +
    esc(icon.name + ' · ' + icon.latin) +
    '" stroke-linecap="round" stroke-linejoin="round"><g data-detail>' +
    geometry(icon) +
    '</g><g data-compact hidden>' +
    geometry(icon, 'compact') +
    '</g></svg>';
  const sizes = [24, 32, 48]
    .map(
      (size) =>
        '<span><svg width="' +
        size +
        '" height="' +
        size +
        '" viewBox="0 0 96 96" aria-hidden="true" stroke-linecap="round" stroke-linejoin="round">' +
        geometry(icon, size < 48 ? 'compact' : 'detail') +
        '</svg><small>' +
        size +
        '</small></span>',
    )
    .join('');
  return (
    '<article class="card" data-id="' +
    icon.id +
    '" data-group="' +
    group +
    '" data-search="' +
    search +
    '">' +
    '<div class="card-top"><span>' +
    String(index + 1).padStart(2, '0') +
    '</span><button class="copy" aria-label="SVG für ' +
    esc(icon.name) +
    ' kopieren">SVG kopieren</button></div>' +
    '<div class="art">' +
    specimen +
    '</div><h2>' +
    esc(icon.name) +
    '</h2><p class="latin">' +
    esc(icon.latin) +
    '</p><p class="note">' +
    esc(icon.description) +
    '</p>' +
    '<div class="size-test">' +
    sizes +
    '</div><a class="download" href="icons/detail/' +
    icon.id +
    '.svg" download="' +
    icon.id +
    '.svg">Einzeldatei ↓</a></article>'
  );
}

let html = read('src/gallery.html');
const substitutions = {
  styles: read('src/gallery.css'),
  script: read('src/gallery.js'),
  cards: icons.map(card).join('\n'),
  count: icons.length,
  files: icons.length * variants.length,
  version: pkg.version,
};
for (const [key, value] of Object.entries(substitutions))
  html = html.replaceAll('{{' + key + '}}', String(value));
output('index.html', html);
output('docs/preview.svg', notice + overview(icons, geometry, esc, pkg.version));

if (stale.length) {
  console.error('Generated files are stale. Run npm run build:\n' + stale.join('\n'));
  process.exitCode = 1;
} else {
  console.log(
    (check ? 'Verified ' : 'Built ') +
      count +
      ' files from ' +
      icons.length +
      ' species / ' +
      icons.length * variants.length +
      ' SVGs.',
  );
}
