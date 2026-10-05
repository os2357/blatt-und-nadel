# Quality checks

Release **1.0.0** · 5 October 2026

## Artwork review

All 28 species were inspected in Detail and Compact, enlarged and at 24/32 px Compact and 48/64 px Detail on light and dark backgrounds. Closely related species were compared together. All 28 species were compared with their Info Flora morphological descriptions. The review covers characteristic leaf and needle shapes, relative petiole lengths, vein placement, leaflet spacing and small-size legibility. The oaks were additionally compared with the LWF reference linked in the botanical notes. Spruce and Scots pine were additionally checked against the Hohenheim, Göttingen and LWF references listed there. The species table records variant-specific retained and omitted features.

Compact uses separately simplified geometry, including all three maples. The [botanical notes](BOTANY.md) document the chosen forms, references and deliberate reductions.

## Wych elm review

Both Wych elm variants were checked against the botanical references linked in [BOTANY.md](BOTANY.md), enlarged and at their intended small sizes on light and dark backgrounds. Detail has 13 main lateral veins per side and six upper branches; Compact has five main lateral veins per side. All 42 lateral-vein/branch endpoints meet the blade contour. The selected form has a very short petiole, its greatest width above the midpoint, a mildly unequal base and two lateral apex points.

Both outlines have no detected self-crossings. Full-stroke containment at 1536 × 1536 px found zero uncovered stroke pixels beyond the stated antialiasing tolerance.

## Automated geometry and asset checks

`npm test` verifies:

- The catalog and both icon directories agree: 28 species and 56 files.
- XML uses the supported element and attribute allowlists, with valid nesting and no unchecked transforms.
- Every source has the expected dimensions, viewBox, image role, accessible name and exactly one matching title before the paths.
- Geometry is nonempty; license notices are present.
- No embedded images, scripts, event handlers, remote references or editor-specific objects are included.
- Blade, filled-needle and sheath contours explicitly close and contain no detected proper self-crossings.
- Each of the 14 conifer SVGs forms one connected painted component: no detached needle or twig fragments.
- Separate leaf blades have no detected crossings, nesting or overlaps between their painted outlines.
- All **341 internal vein and midrib paths** remain inside the leaf blades within the stated numerical tolerance.
- Rendered strokes do not touch the canvas edge.
- Generated sprites, the manifest, gallery and SVG overview match the current sources.

The checker adaptively flattens Bezier curves to a 0.01-unit error bound and samples vein segments at intervals no larger than 0.2 units. Outside excursions above 0.06 units fail the build. This is a numerical drawing check, not a formal geometric proof. Both lateral veins and separately marked midribs are checked. A second check rasterizes their complete strokes at 1536 × 1536 px, including round caps, round joins and stroke widths, and compares the paint with the filled blade plus its outline. One raster pixel of antialiasing tolerance is allowed; more than that fails. A vein may intentionally meet the outline at a tooth. External petioles and rachises are explicitly separate; broadleaf files must not use the ambiguous `leaf-axis` role.

Twelve regression tests cover concave notches, curves with in-bounds endpoints that bulge outside, independent subpaths, relative/smooth paths, malformed input, self-crossings, numerical tolerance, midrib coverage, thick strokes protruding despite in-bounds centerlines, inter-leaflet crossings/nesting and overlap caused by outline width, a rounded needle cap folding across its return edge, and a needle that misses a curved twig. For separate blades, the checker compares flattened contour segments, tests containment and subtracts the combined half-widths of the outlines from their minimum distance. A clearance below −0.06 units fails. External connecting stalks are excluded intentionally. The checker accepts line and Bezier geometry; elliptical arcs must first be converted.

The conifer connectivity check rasterizes at 1536 × 1536 px, uses alpha ≥ 64 and eight-neighbour connectivity, and ignores isolated specks smaller than 0.05 viewBox square units. It detects unintended gaps between needles and their supporting twig. It does not validate phyllotaxis, confirm specimen identity or treat legitimate overlaps between projected needles as errors.

## Browser checks

`npm run test:browser` runs the same workflow in Chromium and Firefox:

- Search by scientific name, group filtering and the empty state.
- Detail/Compact switching, correct download paths and a downloaded SVG byte comparison.
- Copy feedback; clipboard contents additionally verified in Chromium.
- Size/color controls, dark mode and initial keyboard focus.
- Layout at 1440, 768, 480, 375 and 320 CSS pixels, including card contents.
- All 56 external sprite symbols compared with their inline rendering in the same browser.
- A standalone SVG via `<img>` and a light icon on a dark background.
- No uncaught JavaScript errors.

Sprite and inline captures use the same device-pixel origin. The comparison allows small antialiasing differences: average channel difference below 0.6 on a 0–255 scale, and fewer than 0.3% of channels differing by more than 32. It also checks that symbols contain visible colored pixels. Screenshots and a machine-readable report are written to ignored `test-results/`.

## Release run

| Engine             | Version      | Result |
| ------------------ | ------------ | ------ |
| Chromium, headless | 153.0.8010.0 | Passed |
| Firefox, headless  | 153.0        | Passed |

Both engines completed the workflow above. The 56-file geometry checks and all twelve checker regressions passed.

## Release archive checks

The release builder creates a fresh temporary ZIP and verifies its complete contents before replacing the destination. The archive must contain exactly the tracked project files under one `blatt-und-nadel/` folder, with no duplicate or extra entries. ZIP integrity and every extracted file byte are checked against the current source.

`npm run test:release` exercises rebuilding an existing archive that contains an extra project tree and stale file contents. The rebuild must remove the extra tree and include the current bytes. This regression test and the release builder run in CI.

## Reproduce

```sh
npm ci
npm test
npm run test:release
npm run format:check
npx playwright install --with-deps chromium firefox
npm run test:browser
```

`BROWSERS=chromium` or `BROWSERS=firefox` selects one engine; `BROWSER_OUTPUT` changes the screenshot directory. An optional `CHROMIUM_EXECUTABLE_PATH` selects a locally installed Chromium binary. The release checks used a packaged Chromium binary. In the test container, Firefox required `MOZ_DISABLE_CONTENT_SANDBOX=1 FIREFOX_DISABLE_SANDBOX=1`; ordinary CI uses the default sandbox settings. These environment overrides affect the test browser only.

## Limits

The botanical review is source-guided design work, not independent specialist certification. Small icons cannot carry every identifying feature. No claim is made of full WCAG conformance or complete screen-reader testing. WebKit/Safari and physical mobile devices were not part of this release run; mobile sizes are desktop-engine viewport tests. PNG font rendering can vary between systems. Hosted CI results are reported separately by GitHub Actions.
