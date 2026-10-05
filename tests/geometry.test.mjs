// SPDX-FileCopyrightText: 2026 Oliver Simon
// SPDX-License-Identifier: MIT
import assert from 'node:assert/strict';
import test from 'node:test';
import {
  flattenPath,
  geometryFindings,
  contourCrossings,
  bladeSeparationFindings,
} from '../scripts/geometry.mjs';
import { paintedStrokeExcursion, paintedComponents } from '../scripts/paint.mjs';

test('a needle must touch the curved twig, not merely sit near it', async () => {
  const drawing = (x) =>
    `<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96"><path d="M40 85 Q47 50 50 10" fill="none" stroke="black" stroke-width="2"/><path d="M${x} 50 L70 35 L71 36 Z" fill="black"/></svg>`;
  assert.equal((await paintedComponents(drawing(40))).length, 1);
  assert.equal((await paintedComponents(drawing(49))).length, 2);
});

const box = { class: 'leaf-blade', d: 'M0 0 H10 V10 H0 Z' };

test('a rounded filled-needle cap must not fold back across its return edge', () => {
  const folded = 'M39 79 Q29 78.83 14 65.33 Q14.82 64.34 14 63.93 Q28.5 75.53 39 79 Z';
  const smooth =
    'M39 79 Q29 78.83 14 65.33 C12.959 64.393 12.907 63.055 14 63.93 Q28.5 75.53 39 79 Z';
  assert.equal(contourCrossings(flattenPath(folded)[0].points).length, 1);
  assert.equal(contourCrossings(flattenPath(smooth)[0].points).length, 0);
  assert.ok(flattenPath(smooth)[0].closed);
});

test('separate leaflets are checked against each other, not only themselves', () => {
  const crossing = { class: 'leaf-blade', d: 'M5 -2 H12 V8 H5 Z' };
  assert.equal(contourCrossings(flattenPath(crossing.d)[0].points).length, 0);
  assert.equal(bladeSeparationFindings([box, crossing])[0].kind, 'crossing');
  const nested = { class: 'leaf-blade', d: 'M2 2 H8 V8 H2 Z' };
  assert.equal(bladeSeparationFindings([box, nested])[0].kind, 'containment');
  assert.equal(
    bladeSeparationFindings([box, { class: 'leaf-blade', d: 'M20 0 H30 V10 H20 Z' }]).length,
    0,
  );
});

test('leaflet separation includes outline thickness and ignores connecting stalks', () => {
  const a = { ...box, 'stroke-width': 2 };
  const b = { class: 'leaf-blade', d: 'M11 0 H21 V10 H11 Z', 'stroke-width': 2 };
  assert.equal(bladeSeparationFindings([a, b])[0].kind, 'stroke-overlap');
  const separate = { ...b, d: 'M13 0 H23 V10 H13 Z' };
  assert.equal(
    bladeSeparationFindings([
      a,
      separate,
      { class: 'leaf-petiole', d: 'M5 5 L18 5', 'stroke-width': 3 },
    ]).length,
    0,
  );
});

test('midribs are interior geometry and cannot bypass containment checks', () => {
  assert.equal(geometryFindings([box, { class: 'leaf-midrib', d: 'M5 9 L11 2' }]).length, 1);
  assert.equal(geometryFindings([box, { class: 'leaf-midrib', d: 'M5 9 L5 2' }]).length, 0);
});

test('painted width and round caps are checked even when the centerline is inside', async () => {
  const blade = { ...box, 'stroke-width': 1 };
  const thick = { class: 'leaf-midrib', d: 'M9.4 2 L9.4 8', 'stroke-width': 4 };
  assert.equal(geometryFindings([blade, thick]).length, 0);
  assert.ok((await paintedStrokeExcursion([blade, thick])).outsidePixels > 0);
  assert.equal(
    (await paintedStrokeExcursion([blade, { ...thick, 'stroke-width': 1 }])).outsidePixels,
    0,
  );
});

test('blade contours may be concave but must not cross themselves', () => {
  assert.equal(contourCrossings(flattenPath(box.d)[0].points).length, 0);
  assert.equal(contourCrossings(flattenPath('M0 0 L10 10 L0 10 L10 0 Z')[0].points).length, 1);
  assert.equal(contourCrossings(flattenPath('M0 0 H10 V10 H7 V4 H3 V10 H0 Z')[0].points).length, 0);
});

test('a vein may touch its margin but must not leave the blade', () => {
  assert.equal(geometryFindings([box, { class: 'leaf-vein', d: 'M5 9 Q5 5 10 1' }]).length, 0);
  const bad = geometryFindings([box, { class: 'leaf-vein', d: 'M2 7 Q5 15 8 7' }]);
  assert.equal(bad.length, 1);
  assert.ok(bad[0].maximum > 0.9, 'Endpoints inside do not guarantee a curve inside');
});

test('a vein cannot cross a concave notch even with both endpoints inside', () => {
  const concave = { class: 'leaf-blade', d: 'M0 0 H10 V10 H7 V4 H3 V10 H0 Z' };
  assert.equal(geometryFindings([concave, { class: 'leaf-vein', d: 'M1 8 L9 8' }]).length, 1);
});

test('separate moveto sections do not create phantom connecting strokes', () => {
  const other = { class: 'leaf-blade', d: 'M20 0 H30 V10 H20 Z' };
  assert.equal(
    geometryFindings([box, other, { class: 'leaf-vein', d: 'M2 2 L8 8 M22 2 L28 8' }]).length,
    0,
  );
});

test('relative, smooth and cubic paths are supported; malformed paths fail', () => {
  const shape = flattenPath('m1 1 c1 0 2 1 3 2 s2 2 3 2 q1 1 0 2 t-2 1 l-5 0 z');
  assert.equal(shape.length, 1);
  assert.ok(shape[0].closed && shape[0].points.length > 10);
  assert.throws(() => flattenPath('M1 2 Q3 4 5'), /Incomplete/);
  assert.throws(() => flattenPath('M1 2 A3 4 0 0 1 5 6'), /convert arcs/);
});

test('rounding tolerance is small and does not conceal whole-unit protrusions', () => {
  assert.equal(geometryFindings([box, { class: 'leaf-vein', d: 'M5 5 L10.02 5' }]).length, 0);
  assert.equal(geometryFindings([box, { class: 'leaf-vein', d: 'M5 5 L10.2 5' }]).length, 1);
});
