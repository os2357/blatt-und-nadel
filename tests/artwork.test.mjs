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
      'roter-holunder': 5,
      himbeere: 3,
      goetterbaum: 9,
      essigbaum: 11,
      mahonie: 7,
      kratzbeere: 3,
      besenginster: 3,
      waldrebe: 5,
      gleditschie: 16,
      'terpentin-pistazie': 7,
      goldregen: 3,
    }))
      assert.equal(counts(id, variant)['leaf-blade'], expected, `${id}/${variant}`);
});

test('petiolar glands are retained in Detail and deliberately omitted in Compact', () => {
  for (const id of [
    'vogelkirsche',
    'traubenkirsche',
    'gewoehnlicher-schneeball',
    'pfirsich',
    'aprikose',
    'mandel',
  ]) {
    assert.equal(counts(id, 'detail')['leaf-gland'], 2, id);
    assert.equal(counts(id, 'compact')['leaf-gland'] || 0, 0, id);
  }
});

test('heath shoots preserve four-needle whorls versus successive opposite scale pairs', () => {
  for (const variant of variants) {
    for (const [id, role, perNode] of [
      ['schneeheide', 'leaf-needle', 4],
      ['besenheide', 'leaf-scale', 2],
    ]) {
      const groups = [];
      for (const path of paths(id, variant).filter((p) => p.class === role)) {
        const points = flattenPath(path.d)[0].points;
        const base = points[0].map((v, i) => (v + points.at(-2)[i]) / 2);
        const group = groups.find((g) => Math.hypot(g[0][0] - base[0], g[0][1] - base[1]) < 0.03);
        if (group) group.push(base);
        else groups.push([base]);
      }
      assert.ok(groups.length > 3, 'Several distinct insertion nodes are represented');
      assert.ok(
        groups.every((g) => g.length === perNode),
        `${id}/${variant}: node membership`,
      );
    }
  }
});

test('selected Ginkgo fan narrows well before the basal insertion', () => {
  for (const variant of variants) {
    const points = flattenPath(paths('ginkgo', variant).find((p) => p.class === 'leaf-blade').d)[0]
      .points;
    const xs = points.map((p) => p[0]),
      ys = points.map((p) => p[1]);
    const fullWidth = Math.max(...xs) - Math.min(...xs);
    const lowerLevel = Math.max(...ys) - 20;
    const crossings = [];
    for (let i = 1; i < points.length; i++) {
      const [a, b] = [points[i - 1], points[i]];
      if (a[1] > lowerLevel === b[1] > lowerLevel) continue;
      crossings.push(a[0] + ((b[0] - a[0]) * (lowerLevel - a[1])) / (b[1] - a[1]));
    }
    assert.equal(crossings.length, 2);
    const ratio = (Math.max(...crossings) - Math.min(...crossings)) / fullWidth;
    assert.ok(ratio < 0.83, `${variant}: lower fan must taper, not retain the old vertical walls`);
  }
});

test('the selected even-pinnate honey locust leaf has no terminal leaflet', () => {
  for (const variant of variants) {
    const blades = paths('gleditschie', variant).filter((p) => p.class === 'leaf-blade');
    let left = 0,
      right = 0;
    for (const blade of blades) {
      const xs = flattenPath(blade.d)[0].points.map((p) => p[0]);
      if (Math.max(...xs) < 48) left++;
      else if (Math.min(...xs) > 48) right++;
      else assert.fail('No blade may straddle the terminal rachis axis');
    }
    assert.equal(left, right);
    assert.equal(left, 8, 'Selected eight-pair form, not a universal species count');
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
    assert.equal(degrees.filter((n) => n.outgoing === 0).length, variant === 'detail' ? 16 : 8);
  }
});

// Closed needle ribbons start at one side of their base and return on the other.
function needleBases(id, variant) {
  return paths(id, variant)
    .filter((p) => p.class === 'leaf-needle')
    .map((path) => {
      const points = flattenPath(path.d)[0].points;
      const base = points[0].map((v, i) => (v + points.at(-2)[i]) / 2);
      return { base, points };
    });
}

