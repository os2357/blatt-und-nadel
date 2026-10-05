// SPDX-FileCopyrightText: 2026 Oliver Simon
// SPDX-License-Identifier: MIT
import assert from 'node:assert/strict';

const arity = { M: 2, L: 2, H: 1, V: 1, Q: 4, T: 2, C: 6, S: 4, Z: 0 };
const midpoint = (a, b) => a.map((v, k) => (v + b[k]) / 2);
const equal = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1]) < 1e-10;

export function segmentDistance(point, a, b) {
  const dx = b[0] - a[0],
    dy = b[1] - a[1];
  const squared = dx * dx + dy * dy;
  const t = squared
    ? Math.max(0, Math.min(1, ((point[0] - a[0]) * dx + (point[1] - a[1]) * dy) / squared))
    : 0;
  return Math.hypot(point[0] - a[0] - t * dx, point[1] - a[1] - t * dy);
}

// Flatten Beziers adaptively. The control hull bounds the curve error.
function flattenCurve(points, output, tolerance, depth = 0) {
  const a = points[0],
    b = points.at(-1);
  if (points.slice(1, -1).every((p) => segmentDistance(p, a, b) <= tolerance)) {
    output.push(b);
    return;
  }
  assert.ok(depth < 24, 'Curve subdivision exceeded its safe limit');
  const levels = [points];
  while (levels.at(-1).length > 1) {
    const level = levels.at(-1);
    levels.push(level.slice(1).map((p, i) => midpoint(level[i], p)));
  }
  flattenCurve(
    levels.map((level) => level[0]),
    output,
    tolerance,
    depth + 1,
  );
  flattenCurve(levels.map((level) => level.at(-1)).reverse(), output, tolerance, depth + 1);
}

export function flattenPath(d, tolerance = 0.01) {
  assert.ok(typeof d === 'string' && d.length, 'Empty path');
  assert.ok(Number.isFinite(tolerance) && tolerance > 0, 'Invalid tolerance');
  const tokens = d.match(/[a-zA-Z]|[-+]?(?:\d*\.\d+|\d+\.?)(?:[eE][-+]?\d+)?/g) || [];
  assert.ok(
    !d.replace(/[a-zA-Z]|[-+]?(?:\d*\.\d+|\d+\.?)(?:[eE][-+]?\d+)?|[\s,]/g, ''),
    'Unsupported characters in path',
  );
  let index = 0,
    command,
    point = [0, 0],
    first,
    current,
    previous,
    control;
  const subpaths = [];
  while (index < tokens.length) {
    if (/^[a-zA-Z]$/.test(tokens[index])) command = tokens[index++];
    assert.ok(
      command && Object.hasOwn(arity, command.toUpperCase()),
      'Unsupported path command; convert arcs to Bezier curves: ' + command,
    );
    const op = command.toUpperCase(),
      relative = command !== op;
    if (op === 'Z') {
      assert.ok(current, 'Close without moveto');
      if (!equal(point, first)) current.points.push(first);
      current.closed = true;
      point = first;
      previous = 'Z';
      control = null;
      command = null;
      continue;
    }
    const count = arity[op],
      args = tokens.slice(index, index + count).map(Number);
    assert.ok(
      args.length === count && args.every(Number.isFinite),
      'Incomplete path command ' + command,
    );
    index += count;
    const origin = point;
    const pair = (n) => [
      args[n] + (relative ? origin[0] : 0),
      args[n + 1] + (relative ? origin[1] : 0),
    ];
    const reflected = (compatible) =>
      compatible.includes(previous) && control ? point.map((v, k) => 2 * v - control[k]) : point;
    if (op === 'M') {
      point = pair(0);
      first = point;
      current = { points: [point], closed: false };
      subpaths.push(current);
      command = relative ? 'l' : 'L';
      control = null;
    } else {
      assert.ok(current, 'Path must begin with moveto');
      let curve;
      if (op === 'L') point = pair(0);
      if (op === 'H') point = [args[0] + (relative ? origin[0] : 0), origin[1]];
      if (op === 'V') point = [origin[0], args[0] + (relative ? origin[1] : 0)];
      if (op === 'Q') {
        control = pair(0);
        point = pair(2);
        curve = [origin, control, point];
      }
      if (op === 'T') {
        control = reflected(['Q', 'T']);
        point = pair(0);
        curve = [origin, control, point];
      }
      if (op === 'C') {
        const c1 = pair(0);
        control = pair(2);
        point = pair(4);
        curve = [origin, c1, control, point];
      }
      if (op === 'S') {
        const c1 = reflected(['C', 'S']);
        control = pair(0);
        point = pair(2);
        curve = [origin, c1, control, point];
      }
      if (curve) flattenCurve(curve, current.points, tolerance);
      else {
        current.points.push(point);
        control = null;
      }
    }
    previous = op;
  }
  assert.ok(subpaths.length && subpaths.every((p) => p.points.length > 1), 'Empty subpath');
  return subpaths;
}

