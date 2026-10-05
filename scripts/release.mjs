// SPDX-FileCopyrightText: 2026 Oliver Simon
// SPDX-License-Identifier: MIT
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const prefix = 'blatt-und-nadel/';
const run = (command, args, options = {}) =>
  execFileSync(command, args, { maxBuffer: 32 * 1024 * 1024, ...options });

export function verifyArchive(archive, root, files) {
  const expected = files.map((file) => prefix + file).sort();
  const actual = run('unzip', ['-Z1', archive], { encoding: 'utf8' }).trimEnd().split('\n');
  assert.equal(new Set(actual).size, actual.length, 'Duplicate archive entries');
  assert.deepEqual(
    actual.sort(),
    expected,
    'Archive must contain exactly the current project files',
  );
  run('unzip', ['-tq', archive]);
  for (const file of files) {
    const archived = run('unzip', ['-p', archive, prefix + file]);
    assert.ok(
      archived.equals(fs.readFileSync(path.join(root, file))),
      'Stale archive file: ' + file,
    );
  }
}

export function createArchive(root, files, output) {
  assert.ok(files.length, 'No release files');
  assert.equal(new Set(files).size, files.length, 'Duplicate source entries');
  for (const file of files) {
    assert.ok(
      file && !path.isAbsolute(file) && !file.split('/').includes('..') && !/[\r\n\\]/.test(file),
      'Invalid release path: ' + file,
    );
    assert.ok(
      !/(^|\/)(\.git|node_modules|test-results|dist)(\/|$)|\.zip$/i.test(file),
      'Excluded release path: ' + file,
    );
    assert.ok(fs.lstatSync(path.join(root, file)).isFile(), 'Expected a regular file: ' + file);
    assert.notEqual(
      path.resolve(root, file),
      path.resolve(output),
      'Output must not be a source file',
    );
  }
  const staging = fs.mkdtempSync(path.join(os.tmpdir(), 'blatt-und-nadel-release-'));
  fs.mkdirSync(path.dirname(output), { recursive: true });
  // A unique sibling allows atomic replacement, even when output already exists.
  const destination = fs.mkdtempSync(path.join(path.dirname(output), '.release-'));
  const archive = path.join(destination, 'release.zip');
  try {
    for (const file of files) {
      const target = path.join(staging, prefix, file);
      fs.mkdirSync(path.dirname(target), { recursive: true });
      fs.copyFileSync(path.join(root, file), target);
    }
    // zip updates an existing archive. Never point it at the final output path.
    run('zip', ['-q', '-X', archive, '-@'], {
      cwd: staging,
      input:
        files
          .map((file) => prefix + file)
          .sort()
          .join('\n') + '\n',
    });
    verifyArchive(archive, root, files);
    fs.renameSync(archive, output);
  } finally {
    fs.rmSync(staging, { recursive: true, force: true });
    fs.rmSync(destination, { recursive: true, force: true });
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
  const pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));
  const files = run('git', ['ls-files', '-z'], { cwd: root, encoding: 'utf8' })
    .split('\0')
    .filter(Boolean);
  assert.ok(
    files.includes('scripts/release.mjs'),
    'Stage new release files with git add before packaging',
  );
  const output = path.resolve(
    process.argv[2] || path.join(root, 'dist', `blatt-und-nadel-v${pkg.version}-github.zip`),
  );
  createArchive(root, files, output);
  console.log(`Verified ${files.length} current files under one project root: ${output}`);
}
