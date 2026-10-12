// SPDX-FileCopyrightText: 2026 Oliver Simon
// SPDX-License-Identifier: MIT
import assert from 'node:assert/strict';
import test from 'node:test';
import sax from 'sax';
import { read, variants } from '../scripts/lib.mjs';
import { flattenPath } from '../scripts/geometry.mjs';

function paths(id, variant) {
  const result = [];
  const parser = sax.parser(true);
  parser.onopentag = ({ name, attributes }) => {
    if (name === 'path') result.push(attributes);
  };
  parser.write(read(`icons/${variant}/${id}.svg`)).close();
  return result;
}

function counts(id, variant) {
  const result = {};
  const parser = sax.parser(true);
  parser.onopentag = ({ name, attributes }) => {
    if (name === 'path') result[attributes.class] = (result[attributes.class] || 0) + 1;
  };
  parser.write(read(`icons/${variant}/${id}.svg`)).close();
  return result;
}

// These are the selected forms documented in BOTANY.md, not universal species counts.
test('compound additions retain their selected leaflet counts in both optical sizes', () => {
  for (const variant of variants)
    for (const [id, expected] of Object.entries({
      'schwarzer-holunder': 5,
      walnuss: 7,
      hundsrose: 7,
      eschenahorn: 3,
      speierling: 13,
    }))
      assert.equal(counts(id, variant)['leaf-blade'], expected, `${id}/${variant}`);
});

test('petiolar glands are retained in Detail and deliberately omitted in Compact', () => {
  for (const id of ['vogelkirsche', 'traubenkirsche', 'gewoehnlicher-schneeball']) {
    assert.equal(counts(id, 'detail')['leaf-gland'], 2, id);
    assert.equal(counts(id, 'compact')['leaf-gland'] || 0, 0, id);
  }
});

test('dog rose retains paired stipules in both sizes', () => {
  for (const variant of variants)
    assert.equal(counts('hundsrose', variant)['leaf-stipule'], 2, variant);
});

test('diagnostic venation reductions agree with the botanical notes', () => {
  const pairs = {
    'roter-hartriegel': [4, 3],
    kornelkirsche: [4, 3],
    kreuzdorn: [4, 3],
    faulbaum: [8, 4],
    flatterulme: [14, 6],
    traubenkirsche: [10, 4],
    grauerle: [12, 6],
    mehlbeere: [12, 6],
    baumhasel: [6, 3],
  };
  for (const [id, [detail, compact]] of Object.entries(pairs)) {
    assert.equal(counts(id, 'detail')['leaf-vein'], detail * 2, `${id}/detail`);
    assert.equal(counts(id, 'compact')['leaf-vein'], compact * 2, `${id}/compact`);
  }
  assert.equal(counts('feldulme', 'detail')['leaf-vein'], 24 + 4, 'Twelve pairs plus four forks');
  assert.equal(counts('feldulme', 'compact')['leaf-vein'], 12, 'Six pairs without forks');
});

test('Ginkgo has a branching vein tree without a dicot midrib or isolated branches', () => {
  for (const variant of variants) {
    const artwork = paths('ginkgo', variant);
    assert.ok(!artwork.some((p) => p.class === 'leaf-midrib'));
    const nodes = new Map();
    const node = (point) => {
      const key = point.map((v) => v.toFixed(3)).join(',');
      if (!nodes.has(key)) nodes.set(key, { incoming: 0, outgoing: 0 });
      return nodes.get(key);
    };
    for (const path of artwork.filter((p) => p.class === 'leaf-vein')) {
      const [line] = flattenPath(path.d);
      const start = line.points[0],
        end = line.points.at(-1);
      assert.ok(end[1] < start[1], 'Each branch progresses toward the fan margin');
      node(start).outgoing++;
      node(end).incoming++;
    }
    const degrees = [...nodes.values()];
    assert.equal(degrees.filter((n) => n.incoming === 0).length, 1, 'One connected basal origin');
    for (const n of degrees) {
      assert.ok(n.incoming <= 1, 'No merging of separate nerves');
      assert.ok(n.outgoing === 0 || n.outgoing === 2, 'Each branching node bifurcates');
    }
    assert.equal(degrees.filter((n) => n.outgoing === 0).length, variant === 'detail' ? 8 : 4);
  }
});
