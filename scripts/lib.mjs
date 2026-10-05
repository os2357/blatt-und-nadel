// SPDX-FileCopyrightText: 2026 Oliver Simon
// SPDX-License-Identifier: MIT
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
export const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');
export const pkg = JSON.parse(read('package.json'));
export const catalog = JSON.parse(read('src/icons.json'));
export const variants = ['detail', 'compact'];
export const license = 'CC-BY-4.0';
export const licenseUrl = 'https://creativecommons.org/licenses/by/4.0/';
export const notice =
  '<!-- © 2026 Oliver Simon · Blatt & Nadel · CC BY 4.0 · ' + licenseUrl + ' -->\n';
export const esc = (value) =>
  String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('"', '&quot;');

export function loadIcons() {
  return catalog.icons.map((item) => {
    const bodies = {};
    for (const variant of variants) {
      const source = read('icons/' + variant + '/' + item.id + '.svg');
      const match = source.match(/<svg\b[^>]*>([\s\S]*)<\/svg>\s*$/);
      if (!match) throw new Error('Invalid SVG envelope: ' + item.id);
      bodies[variant] = match[1].replace(/<title>[\s\S]*?<\/title>/g, '').trim();
    }
    return { ...item, names: item.name, name: item.name.de, latin: item.scientificName, bodies };
  });
}

export function geometry(icon, variant = 'detail') {
  return icon.bodies[variant];
}