test('pine fascicles preserve five- versus two-needle groups in both sizes', () => {
  for (const variant of variants) {
    for (const [id, perBundle, bundleCount] of [
      ['zirbelkiefer', 5, 3],
      ['bergkiefer', 2, 4],
      ['kiefer', 2, 3],
      ['schwarzkiefer', 2, 3],
      ['pinie', 2, 3],
      ['aleppo-kiefer', 2, 3],
      ['strandkiefer', 2, 3],
      ['weymouth-kiefer', 5, 2],
    ]) {
      const groups = [];
      for (const { base } of needleBases(id, variant)) {
        const group = groups.find((g) => Math.hypot(g[0][0] - base[0], g[0][1] - base[1]) < 1.8);
        if (group) group.push(base);
        else groups.push([base]);
      }
      assert.equal(groups.length, bundleCount, id + ': separated origins');
      assert.ok(
        groups.every((g) => g.length === perBundle),
        id + ': bundle membership',
      );
    }
    assert.equal(
      counts('weymouth-kiefer', variant)['leaf-sheath'] || 0,
      0,
      'Mature fascicles after sheath loss',
    );
    assert.equal(counts('bergkiefer', variant)['leaf-sheath'], 4);
    assert.equal(counts('kiefer', variant)['leaf-sheath'], 3);
    assert.equal(counts('schwarzkiefer', variant)['leaf-sheath'], 3);
    for (const id of ['pinie', 'aleppo-kiefer', 'strandkiefer'])
      assert.equal(counts(id, variant)['leaf-sheath'], 3);
    assert.equal(
      counts('zirbelkiefer', variant)['leaf-sheath'] || 0,
      0,
      'Selected mature fascicles',
    );
  }
});

test('bald cypress keeps individually alternating insertions with separate origins', () => {
  for (const variant of variants) {
    const needles = needleBases('sumpfzypresse', variant).sort((a, b) => a.base[1] - b.base[1]);
    assert.equal(needles.length, variant === 'detail' ? 30 : 20);
    let previousSide;
    for (let i = 0; i < needles.length; i++) {
      const { base, points } = needles[i];
      if (i)
        assert.ok(base[1] - needles[i - 1].base[1] > 1, 'Insertion levels must remain separate');
      const tip = points.reduce((a, b) =>
        Math.abs(a[0] - base[0]) > Math.abs(b[0] - base[0]) ? a : b,
      );
      const side = Math.sign(tip[0] - base[0]);
      if (i) assert.notEqual(side, previousSide, 'Successive needles alternate sides');
      previousSide = side;
    }
  }
});

test('chestnut and hop hornbeam primary veins reach the selected marginal teeth', () => {
  for (const [id, detail, compact] of [
    ['edelkastanie', 18, 9],
    ['hopfenbuche', 16, 7],
  ]) {
    for (const variant of variants) {
      const artwork = paths(id, variant);
      const outline = artwork
        .filter((p) => p.class === 'leaf-blade')
        .flatMap((p) => flattenPath(p.d).flatMap((s) => s.points));
      const veins = artwork.filter((p) => p.class === 'leaf-vein');
      assert.equal(veins.length, (variant === 'detail' ? detail : compact) * 2);
      for (const vein of veins) {
        const end = flattenPath(vein.d)[0].points.at(-1);
        assert.ok(
          outline.some((p) => Math.hypot(p[0] - end[0], p[1] - end[1]) < 0.02),
          `${id}/${variant}: endpoint at a contour vertex`,
        );
      }
    }
  }
});

test('selected fan and lanceolate proportions resist accidental outline replacement', () => {
  for (const variant of variants) {
    for (const [id, min, max] of [
      ['ginkgo', 1.4, 1.8],
      ['edelkastanie', 0.25, 0.37],
      ['silberweide', 0.14, 0.23],
    ]) {
      const points = paths(id, variant)
        .filter((p) => p.class === 'leaf-blade')
        .flatMap((p) => flattenPath(p.d).flatMap((s) => s.points));
      const xs = points.map((p) => p[0]),
        ys = points.map((p) => p[1]);
      const ratio = (Math.max(...xs) - Math.min(...xs)) / (Math.max(...ys) - Math.min(...ys));
      assert.ok(ratio >= min && ratio <= max, `${id}/${variant}: selected width/height ${ratio}`);
    }
  }
});

