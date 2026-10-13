// SPDX-FileCopyrightText: 2026 Oliver Simon
// SPDX-License-Identifier: MIT
// Approximate longitudinal drawing ratio, not a measured specimen ratio.
import { flattenPath } from './geometry.mjs';
export function axisRatio(d) {
  const p = flattenPath(d)[0].points;
  let L = 0,
    a,
    b;
  for (let i = 0; i < p.length; i++)
    for (let j = i + 1; j < p.length; j++) {
      const l = Math.hypot(p[j][0] - p[i][0], p[j][1] - p[i][1]);
      if (l > L) {
        L = l;
        a = p[i];
        b = p[j];
      }
    }
  const nx = -(b[1] - a[1]) / L,
    ny = (b[0] - a[0]) / L,
    z = p.map((x) => x[0] * nx + x[1] * ny);
  const width = Math.max(...z) - Math.min(...z);
  return { length: +L.toFixed(3), width: +width.toFixed(3), ratio: +(L / width).toFixed(3) };
}