export function pointInside(point, polygon) {
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const a = polygon[i],
      b = polygon[j];
    if (
      a[1] > point[1] !== b[1] > point[1] &&
      point[0] < ((b[0] - a[0]) * (point[1] - a[1])) / (b[1] - a[1]) + a[0]
    )
      inside = !inside;
  }
  return inside;
}

export function boundaryDistance(point, polygon) {
  let distance = Infinity;
  for (let i = 1; i < polygon.length; i++)
    distance = Math.min(distance, segmentDistance(point, polygon[i - 1], polygon[i]));
  return distance;
}

// A closed blade may have concave lobes, but its contour must not cross itself.
export function contourCrossings(polygon) {
  const cross = (a, b, c) => (b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0]);
  const crossings = [];
  for (let i = 1; i < polygon.length; i++) {
    for (let j = i + 2; j < polygon.length; j++) {
      if (i === 1 && j === polygon.length - 1) continue;
      const a = polygon[i - 1],
        b = polygon[i],
        c = polygon[j - 1],
        d = polygon[j];
      if (cross(a, b, c) * cross(a, b, d) < -1e-10 && cross(c, d, a) * cross(c, d, b) < -1e-10)
        crossings.push([i, j]);
    }
  }
  return crossings;
}

export function maximumVeinExcursion(vein, blades, spacing = 0.2) {
  let maximum = 0,
    worstPoint = null;
  for (const subpath of vein) {
    for (let i = 1; i < subpath.points.length; i++) {
      const a = subpath.points[i - 1],
        b = subpath.points[i];
      const steps = Math.max(1, Math.ceil(Math.hypot(b[0] - a[0], b[1] - a[1]) / spacing));
      for (let j = 0; j <= steps; j++) {
        const point = a.map((value, k) => value + ((b[k] - value) * j) / steps);
        if (blades.some((polygon) => pointInside(point, polygon))) continue;
        const distance = Math.min(...blades.map((polygon) => boundaryDistance(point, polygon)));
        if (distance > maximum) {
          maximum = distance;
          worstPoint = point;
        }
      }
    }
  }
  return { maximum, point: worstPoint };
}

export function geometryFindings(paths, tolerance = 0.06) {
  const blades = paths
    .filter((p) => p.class === 'leaf-blade')
    .flatMap((p) =>
      flattenPath(p.d).map((subpath) => {
        assert.ok(subpath.closed, 'Blade outline must be closed');
        return subpath.points;
      }),
    );
  const findings = [];
  if (!blades.length) return findings;
  paths.forEach((path, index) => {
    if (!['leaf-vein', 'leaf-midrib'].includes(path.class)) return;
    const result = maximumVeinExcursion(flattenPath(path.d), blades);
    if (result.maximum > tolerance) findings.push({ path: index, ...result });
  });
  return findings;
}

// Separate leaflets must not intersect, contain one another or overlap through
// their painted outlines. Petiolules and the rachis are intentionally separate.
export function bladeSeparationFindings(paths, tolerance = 0.06) {
  const blades = paths.flatMap((path, index) =>
    path.class === 'leaf-blade'
      ? flattenPath(path.d).map(({ points }) => ({
          points,
          index,
          width: Number(path['stroke-width'] || 0),
        }))
      : [],
  );
  const cross = (a, b, c) => (b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0]);
  const findings = [];
  for (let i = 0; i < blades.length; i++) {
    for (let j = i + 1; j < blades.length; j++) {
      const a = blades[i],
        b = blades[j];
      let distance = Infinity,
        crossings = 0;
      for (let p = 1; p < a.points.length; p++) {
        for (let q = 1; q < b.points.length; q++) {
          const u = a.points[p - 1],
            v = a.points[p],
            x = b.points[q - 1],
            y = b.points[q];
          if (
            cross(u, v, x) * cross(u, v, y) < -1e-10 &&
            cross(x, y, u) * cross(x, y, v) < -1e-10
          ) {
            crossings++;
            distance = 0;
          } else {
            distance = Math.min(
              distance,
              segmentDistance(u, x, y),
              segmentDistance(v, x, y),
              segmentDistance(x, u, v),
              segmentDistance(y, u, v),
            );
          }
        }
      }
      const nested =
        a.points.some(
          (p) => pointInside(p, b.points) && boundaryDistance(p, b.points) > tolerance,
        ) ||
        b.points.some((p) => pointInside(p, a.points) && boundaryDistance(p, a.points) > tolerance);
      const clearance = distance - (a.width + b.width) / 2;
      if (crossings || nested || clearance < -tolerance)
        findings.push({
          paths: [a.index, b.index],
          kind: crossings ? 'crossing' : nested ? 'containment' : 'stroke-overlap',
          crossings,
          clearance,
        });
    }
  }
  return findings;
}
