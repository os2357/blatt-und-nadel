// SPDX-FileCopyrightText: 2026 Oliver Simon
// SPDX-License-Identifier: MIT
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';

// Bind the review record to the exact artwork that will be distributed.
// This detects stale evidence; it cannot perform or certify botanical review.
export function validateAudit(audit, icons, version, readArtwork) {
  assert.equal(audit.release, version, 'Audit release does not match package version');
  assert.equal(audit.species, icons.length, 'Audit species count');
  assert.equal(audit.sourceSVGs, icons.length * 2, 'Audit SVG count');
  const expected = icons.map((icon) => icon.id).sort();
  assert.deepEqual(
    audit.records.map((record) => record.id).sort(),
    expected,
    'Audit taxon coverage',
  );
  const changes = { added: 0, revised: 0, unchanged: 0 };
  for (const record of audit.records) {
    const icon = icons.find((item) => item.id === record.id);
    assert.equal(record.scientificName, icon.scientificName, record.id + ': audit taxon name');
    assert.equal(record.descriptionSource, icon.source, record.id + ': audit primary source');
    assert.ok(
      record.finding?.trim() && record.variantLimits?.trim(),
      record.id + ': missing review',
    );
    assert.ok(record.referenceImages?.length, record.id + ': missing photograph references');
    assert.deepEqual(
      record.variants.map((variant) => variant.variant).sort(),
      ['compact', 'detail'],
      record.id + ': optical-size coverage',
    );
    for (const variant of record.variants) {
      const file = `icons/${variant.variant}/${record.id}.svg`;
      assert.equal(variant.file, file, 'Unexpected artwork path');
      const hash = createHash('sha256').update(readArtwork(file)).digest('hex');
      assert.equal(variant.sha256, hash, file + ': artwork changed after the recorded review');
      assert.ok(Object.hasOwn(changes, variant.change), file + ': unknown change classification');
      changes[variant.change]++;
      if (variant.change === 'added')
        assert.equal(variant.baselineSHA256, null, file + ': added artwork has a baseline');
      else {
        assert.match(variant.baselineSHA256, /^[a-f0-9]{64}$/, file + ': missing baseline hash');
        assert.equal(
          hash === variant.baselineSHA256,
          variant.change === 'unchanged',
          file + ': incorrect baseline classification',
        );
      }
    }
  }
  assert.equal(audit.addedSourceSVGs, changes.added, 'Added SVG total');
  assert.equal(audit.revisedSourceSVGs, changes.revised, 'Revised SVG total');
  assert.equal(audit.unchangedSourceSVGs, changes.unchanged, 'Unchanged SVG total');
}
