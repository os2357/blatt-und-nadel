// SPDX-FileCopyrightText: 2026 Oliver Simon
// SPDX-License-Identifier: MIT
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { chromium, firefox, webkit } from 'playwright';
import sharp from 'sharp';
import { root, catalog, loadIcons, geometry } from '../scripts/lib.mjs';

const engines = { chromium, firefox, webkit };
const selected = (process.env.BROWSERS || 'chromium,firefox').split(',');
const output = path.resolve(root, process.env.BROWSER_OUTPUT || 'test-results');
await fs.mkdir(output, { recursive: true });
const server = spawn(process.execPath, ['scripts/serve.mjs'], {
  cwd: root,
  env: { ...process.env, PORT: '0' },
  stdio: ['ignore', 'pipe', 'inherit'],
});
const address = await new Promise((resolve, reject) => {
  const timer = setTimeout(() => {
    server.kill();
    reject(new Error('Preview server did not start'));
  }, 10000);
  server.once('error', reject);
  server.once('exit', (code) => {
    clearTimeout(timer);
    reject(new Error('Server exited: ' + code));
  });
  server.stdout.on('data', (data) => {
    const url = String(data).match(/http:\/\/127\.0\.0\.1:\d+/)?.[0];
    if (url) {
      clearTimeout(timer);
      resolve(url);
    }
  });
});
const report = [];

// Long one-column galleries exceed Firefox's screenshot dimension limit.
// Capture every row in bounded clips while leaving the tested viewport intact.
async function galleryScreenshot(page, filename) {
  const height = await page.evaluate(() => document.documentElement.scrollHeight);
  const width = page.viewportSize().width;
  const tileHeight = 12000;
  if (height <= tileHeight) return page.screenshot({ path: filename, fullPage: true });
  for (let y = 0, part = 1; y < height; y += tileHeight, part++) {
    await page.screenshot({
      path: filename.replace(/\.png$/, '-part-' + part + '.png'),
      fullPage: true,
      clip: { x: 0, y, width, height: Math.min(tileHeight, height - y) },
    });
  }
}

async function ink(buffer) {
  const { data, info } = await sharp(buffer)
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  let colored = 0;
  for (let i = 0; i < data.length; i += info.channels) {
    if (
      Math.max(data[i], data[i + 1], data[i + 2]) - Math.min(data[i], data[i + 1], data[i + 2]) >
      15
    )
      colored++;
  }
  return colored;
}

