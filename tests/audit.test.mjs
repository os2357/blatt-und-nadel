// SPDX-FileCopyrightText: 2026 Oliver Simon
// SPDX-License-Identifier: MIT
import assert from 'node:assert/strict';
import test from 'node:test';
import { validateAudit } from '../scripts/audit.mjs';
import { catalog, pkg, read } from '../scripts/lib.mjs';
const current = () => JSON.parse(read('docs/' + pkg.botanicalAudit));
test('current review covers the exact distributed artwork', () => {
  validateAudit(current(), catalog.icons, pkg.version, read);
});
test('an edit made after review invalidates its artwork evidence', () => {
  assert.throws(
    () =>
      validateAudit(
        current(),
        catalog.icons,
        pkg.version,
        (file) => read(file) + (file === 'icons/detail/ginkgo.svg' ? '\n<!-- changed -->' : ''),
      ),
    /artwork changed after the recorded review/,
  );
});
test('Detail-only review cannot stand in for the Compact review', () => {
  const audit = current();
  audit.records[0].variants = audit.records[0].variants.filter(
    (variant) => variant.variant === 'detail',
  );
  assert.throws(
    () => validateAudit(audit, catalog.icons, pkg.version, read),
    /optical-size coverage/,
  );
});
test('an older release audit cannot silently cover a new release', () => {
  const audit = current();
  audit.release = '0.0.0';
  assert.throws(
    () => validateAudit(audit, catalog.icons, pkg.version, read),
    /Audit release does not match/,
  );
});
