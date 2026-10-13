// SPDX-FileCopyrightText: 2026 Oliver Simon
// SPDX-License-Identifier: MIT
import { validateAudit } from './audit.mjs';
import { catalog, pkg, read } from './lib.mjs';
const audit = JSON.parse(read('docs/' + pkg.botanicalAudit));
validateAudit(audit, catalog.icons, pkg.version, read);
console.log(
  `Audit matches all ${audit.sourceSVGs} source SVGs and both optical variants of ${audit.species} taxa.`,
);
