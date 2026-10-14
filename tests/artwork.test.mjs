// SPDX-FileCopyrightText: 2026 Oliver Simon
// SPDX-License-Identifier: MIT
import assert from 'node:assert/strict';
import test from 'node:test';
import sax from 'sax';
import { read, variants } from '../scripts/lib.mjs';
import { flattenPath, segmentDistance } from '../scripts/geometry.mjs';

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

test('Atlas cedar needles arise from three short shoots or the terminal extension and retain linear bodies', () => {
  for (const variant of variants) {
    const axes = paths('atlas-zeder', variant).filter((p) => p.class === 'leaf-axis');
    assert.equal(axes.length, 4, 'One main twig and three explicit short shoots');
    const main = flattenPath(axes[0].d)[0].points;
    const spurs = axes.slice(1).map((p) => flattenPath(p.d)[0].points);
    const ends = spurs.map((p) => p.at(-1));
    const onMain = (p) => Math.min(...main.slice(1).map((b, i) => segmentDistance(p, main[i], b)));
    for (const spur of spurs) {
      assert.ok(onMain(spur[0]) < 0.02, 'Short shoot starts on the parent twig');
      assert.ok(onMain(spur.at(-1)) > 3, 'Rosette is visibly displaced from the parent axis');
    }
    const groups = [0, 0, 0];
    let solitary = 0;
    for (const { base, points } of needleBases('atlas-zeder', variant)) {
      const group = ends.findIndex((p) => Math.hypot(p[0] - base[0], p[1] - base[1]) < 1);
      if (group >= 0) groups[group]++;
      else {
        solitary++;
        assert.ok(onMain(base) < 0.02, 'Solitary needle attaches to the actual curved twig');
      }
      const tip = points.reduce((a, b) =>
        Math.hypot(a[0] - base[0], a[1] - base[1]) > Math.hypot(b[0] - base[0], b[1] - base[1])
          ? a
          : b,
      );
      const L = Math.hypot(tip[0] - base[0], tip[1] - base[1]);
      const u = [(tip[0] - base[0]) / L, (tip[1] - base[1]) / L];
      const local = points.map((p) => {
        const x = p[0] - base[0],
          y = p[1] - base[1];
        return [x * u[0] + y * u[1], -x * u[1] + y * u[0]];
      });
      const width = (t) => {
        const cuts = [];
        const x = L * t;
        for (let i = 1; i < local.length; i++) {
          const a = local[i - 1],
            b = local[i];
          if ((a[0] <= x && b[0] > x) || (b[0] <= x && a[0] > x))
            cuts.push(a[1] + ((b[1] - a[1]) * (x - a[0])) / (b[0] - a[0]));
        }
        assert.ok(cuts.length >= 2, 'Two margins intersect the transverse section');
        return Math.max(...cuts) - Math.min(...cuts);
      };
      assert.ok(
        width(0.7) / width(0.35) > 0.74,
        'Needle retains near-parallel sides before the short terminal taper',
      );
    }
    assert.deepEqual(groups, variant === 'detail' ? [22, 24, 21] : [12, 13, 11]);
    assert.equal(solitary, variant === 'detail' ? 4 : 2);
  }
});