test('dawn redwood needles meet in opposite pairs instead of alternate rows', () => {
  for (const variant of variants) {
    const groups = new Map();
    for (const { base, points } of needleBases('urweltmammutbaum', variant)) {
      const key = base.map((v) => v.toFixed(2)).join(',');
      const farthest = points.reduce((a, b) =>
        Math.abs(a[0] - base[0]) > Math.abs(b[0] - base[0]) ? a : b,
      );
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key).push(farthest[0] - base[0]);
    }
    assert.equal(groups.size, variant === 'detail' ? 14 : 9);
    for (const directions of groups.values()) {
      assert.equal(directions.length, 2, 'Exactly two needles share each insertion level');
      assert.ok(directions[0] * directions[1] < 0, 'The paired needles extend to opposite sides');
    }
  }
});

// A regression for the over-narrow lateral blades found in the v2.0 review.
// These bounds protect the chosen form, not every naturally variable specimen.
import { axisRatio } from '../scripts/measure.mjs';
test('rowan leaflets preserve their revised oblong proportions and terminal size', () => {
  for (const variant of variants) {
    const blades = paths('vogelbeere', variant).filter((p) => p.class === 'leaf-blade');
    assert.equal(blades.length, 11);
    const dimensions = blades.map((p) => axisRatio(p.d));
    for (const d of dimensions)
      assert.ok(d.ratio >= 2.4 && d.ratio <= 3.8, variant + ': over-narrow rowan leaflet');
    const lengths = dimensions.map((d) => d.length);
    assert.ok(
      Math.min(...lengths) / Math.max(...lengths) > 0.7,
      variant + ': undersized terminal leaflet',
    );
  }
});

test('hornbeam veins ascend from separate origins instead of crowding the blade base', () => {
  for (const variant of variants) {
    const veins = paths('hainbuche', variant).filter((p) => p.class === 'leaf-vein');
    assert.equal(veins.length, variant === 'detail' ? 20 : 10);
    const sides = [[], []];
    for (const p of veins) {
      const points = flattenPath(p.d)[0].points,
        start = points[0],
        end = points.at(-1);
      assert.ok(end[1] < start[1] - 2, 'Lateral nerves ascend toward the margin');
      const previous = sides[end[0] < start[0] ? 0 : 1];
      assert.ok(
        previous.every((a) => Math.hypot(a[0] - start[0], a[1] - start[1]) > 0.5),
        'No stacked basal origins',
      );
      previous.push(start);
    }
  }
});

test('Oregon grape keeps nearly sessile lateral leaflets and a stalked terminal leaflet', () => {
  for (const variant of variants) {
    const stalks = paths('mahonie', variant)
      .filter((p) => p.class === 'leaf-petiole')
      .map((p) => {
        const pts = flattenPath(p.d)[0].points;
        return pts
          .slice(1)
          .reduce((sum, p, i) => sum + Math.hypot(p[0] - pts[i][0], p[1] - pts[i][1]), 0);
      });
    assert.equal(stalks.filter((n) => n <= 1.6).length, 6);
    assert.equal(stalks.filter((n) => n >= 10).length, 1);
    assert.equal(counts('mahonie', variant)['leaf-blade'], 7);
  }
});

test('sessile rockroses have basal nerves without an invented external petiole', () => {
  for (const variant of variants) {
    for (const id of ['montpellier-zistrose', 'weissliche-zistrose']) {
      const all = paths(id, variant);
      assert.equal(all.filter((p) => p.class === 'leaf-petiole').length, 0);
      const main = all
        .filter((p) => ['leaf-midrib', 'leaf-vein'].includes(p.class))
        .filter((p) => flattenPath(p.d)[0].points[0][1] >= 85);
      assert.equal(main.length, 3, 'Selected three basal nerves survive the optical reduction');
    }
    assert.equal(counts('salbeiblaettrige-zistrose', variant)['leaf-petiole'], 1);
  }
});

