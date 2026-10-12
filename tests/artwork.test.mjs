// SPDX-FileCopyrightText: 2026 Oliver Simon
// SPDX-License-Identifier: MIT
import assert from 'node:assert/strict';
import test from 'node:test';
import sax from 'sax';
import { read, variants } from '../scripts/lib.mjs';

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
  };
  for (const [id, [detail, compact]] of Object.entries(pairs)) {
    assert.equal(counts(id, 'detail')['leaf-vein'], detail * 2, `${id}/detail`);
    assert.equal(counts(id, 'compact')['leaf-vein'], compact * 2, `${id}/compact`);
  }
});
