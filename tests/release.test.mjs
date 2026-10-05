// SPDX-FileCopyrightText: 2026 Oliver Simon
// SPDX-License-Identifier: MIT
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import test from 'node:test';
import { createArchive, verifyArchive } from '../scripts/release.mjs';

test('rebuilding a ZIP removes an obsolete project tree and refreshes current bytes', () => {
  const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'blatt-und-nadel-release-test-'));
  try {
    const root = path.join(temp, 'source');
    fs.mkdirSync(root);
    fs.writeFileSync(path.join(root, 'README.md'), 'old contents\n');
    const output = path.join(temp, 'release.zip');
    createArchive(root, ['README.md'], output);
    fs.mkdirSync(path.join(temp, 'obsolete-project'));
    fs.writeFileSync(path.join(temp, 'obsolete-project', 'old.svg'), '<svg/>');
    execFileSync('zip', ['-q', output, 'obsolete-project/old.svg'], { cwd: temp });
    assert.throws(
      () => verifyArchive(output, root, ['README.md']),
      /exactly the current project files/,
    );
    fs.writeFileSync(path.join(root, 'README.md'), 'current contents\n');
    createArchive(root, ['README.md'], output);
    verifyArchive(output, root, ['README.md']);
    assert.equal(
      execFileSync('unzip', ['-Z1', output], { encoding: 'utf8' }),
      'blatt-und-nadel/README.md\n',
    );
  } finally {
    fs.rmSync(temp, { recursive: true, force: true });
  }
});