test('pine fascicles preserve five- versus two-needle groups in both sizes', () => {
  for (const variant of variants) {
    for (const [id, perBundle, bundleCount] of [
      ['zirbelkiefer', 5, 3],
      ['bergkiefer', 2, variant === 'detail' ? 8 : 4],
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
    assert.equal(counts('bergkiefer', variant)['leaf-sheath'], variant === 'detail' ? 8 : 4);
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

// v2.3 conifer revisions: needle bodies, sheath proportions, short shoots and buds (selected forms, not species counts).
function needleProfile(points) {
  let best = [0, 0, 0];
  for (let i = 0; i < points.length; i++)
    for (let j = i + 1; j < points.length; j++) {
      const d = Math.hypot(points[i][0] - points[j][0], points[i][1] - points[j][1]);
      if (d > best[0]) best = [d, i, j];
    }
  const [length, i, j] = best,
    a = points[i],
    b = points[j];
  const ux = (b[0] - a[0]) / length,
    uy = (b[1] - a[1]) / length;
  const width = (f) => {
    let lo = Infinity,
      hi = -Infinity;
    for (let k = 0; k < points.length; k++) {
      const p = points[k],
        q = points[(k + 1) % points.length];
      const tp = (p[0] - a[0]) * ux + (p[1] - a[1]) * uy,
        tq = (q[0] - a[0]) * ux + (q[1] - a[1]) * uy,
        t = f * length;
      if ((tp - t) * (tq - t) <= 0 && tp !== tq) {
        const s = (t - tp) / (tq - tp);
        const n = (p[0] + s * (q[0] - p[0]) - a[0]) * -uy + (p[1] + s * (q[1] - p[1]) - a[1]) * ux;
        lo = Math.min(lo, n);
        hi = Math.max(hi, n);
      }
    }
    return hi - lo;
  };
  return { length, width };
}

test('revised spruce, Douglas-fir and Nordmann fir needles keep parallel-sided bodies', () => {
  for (const variant of variants)
    for (const id of ['fichte', 'douglasie', 'nordmanntanne']) {
      for (const { points } of needleBases(id, variant)) {
        const { width } = needleProfile(points);
        const body = [0.3, 0.4, 0.5, 0.6, 0.7].map(width);
        const max = Math.max(...body);
        assert.ok(
          Math.min(...body) >= 0.93 * max,
          `${id}/${variant}: needle body tapers or swells`,
        );
      }
    }
});

test('two-needle pine sheaths keep natural proportions to the needles', () => {
  for (const variant of variants)
    for (const [id, min, max] of [
      ['kiefer', 5.5, 12],
      ['bergkiefer', 2.5, 5.5],
      ['schwarzkiefer', 7, 14],
      ['pinie', 8, 16],
      ['aleppo-kiefer', 6, 12],
      ['strandkiefer', 6, 12],
    ]) {
      const needle = Math.max(
        ...needleBases(id, variant).map(({ points }) => needleProfile(points).length),
      );
      const sheaths = paths(id, variant)
        .filter((p) => p.class === 'leaf-sheath')
        .map((p) => needleProfile(flattenPath(p.d)[0].points).length);
      const ratio = needle / Math.max(...sheaths);
      assert.ok(
        ratio >= min && ratio <= max,
        `${id}/${variant}: needle : sheath ${ratio.toFixed(1)}`,
      );
    }
});

test('larch tufts arise from visible short shoots, and fir and spruce shoots end in buds', () => {
  for (const variant of variants) {
    const axes = paths('laerche', variant).filter((p) => p.class === 'leaf-axis');
    const knobs = axes.filter((p) => Number(p['stroke-width']) >= (variant === 'detail' ? 3 : 4.4));
    assert.equal(knobs.length, 2, 'two short shoots');
    for (const knob of knobs) {
      const [start, end] = flattenPath(knob.d)[0].points;
      assert.ok(
        Math.hypot(end[0] - start[0], end[1] - start[1]) >= 3.5,
        'short shoot is a visible stub',
      );
      const tuft = axes.filter((p) => {
        const s = flattenPath(p.d)[0].points[0];
        return p !== knob && Math.hypot(s[0] - end[0], s[1] - end[1]) < 0.01;
      });
      assert.ok(
        tuft.length >= (variant === 'detail' ? 13 : 8),
        'needles originate at the short-shoot tip',
      );
    }
    assert.equal(counts('tanne', variant)['leaf-bud'], variant === 'detail' ? 3 : 1);
    assert.equal(counts('fichte', variant)['leaf-bud'], 1);
    assert.equal(counts('douglasie', variant)['leaf-bud'], 1);
  }
});

test('v2.3 additions keep their selected leaflet, leaf and stipule counts', () => {
  for (const variant of variants) {
    const D = variant === 'detail';
    for (const [id, expected] of Object.entries({
      brombeere: 5,
      schnurbaum: D ? 11 : 9,
      'schmalblaettrige-esche': 7,
      kartoffelrose: 7,
      johannisbrotbaum: 6,
      moenchspfeffer: D ? 7 : 5,
      mistel: 4,
    }))
      assert.equal(counts(id, variant)['leaf-blade'], expected, `${id}/${variant}`);
    assert.equal(counts('kartoffelrose', variant)['leaf-stipule'], 2, 'rugosa stipules');
    assert.equal(
      counts('spaete-traubenkirsche', variant)['leaf-gland'] || 0,
      D ? 2 : 0,
      'black cherry glands',
    );
    assert.equal(
      counts('bruchweide', variant)['leaf-gland'] || 0,
      D ? 2 : 0,
      'crack willow glands',
    );
  }
});

test('even-pinnate carob has no terminal leaflet and the new conifers keep their foliage types', () => {
  for (const variant of variants) {
    const blades = paths('johannisbrotbaum', variant).filter((p) => p.class === 'leaf-blade');
    const tips = blades.map((p) => Math.min(...flattenPath(p.d)[0].points.map((q) => q[1])));
    // two leaflets per pair: the highest pair shares the top position instead of a single terminal leaflet
    const top = Math.min(...tips);
    assert.equal(tips.filter((y) => y < top + 4).length, 2, `${variant}: paired top leaflets`);
    assert.ok((counts('riesenmammutbaum', variant)['leaf-needle'] || 0) > 30, 'sequoia awl scales');
    assert.ok((counts('blaufichte', variant)['leaf-needle'] || 0) > 20, 'blue spruce needles');
    assert.equal(counts('hemlocktanne', variant)['leaf-sheath'] || 0, 0, 'hemlock without sheaths');
  }
});