try {
  for (const name of selected) {
    assert.ok(engines[name], 'Unknown browser: ' + name);
    const executablePath = name === 'chromium' ? process.env.CHROMIUM_EXECUTABLE_PATH : undefined;
    const browser = await engines[name].launch({
      headless: true,
      ...(executablePath ? { executablePath } : {}),
      ...(name === 'firefox' && process.env.FIREFOX_DISABLE_SANDBOX === '1'
        ? { firefoxUserPrefs: { 'security.sandbox.content.level': 0 } }
        : {}),
    });
    try {
      const context = await browser.newContext({
        viewport: { width: 1440, height: 1000 },
        deviceScaleFactor: 1,
      });
      context.setDefaultTimeout(15000);
      if (name === 'chromium')
        await context.grantPermissions(['clipboard-read', 'clipboard-write']);
      const page = await context.newPage();
      const errors = [];
      page.on('pageerror', (error) => errors.push(error.message));
      await page.goto(address, { waitUntil: 'networkidle' });
      assert.equal(await page.locator('.card:visible').count(), catalog.icons.length);
      await page.keyboard.press('Tab');
      assert.equal(await page.locator(':focus').getAttribute('id'), 'search');
      await page.locator('#search').fill('Acer campestre');
      assert.equal(await page.locator('.card:visible').count(), 1);
      assert.equal(await page.locator('.card:visible').getAttribute('data-id'), 'feldahorn');
      await page.locator('#search').fill('no matching species');
      assert.ok(await page.locator('#empty').isVisible());
      await page.locator('#search').fill('');
      await page.locator('#group').selectOption('Nadelgehölze');
      assert.equal(
        await page.locator('.card:visible').count(),
        catalog.icons.filter((icon) => icon.group === 'conifer').length,
      );
      await page.locator('#group').selectOption('');
      await page.locator('#group').selectOption('Heidezweige');
      assert.equal(
        await page.locator('.card:visible').count(),
        catalog.icons.filter((icon) => icon.group === 'heath').length,
      );
      assert.deepEqual(
        (
          await page
            .locator('.card:visible')
            .evaluateAll((cards) => cards.map((card) => card.dataset.id))
        ).sort(),
        ['besenheide', 'schneeheide'],
      );
      await page.locator('#group').selectOption('');
      await page.getByRole('radio', { name: 'Compact', exact: true }).check();
      assert.equal(
        await page.locator('.specimen [data-compact]:visible').count(),
        catalog.icons.length,
      );
      assert.equal(await page.locator('.specimen [data-detail]:visible').count(), 0);
      assert.ok(
        (
          await page
            .locator('.download')
            .evaluateAll((nodes) => nodes.map((n) => n.getAttribute('href')))
        ).every((href) => href.startsWith('icons/compact/')),
      );
      await page.locator('.copy').first().click();
      await page.waitForFunction(() =>
        document.querySelector('#status').textContent.includes('SVG kopiert'),
      );
      if (name === 'chromium') {
        const copied = await page.evaluate(() => navigator.clipboard.readText());
        assert.ok(
          copied.includes('CC BY 4.0') &&
            copied.includes('<svg') &&
            !copied.includes('data-detail'),
        );
      }
      const [download] = await Promise.all([
        page.waitForEvent('download'),
        page.locator('.download').first().click(),
      ]);
      assert.equal(
        await fs.readFile(await download.path(), 'utf8'),
        await fs.readFile(path.join(root, 'icons/compact/fichte.svg'), 'utf8'),
      );
      await page.getByRole('radio', { name: 'Detail', exact: true }).check();
      await page.locator('#size').fill('128');
      assert.equal(await page.locator('#size-label').textContent(), '128 px');
      assert.equal(
        await page
          .locator('.specimen')
          .first()
          .evaluate((el) => el.getBoundingClientRect().width),
        128,
      );
      await page.locator('#size').fill('112');
      await page.locator('#color').fill('#8b4b32');
      assert.equal(
        await page
          .locator('.specimen')
          .first()
          .evaluate((el) => getComputedStyle(el).color),
        'rgb(139, 75, 50)',
      );
      await page.locator('#color').fill('#34573e');
      await galleryScreenshot(page, path.join(output, name + '-desktop.png'));
      await page.locator('#theme').click();
      assert.equal(await page.locator('#theme').getAttribute('aria-pressed'), 'true');
      assert.equal(
        await page
          .locator('.specimen')
          .first()
          .evaluate((el) => getComputedStyle(el).color),
        'rgb(212, 223, 189)',
      );
      await galleryScreenshot(page, path.join(output, name + '-dark.png'));
      await page.locator('#theme').click();
      for (const width of [1440, 1180, 1179, 1024, 768, 760, 480, 390, 380, 375, 320]) {
        await page.setViewportSize({ width, height: 900 });
        assert.ok(
          await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
          name + ': horizontal page overflow at ' + width,
        );
        const toolbar = await page.locator('.controls').evaluate((panel) => {
          const box = panel.getBoundingClientRect();
          const fields = [...panel.querySelectorAll('.control, .variant-control, #theme')];
          const overflow = fields
            .filter((el) => {
              const b = el.getBoundingClientRect();
              return (
                b.left < box.left ||
                b.right > box.right ||
                b.top < box.top ||
                b.bottom > box.bottom ||
                el.scrollWidth > el.clientWidth + 1
              );
            })
            .map((el) => el.className || el.id);
          const caption = panel.querySelector('.size-control .control-caption');
          const text = caption.firstElementChild.getBoundingClientRect();
          const value = caption.lastElementChild.getBoundingClientRect();
          const inputs = [
            ...panel.querySelectorAll('#search, #group, .variant-switch, #size, #color, #theme'),
          ].map((el) => el.getBoundingClientRect());
          return {
            overflow,
            sizeLabelOffset: Math.abs(text.top - value.top),
            heights: inputs.map((b) => b.height),
            tops: inputs.map((b) => b.top),
          };
        });
        assert.deepEqual(toolbar.overflow, [], name + ': toolbar overflow at ' + width);
        assert.ok(toolbar.sizeLabelOffset < 1, name + ': size caption split onto two rows');
        assert.ok(
          toolbar.heights.every((h) => Math.abs(h - 44) < 1),
          name + ': inconsistent control heights',
        );
        if (width >= 1180)
          assert.ok(
            Math.max(...toolbar.tops) - Math.min(...toolbar.tops) < 1,
            name + ': desktop controls misaligned',
          );
        assert.deepEqual(
          await page.locator('.card').evaluateAll((cards) =>
            cards
              .filter((card) => {
                const bounds = card.getBoundingClientRect();
                return [...card.querySelectorAll('.size-test svg, .specimen')].some((svg) => {
                  const rect = svg.getBoundingClientRect();
                  return rect.left < bounds.left - 1 || rect.right > bounds.right + 1;
                });
              })
              .map((card) => card.dataset.id),
          ),
          [],
          name + ': card overflow at ' + width,
        );
      }
      await galleryScreenshot(page, path.join(output, name + '-mobile.png'));
      await page.setViewportSize({ width: 1440, height: 1000 });
      // Check all external symbols against their inline counterpart in the same engine.
      const icons = loadIcons();
      const svg = (body) =>
        '<svg width="64" height="64" viewBox="0 0 96 96" stroke-linecap="round" stroke-linejoin="round">' +
        body +
        '</svg>';
      const rows = icons
        .flatMap((icon) =>
          ['detail', 'compact'].map(
            (variant) =>
              '<div class="pair" data-label="' +
              icon.id +
              '/' +
              variant +
              '">' +
              svg(
                '<use href="' +
                  address +
                  '/sprites/leaves-' +
                  variant +
                  '.svg#leaf-' +
                  icon.id +
                  '"/>',
              ) +
              svg(geometry(icon, variant)) +
              '</div>',
          ),
        )
        .join('');
      // Navigate to a script-free same-origin document before replacing its body.
      await page.goto(address + '/examples/sprite.html');
      await page.setContent(
        '<style>body{color:#34573e;background:white}.pair{display:inline-block;vertical-align:top;position:relative;width:72px;height:72px}.pair svg{position:absolute;left:4px;top:4px}.pair svg:nth-child(2){visibility:hidden}</style>' +
          rows,
      );
      await page.waitForFunction(() =>
        [...document.querySelectorAll('use')].every((el) => el.getBBox().width > 0),
      );
      for (const pair of await page.locator('.pair').all()) {
        const external = await pair.locator('svg').nth(0).screenshot();
        // Compare at the exact same device-pixel origin to avoid positional
        // antialiasing differences in cached external symbols.
        await pair.evaluate((el) => {
          el.children[0].style.visibility = 'hidden';
          el.children[1].style.visibility = 'visible';
        });
        const inline = await pair.locator('svg').nth(1).screenshot();
        await pair.evaluate((el) => {
          el.children[0].style.visibility = 'visible';
          el.children[1].style.visibility = 'hidden';
        });
        assert.ok((await ink(external)) > 20, name + ': empty external symbol');
        const [a, b] = await Promise.all([
          sharp(external).raw().toBuffer(),
          sharp(inline).raw().toBuffer(),
        ]);
        assert.equal(a.length, b.length);
        let total = 0,
          large = 0;
        for (let i = 0; i < a.length; i++) {
          const difference = Math.abs(a[i] - b[i]);
          total += difference;
          if (difference > 32) large++;
        }
        // Subpixel antialiasing can differ slightly for <use> and inline paths.
        assert.ok(
          total / a.length < 0.6 && large / a.length < 0.003,
          name +
            ': sprite differs from inline ' +
            (await pair.getAttribute('data-label')) +
            ' (mean difference ' +
            total / a.length +
            ', large-channel fraction ' +
            large / a.length +
            ')',
        );
      }
      await page.screenshot({ path: path.join(output, name + '-sprites.png'), fullPage: true });
      await page.goto(address + '/examples/sprite.html', { waitUntil: 'networkidle' });
      assert.ok(await page.locator('img').evaluate((el) => el.complete && el.naturalWidth === 96));
      assert.ok((await ink(await page.locator('.dark svg').screenshot())) > 20);
      assert.deepEqual(errors, [], name + ': JavaScript errors');
      report.push({
        browser: name,
        version: browser.version(),
        species: icons.length,
        externalSymbols: icons.length * 2,
        viewports: [1440, 1180, 1179, 1024, 768, 760, 480, 390, 380, 375, 320],
        passed: true,
      });
      console.log(
        name +
          ' ' +
          browser.version() +
          ': gallery interactions, downloads, responsive layouts and all ' +
          icons.length * 2 +
          ' sprite/inline pairs passed.',
      );
      await context.close();
    } finally {
      await browser.close();
    }
  }
  await fs.writeFile(path.join(output, 'report.json'), JSON.stringify(report, null, 2) + '\n');
} finally {
  server.kill();
}
