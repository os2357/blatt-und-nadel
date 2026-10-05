// SPDX-FileCopyrightText: 2026 Oliver Simon
// SPDX-License-Identifier: MIT
import sharp from 'sharp';

// Find disconnected painted parts, including gaps between a filled needle and
// a curved twig. The current conifer icons each depict one connected shoot.
// Ignore isolated antialiasing specks smaller than 0.05 viewBox square units.
export async function paintedComponents(source, scale = 16) {
  const size = 96 * scale;
  const alpha = await sharp(Buffer.from(source), { density: 72 * scale })
    .resize(size, size)
    .ensureAlpha()
    .extractChannel('alpha')
    .raw()
    .toBuffer();
  const seen = new Uint8Array(size * size);
  const queue = new Int32Array(size * size);
  const components = [];
  for (let pixel = 0; pixel < alpha.length; pixel++) {
    if (seen[pixel] || alpha[pixel] < 64) continue;
    let head = 0,
      tail = 1,
      minX = size,
      minY = size,
      maxX = 0,
      maxY = 0;
    queue[0] = pixel;
    seen[pixel] = 1;
    while (head < tail) {
      const current = queue[head++];
      const x = current % size,
        y = Math.floor(current / size);
      minX = Math.min(minX, x);
      minY = Math.min(minY, y);
      maxX = Math.max(maxX, x);
      maxY = Math.max(maxY, y);
      for (let dy = -1; dy <= 1; dy++)
        for (let dx = -1; dx <= 1; dx++) {
          const nx = x + dx,
            ny = y + dy;
          if (nx < 0 || ny < 0 || nx >= size || ny >= size) continue;
          const neighbor = ny * size + nx;
          if (!seen[neighbor] && alpha[neighbor] >= 64) {
            seen[neighbor] = 1;
            queue[tail++] = neighbor;
          }
        }
    }
    const area = tail / scale ** 2;
    if (area >= 0.05)
      components.push({ area, bounds: [minX, minY, maxX, maxY].map((n) => n / scale) });
  }
  return components;
}

// Compare the painted interior strokes with the filled blade plus its visible
// outline. This includes stroke widths, round caps and round joins.
export async function paintedStrokeExcursion(paths, scale = 16) {
  const size = 96 * scale;
  const blades = paths.filter((p) => p.class === 'leaf-blade');
  const interior = paths.filter((p) => ['leaf-vein', 'leaf-midrib'].includes(p.class));
  if (!interior.length) return { outsidePixels: 0, point: null };
  const draw = (items, filled) =>
    items
      .map(
        (p) =>
          '<path d="' +
          p.d +
          '" fill="' +
          (filled ? 'black' : 'none') +
          '" stroke="black" stroke-width="' +
          p['stroke-width'] +
          '"/>',
      )
      .join('');
  const raster = (body) =>
    sharp(
      Buffer.from(
        '<svg xmlns="http://www.w3.org/2000/svg" width="' +
          size +
          '" height="' +
          size +
          '" viewBox="0 0 96 96" stroke-linecap="round" stroke-linejoin="round">' +
          body +
          '</svg>',
      ),
    )
      .ensureAlpha()
      .extractChannel('alpha')
      .raw()
      .toBuffer();
  const [mask, ink] = await Promise.all([
    raster(draw(blades, true)),
    raster(draw(interior, false)),
  ]);
  let outsidePixels = 0,
    point = null;
  for (let y = 0; y < size; y++)
    for (let x = 0; x < size; x++) {
      const index = y * size + x;
      if (ink[index] < 64 || mask[index] >= 64) continue;
      let covered = false;
      // One raster pixel permits small antialiasing differences (1/16 viewBox unit).
      for (let dy = -1; dy <= 1; dy++)
        for (let dx = -1; dx <= 1; dx++) {
          const xx = x + dx,
            yy = y + dy;
          if (xx >= 0 && yy >= 0 && xx < size && yy < size && mask[yy * size + xx] >= 64)
            covered = true;
        }
      if (!covered) {
        outsidePixels++;
        point ||= [x / scale, y / scale];
      }
    }
  return { outsidePixels, point };
}
