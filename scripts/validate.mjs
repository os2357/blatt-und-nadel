// SPDX-FileCopyrightText: 2026 Oliver Simon
// SPDX-License-Identifier: MIT
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import sax from 'sax';
import sharp from 'sharp';
import { root, read, catalog, variants, licenseUrl } from './lib.mjs';
import {
  flattenPath,
  geometryFindings,
  contourCrossings,
  bladeSeparationFindings,
} from './geometry.mjs';
import { paintedStrokeExcursion, paintedComponents } from './paint.mjs';

const ids = catalog.icons.map((icon) => icon.id);
assert.equal(new Set(ids).size, ids.length, 'Duplicate icon IDs');
const allowed = new Set(['svg', 'title', 'path']);
const attributes = {
  svg: new Set([
    'xmlns',
    'width',
    'height',
    'viewBox',
    'fill',
    'stroke-linecap',
    'stroke-linejoin',
    'role',
    'aria-label',
  ]),
  title: new Set(),
  path: new Set([
    'class',
    'd',
    'fill',
    'stroke',
    'stroke-width',
    'stroke-linecap',
    'stroke-linejoin',
  ]),
};
let checked = 0;
const failures = [];
let veinsChecked = 0;

for (const variant of variants) {
  const files = fs
    .readdirSync(path.join(root, 'icons', variant))
    .filter((file) => file.endsWith('.svg'))
    .sort();
  assert.deepEqual(
    files,
    ids.map((id) => id + '.svg').sort(),
    'Catalog and SVG filenames differ: ' + variant,
  );
  for (const icon of catalog.icons) {
    assert.match(icon.id, /^[a-z][a-z0-9-]*$/);
    assert.ok(icon.name.en && icon.name.de && icon.scientificName && icon.source);
    assert.ok(['conifer', 'broadleaf'].includes(icon.group));
    const name = 'icons/' + variant + '/' + icon.id + '.svg';
    const source = read(name);
    assert.ok(source.includes('SPDX-FileCopyrightText: 2026 Oliver Simon'), name + ': copyright');
    assert.ok(
      source.includes('SPDX-License-Identifier: CC-BY-4.0') && source.includes(licenseUrl),
      name + ': license',
    );
    assert.ok(
      !/NaN|Infinity|undefined|<!DOCTYPE|<!ENTITY|<\?xml-stylesheet/i.test(source),
      name + ': unsafe or invalid content',
    );
    const parser = sax.parser(true);
    let paths = 0,
      roots = 0,
      titles = 0,
      title = '',
      inTitle = false;
    const stack = [];
    const expectedLabel = icon.name.de + ' · ' + icon.scientificName;
    const geometry = [];
    parser.onopentag = (node) => {
      assert.ok(allowed.has(node.name), name + ': unsupported tag ' + node.name);
      assert.equal(
        stack.at(-1),
        node.name === 'svg' ? undefined : 'svg',
        name + ': invalid element nesting',
      );
      stack.push(node.name);
      for (const [key, value] of Object.entries(node.attributes)) {
        assert.ok(attributes[node.name].has(key), name + ': unsupported attribute ' + key);
        assert.ok(!/^on/i.test(key), name + ': event handler');
        assert.ok(!/url\(|javascript:|data:/i.test(value), name + ': external or active content');
        assert.ok(
          !['href', 'xlink:href', 'style'].includes(key),
          name + ': external styling/reference',
        );
      }
      if (node.name === 'svg') {
        roots++;
        assert.equal(node.attributes.viewBox, '0 0 96 96', name + ': viewBox');
        assert.equal(node.attributes.xmlns, 'http://www.w3.org/2000/svg', name + ': namespace');
        assert.equal(node.attributes.width, '96', name + ': intrinsic width');
        assert.equal(node.attributes.height, '96', name + ': intrinsic height');
        assert.equal(node.attributes.role, 'img', name + ': accessible role');
        assert.equal(node.attributes['stroke-linecap'], 'round', name + ': round caps');
        assert.equal(node.attributes['stroke-linejoin'], 'round', name + ': round joins');
        assert.equal(node.attributes['aria-label'], expectedLabel, name + ': accessible name');
      }
      if (node.name === 'title') {
        assert.equal(paths, 0, name + ': title must precede artwork');
        titles++;
        inTitle = true;
      }
      if (node.name === 'path') {
        paths++;
        geometry.push(node.attributes);
        const filled = ['leaf-needle', 'leaf-sheath'].includes(node.attributes.class);
        assert.equal(node.attributes.fill, filled ? 'currentColor' : 'none', name + ': fill');
        assert.equal(node.attributes.stroke, filled ? 'none' : 'currentColor', name + ': stroke');
        if (!filled)
          assert.ok(
            Number.isFinite(Number(node.attributes['stroke-width'])) &&
              Number(node.attributes['stroke-width']) > 0,
            name + ': stroke width',
          );
        for (const key of ['stroke-linecap', 'stroke-linejoin']) {
          if (key in node.attributes)
            assert.equal(node.attributes[key], 'round', name + ': path ' + key);
        }
        assert.ok(node.attributes.d?.length, name + ': empty path');
        assert.ok(
          [
            'leaf-blade',
            'leaf-vein',
            'leaf-midrib',
            'leaf-petiole',
            'leaf-rachis',
            'leaf-axis',
            'leaf-needle',
            'leaf-sheath',
            'leaf-bud',
          ].includes(node.attributes.class),
          name + ': every path needs an explicit drawing role',
        );
        const subpaths = flattenPath(node.attributes.d);
        if (
          ['leaf-blade', 'leaf-needle', 'leaf-sheath', 'leaf-bud'].includes(node.attributes.class)
        ) {
          for (const subpath of subpaths) {
            assert.ok(subpath.closed, name + ': filled or blade contour must explicitly close');
            assert.equal(
              contourCrossings(subpath.points).length,
              0,
              name + ': closed contour crosses itself',
            );
          }
        }
      }
    };
    parser.ontext = (text) => {
      if (inTitle) title += text;
      else assert.ok(!text.trim(), name + ': unexpected text outside title');
    };
    parser.onclosetag = (tag) => {
      if (tag === 'title') inTitle = false;
      assert.equal(stack.pop(), tag, name + ': unbalanced nesting');
    };
    parser.write(source).close();
    assert.equal(roots, 1, name + ': SVG root count');
    assert.equal(titles, 1, name + ': exactly one title');
    assert.equal(title, expectedLabel, name + ': title matches catalog');
    assert.ok(paths > 0, name + ': empty icon');
    if (icon.group === 'conifer') {
      const components = await paintedComponents(source);
      assert.equal(
        components.length,
        1,
        name + ': detached needle or twig: ' + JSON.stringify(components),
      );
    }
    if (icon.group === 'broadleaf') {
      assert.ok(
        geometry.some((p) => p.class === 'leaf-blade'),
        name + ': missing blade',
      );
      assert.ok(
        !geometry.some((p) => p.class === 'leaf-axis'),
        name + ': separate external stalks from internal midribs',
      );
      veinsChecked += geometry.filter((p) => ['leaf-vein', 'leaf-midrib'].includes(p.class)).length;
      for (const finding of bladeSeparationFindings(geometry))
        failures.push(
          name +
            ': separate blade paths ' +
            finding.paths.join('/') +
            ' have ' +
            finding.kind +
            ' (' +
            finding.crossings +
            ' crossings, ' +
            finding.clearance.toFixed(3) +
            ' units of painted clearance)',
        );
      for (const finding of geometryFindings(geometry))
        failures.push(
          name +
            ': vein path ' +
            finding.path +
            ' outside blade by ' +
            finding.maximum.toFixed(3) +
            ' units near ' +
            finding.point.map((n) => n.toFixed(2)).join(', '),
        );
      const paint = await paintedStrokeExcursion(geometry);
      if (paint.outsidePixels)
        failures.push(
          name +
            ': visible interior stroke exceeds the blade outline near ' +
            paint.point.join(', '),
        );
    }
    const { data, info } = await sharp(Buffer.from(source))
      .resize(384, 384)
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });
    let visible = 0;
    for (let y = 0; y < info.height; y++) {
      for (let x = 0; x < info.width; x++) {
        if (data[(y * info.width + x) * 4 + 3] <= 20) continue;
        visible++;
        assert.ok(
          x > 0 && y > 0 && x < info.width - 1 && y < info.height - 1,
          name + ': artwork touches viewport edge',
        );
      }
    }
    assert.ok(visible > 0, name + ': no visible artwork');
    checked++;
  }
}
assert.equal(failures.length, 0, '\n' + failures.join('\n'));
console.log(
  'Validated ' +
    checked +
    ' SVGs: XML, labels, license, metadata, rendering, viewport bounds; ' +
    veinsChecked +
    ' internal paths stay inside their blades; separate blade outlines do not overlap; full stroke footprints pass the 16× raster check.',
);