test('mastic foliage retains paired blades and a closed winged rachis', () => {
  for (const variant of variants) {
    const all = paths('mastixstrauch', variant),
      blades = all.filter((p) => p.class === 'leaf-blade');
    assert.equal(blades.length, 8);
    let left = 0,
      right = 0;
    for (const blade of blades) {
      const xs = flattenPath(blade.d)[0].points.map((p) => p[0]);
      if (Math.max(...xs) < 48.5) left++;
      else if (Math.min(...xs) > 48.5) right++;
      else assert.fail('No terminal leaflet across the axis');
    }
    assert.equal(left, 4);
    assert.equal(right, 4);
    const rachis = all.find((p) => p.class === 'leaf-rachis');
    assert.equal(rachis.fill, 'currentColor');
    const contour = flattenPath(rachis.d)[0];
    assert.ok(contour.closed);
    const xs = contour.points.map((p) => p[0]);
    assert.ok(
      Math.max(...xs) - Math.min(...xs) >= 3,
      'Wing membrane must not collapse into a line',
    );
  }
});

// Protect the basal congestion corrected in the 2.2 source review.
test('revised broadleaf veins ascend from distinct origins on each side', () => {
  for (const variant of variants)
    for (const id of ['rotbuche', 'hasel', 'salweide', 'pfeifenstrauch']) {
      const sides = [[], []];
      for (const p of paths(id, variant).filter((p) => p.class === 'leaf-vein')) {
        const points = flattenPath(p.d)[0].points,
          start = points[0],
          end = points.at(-1);
        assert.ok(end[1] < start[1] - 2, id + ': ascending course');
        const side = sides[end[0] < start[0] ? 0 : 1];
        assert.ok(
          side.every((q) => Math.hypot(q[0] - start[0], q[1] - start[1]) > 2),
          id + ': distinct origins',
        );
        side.push(start);
      }
    }
});

test('herb shoots retain paired leaves, narrow blades and an axillary rosemary branch', () => {
  for (const [id, count, min, max] of [
    ['echter-lavendel', 8, 6, 9.5],
    // Endpoint-axis width includes arch height: this protects the selected
    // curved silhouette, not a flattened specimen's length-to-width ratio.
    ['rosmarin', 16, 4.3, 10],
  ])
    for (const variant of variants) {
      const all = paths(id, variant),
        blades = all.filter((p) => p.class === 'leaf-blade'),
        twigs = all.filter((p) => p.class === 'leaf-twig');
      assert.equal(blades.length, count);
      assert.equal(twigs.length, id === 'rosmarin' ? 2 : 1);
      const nodes = [];
      for (let i = 0; i < blades.length; i += 2) {
        const a = flattenPath(blades[i].d)[0].points[0],
          b = flattenPath(blades[i + 1].d)[0].points[0];
        assert.ok(Math.abs(a[1] - b[1]) < 0.01, 'Opposite pair shares insertion level');
        assert.ok(b[0] - a[0] > 2 && b[0] - a[0] < 3, 'Visible paired blade origins');
        nodes.push([(a[0] + b[0]) / 2, a[1]]);
      }
      for (const blade of blades) {
        const d = axisRatio(blade.d);
        assert.ok(d.ratio >= min && d.ratio <= max, id + ': selected narrow proportions');
      }
      if (id === 'rosmarin') {
        const origin = flattenPath(twigs[1].d)[0].points[0];
        assert.ok(
          nodes.some((n) => Math.hypot(n[0] - origin[0], n[1] - origin[1]) < 0.01),
          'Lateral shoot begins at a leaf node, not between nodes',
        );
      }
      assert.equal(
        all.filter((p) => p.class === 'leaf-rachis').length,
        0,
        'Shoot is not a compound leaf',
      );
      if (variant === 'compact')
        assert.equal(
          all.filter((p) => p.class === 'leaf-midrib').length,
          0,
          'Open narrow interiors',
        );
      else
        for (const midrib of all.filter((p) => p.class === 'leaf-midrib'))
          assert.match(midrib.d, /Q/, 'Midrib follows the curved blade');
    }
});
