# Quality checks

Release **2.4.0** · 15 October 2026

## Artwork review

Release 2.4.0 contains **200 taxa / 400 source SVGs**. It continues the photo-guided family-batch re-review begun in 2.3.0. Batch 3 covers the Fagaceae and Silberahorn, batch 4 the Betulaceae, batch 5 the Salicaceae, and batch 6 a follow-up correction of the Weißtanne shoot tip. Each of the 34 taxa was compared in both optical sizes with at least three foliage photographs inspected at full size, the primary treatment and independent descriptions; blade proportions were measured on the icons and on leaf scans, and neighbor boards were compared. Twenty-two taxa received revised artwork (44 SVGs). The Betulaceae were drawn a second time after user review found their margin and vein-to-tooth relation insufficient. Every revision passed the geometry and raster suite and a before/after comparison; declined options are recorded. **44 SVGs are revised and 356 byte-identical to v2.3.0.** See [review and revisions](AUDIT-2.4.md) and [current hash record](audit-2.4.json).

Release 2.3.0 re-reviewed all 22 gymnosperms (13 revised) and added 25 taxa, each counter-reviewed against a fresh photograph: [v2.3 review](AUDIT-2.3.md), [additions](EXPANSION-2.3.md).

**Not re-reviewed yet:** 120 existing flowering-plant taxa. Their artwork is unchanged since v2.2.3 and their records are carried over, marked `carried-over (review pending)`. Their most recent full review is the v2.2 review described below.

### v2.2 collection review (historical)

v2.2 contained **175 taxa / 350 source SVGs**. Baseline treatments and photographs were reread from the same-day v2.1 cache; 17 additions and three targeted baseline clarifications received fresh source retrieval. All taxa and both optical sizes received a fresh source-guided review, including enlarged photograph comparison and target-size inspection on light/dark backgrounds. See the [full v2.2 report](AUDIT-2.2.md), [machine-readable record](audit-2.2.json) and [two expansion rounds](EXPANSION-2.2.md).

In v2.2, 307 previous SVGs remained byte-identical to the canonical v2.1.0 baseline. Nine SVGs were revised: Rotbuche, Hasel, Salweide and Pfeifenstrauch in both variants, plus Hainbuche Compact. Thirty-four SVGs were added. Earlier corrections, including Ginkgo, Stieleiche and Bergulme, are preserved.

### Required review gates

1. **Reference gate:** name the taxon and selected leaf/shoot form; compare a primary botanical description and foliage photographs. Resolve contradictory accounts rather than silently averaging them. Use additional references for ambiguous or previously criticized characters.
2. **Morphology gate:** inspect the whole silhouette, blade proportions, maximum-width position, base, apex, petiole relationship, margin and vein course. Inspect actual needle origins, leaflet insertion and any omitted diagnostic characters separately. A plausible feature count alone is insufficient.
3. **Neighbor gate:** compare similar species side by side. Preserve overlap where nature overlaps; do not invent distinctive anatomy. Ginkgo, maples, oaks, elms, willows, pines and the two deciduous cypresses receive focused comparison.
4. **Optical gate:** inspect every Detail and Compact SVG independently, enlarged and at the intended sizes on light/dark backgrounds. Check narrow interiors, leaflet gaps and dense teeth. State each intentional reduction.
5. **Technical gate:** pass the geometry, stroke-footprint, rendering, metadata and browser checks below. These establish drawing and integration properties, not botanical certification.
6. **Preservation gate:** compare existing artwork with the canonical release baseline, list every changed species and retain old review records. Resolve all known defects before packaging.

A review result means the selected stylization is supported by the reviewed references, within the documented reductions. It is not an independent specialist determination, a measured specimen drawing or a universal template for every leaf of that species.

## v1.1 focused review

Sixteen source SVGs were revised: both variants of White willow, Douglas fir, Black poplar, Black alder, Sweet chestnut, Scots pine, Sycamore maple and Common juniper. Each was inspected enlarged, at 24/32 px Compact and 48/64 px Detail, on light and dark backgrounds. Related leaves and conifers were compared together. The assessment and reference-supported choices are recorded in [BOTANY.md](BOTANY.md#v11-morphology-and-legibility-review).

A byte comparison against the verified v1.0.2 release archive confirms that the other 40 source SVGs are unchanged, including both Pedunculate oak and Wych elm variants. Existing pine pairs, juniper whorls and chestnut vein-tooth relationships were retained; their presentation was improved. Sycamore maple retains acute sinuses.

## Black poplar review (v1.0.2)

The 1.0.2 review redrew only Black poplar (Schwarzpappel), in Detail and Compact. The botanical references are linked in [BOTANY.md](BOTANY.md). Both variants were inspected at 480 px, at 24/32 px Compact and 48/64 px Detail, on light and dark backgrounds. That revision replaced the straight-sided triangular silhouette with convex flanks, rounded shoulders, an elongated tip and a curved, finely toothed margin. Curved lateral veins have separate endpoints for the heavier Compact strokes.

In 1.0.2, the other 54 source SVGs were byte-identical to 1.0.1, including the redrawn Pedunculate oak. Geometry, generated assets, archive integrity and both browser workflows passed for that release.

## Pedunculate oak review

The 1.0.1 review redraws only Pedunculate oak (Stieleiche), in Detail and Compact. The outline and venation were compared with the Info Flora description and LWF photographic oak comparison linked in [BOTANY.md](BOTANY.md). Both variants were inspected at 480 px, at 24/32 px Compact and 48/64 px Detail, on light and dark backgrounds. The rounded ascending lobes, unequal spacing, basal auricles, very short petiole and two Detail sinus veins are retained. Compact uses six shortened lateral veins and a separately adjusted midrib for legibility.

In 1.0.1, the other 54 source SVGs were byte-identical to the clean 1.0.0 release. Geometry, generated assets, archive integrity and both browser workflows passed for that release.

## Wych elm review

In v1.7 both Wych elm variants received an unequal rounded basal lobe and a very short partly concealed petiole. Detail retains 13 lateral veins per side and six fork branches; Compact has six lateral veins per side. The three-point upper blade is preserved. [Before/after and source assessment](AUDIT-1.7.md).

## Automated geometry and asset checks

`npm test` verifies:

- The catalog and both icon directories agree: 200 taxa and 400 files.
- XML uses the supported element and attribute allowlists, with valid nesting and no unchecked transforms.
- Every source has the expected dimensions, viewBox, image role, accessible name and exactly one matching title before the paths.
- Geometry is nonempty; license notices are present.
- No embedded images, scripts, event handlers, remote references or editor-specific objects are included.
- Blade, filled-needle, filled or outlined scale, sheath, bud, gland, stipule and filled winged-rachis contours explicitly close and contain no detected proper self-crossings.
- Each of the 48 conifer, eight heath and twelve twig-bearing broadleaf shoot SVGs forms one connected painted component: no detached needle or twig fragments.
- Separate leaf blades have no detected crossings, nesting or overlaps between their painted outlines.
- All **4172 internal vein and midrib paths** remain inside the leaf blades within the stated numerical tolerance.
- Every vein origin must visibly touch another vascular path (vein, midrib, petiole or rachis), with a 0.06-unit numerical tolerance after stroke widths. Contact with the blade outline alone does not count. This detects visible gaps; it does not establish a full biologically correct vein network.
- Rendered strokes do not touch the canvas edge.
- Generated sprites, the manifest, gallery and SVG overview match the current sources.

The checker adaptively flattens Bezier curves to a 0.01-unit error bound and samples vein segments at intervals no larger than 0.2 units. Outside excursions above 0.06 units fail the build. This is a numerical drawing check, not a formal geometric proof. Both lateral veins and separately marked midribs are checked. A second check rasterizes their complete strokes at 1536 × 1536 px, including round caps, round joins and stroke widths, and compares the paint with the filled blade plus its outline. One raster pixel of antialiasing tolerance is allowed; more than that fails. A vein may intentionally meet the outline at a tooth. External petioles and rachises are explicitly separate; broadleaf files must not use the ambiguous `leaf-axis` role.

Thirteen regression tests cover concave notches, curves with in-bounds endpoints that bulge outside, independent subpaths, relative/smooth paths, malformed input (including nonfinite numeric tokens and overflow), self-crossings, numerical tolerance, midrib coverage, thick strokes protruding despite in-bounds centerlines, inter-leaflet crossings/nesting and overlap caused by outline width, a rounded needle cap folding across its return edge, and a needle that misses a curved twig. For separate blades, the checker compares flattened contour segments, tests containment and subtracts the combined half-widths of the outlines from their minimum distance. A clearance below −0.06 units fails. External connecting stalks are excluded intentionally. The checker accepts line and Bezier geometry; elliptical arcs must first be converted.

The shoot connectivity check rasterizes at 1536 × 1536 px, uses alpha ≥ 64 and eight-neighbour connectivity, and ignores isolated specks smaller than 0.05 viewBox square units. It detects unintended gaps between needles and their supporting twig. It does not validate phyllotaxis, confirm specimen identity or treat legitimate overlaps between projected needles as errors.

Twenty-six artwork regressions additionally protect the selected compound-leaf counts, including the new 5/3/9/11 forms, the two petiolar glands in each relevant Detail icon and their deliberate Compact omission, the paired rose stipules, and the declared vein counts for both dogwoods, buckthorn, alder buckthorn, white elm, bird cherry, grey alder, whitebeam, Turkish hazel and field elm. Ginkgo additionally has no midrib, one connected vein origin, bifurcating branch nodes and sixteen/eight terminal veins; the regression rejects detached branches or merged nerves. New checks also verify five-needle origins in Swiss stone pine, paired origins and four shared sheaths in Mountain pine, and exactly opposite insertion levels in Dawn redwood. The conifer gallery filter uses the catalog count, not the former hardcoded seven. The 1.5 checks additionally verify alternating Bald cypress insertions, two-needle Black pine fascicles, the new compound-leaf counts, actual vein endpoints at marginal teeth in Sweet chestnut and Hop-hornbeam, and broad fan versus narrow lanceolate proportions. The 1.6 regressions also check four-needle Erica whorls, paired Calluna scale origins, no terminal Gleditsia leaflet, the selected Ginkgo lower-fan taper and the new compound counts/glands. The browser suite includes the Heidezweige filter. The 2.2 checks extend fascicle and leaflet-count coverage and protect revised vein spacing and narrow herb proportions. These lock intentional drawing choices; they do not claim that every natural specimen has those counts.

The Atlas cedar regression additionally checks three real short-shoot axes, tuft origins, solitary needles attached to the terminal curve and transverse needle widths. It rejects continuously tapering triangular bodies even when those contours are otherwise valid.

The 2.4 regressions check measured blade proportions (length : width along the midrib) of the revised oaks, beech, silver maple and willows, including Roteiche clearly longer than Sumpfeiche and Korbweide clearly narrower than Silberweide; seven / four straight beech vein pairs; chestnut teeth standing at least 0.8 / 0.7 units clear of the margin; birch-family secondary veins ascending at 36–60° (up to 65–66° for the steeper lowest pairs of grey and black alder and dwarf birch; the basal hazel pair is exempt); and, for ten Betulaceae, each secondary vein ending in its own marginal tooth. Silver fir must have exactly one terminal bud in both sizes and distal needles shorter than 0.75 of the lower ones.

The 2.3 regressions check parallel-sided needle bodies in spruce, Douglas fir and Nordmann fir (widths between 30 % and 70 % of the needle at least 93 % of the maximum); needle : sheath ratios for the six two-needle pines; visible larch short shoots and terminal buds on fir, spruce and Douglas fir; the selected leaflet, leaf, stipule and gland counts of the additions; the even-pinnate carob without terminal leaflet; and the foliage types of the new conifers.

## Audit freshness

`npm test` also checks the audit named by `package.json.botanicalAudit`. It must cover every taxon and both optical variants, use the current scientific names and primary sources, and match every source SVG hash. Baseline classifications and release totals are checked. This prevents a stale review record from silently covering changed files; it does not automate botanical judgment.

## Browser checks

`npm run test:browser` runs the same workflow in Chromium and Firefox:

- Search by scientific name, group filtering and the empty state.
- Detail/Compact switching, correct download paths and a downloaded SVG byte comparison.
- Copy feedback; clipboard contents additionally verified in Chromium.
- Size/color controls, dark mode and initial keyboard focus.
- Layout at 1440, 1180, 1179, 1024, 768, 760, 480, 390, 380, 375 and 320 CSS pixels, including toolbar alignment and card contents.
- All 400 external sprite symbols compared with their inline rendering in the same browser.
- A standalone SVG via `<img>` and a light icon on a dark background.
- No uncaught JavaScript errors.

Sprite and inline captures use the same device-pixel origin. The comparison allows small antialiasing differences: average channel difference below 0.6 on a 0–255 scale, and fewer than 0.3% of channels differing by more than 32. It also checks that symbols contain visible colored pixels. Screenshots and a machine-readable report are written to ignored `test-results/`. Long gallery screenshots are captured in bounded 12,000 px-high sections, preserving the tested viewport and covering all rows. This avoids Firefox’s screenshot dimension limit as the collection grows; layout and sprite checks still cover every icon.

## Release run

- Geometry, XML, metadata, stroke containment and generated-asset freshness: 400 source SVGs and 4,172 internal paths checked.
- Regression suite: 48 tests (13 geometry, 31 artwork, four audit). Regressions protect the measured proportions and vein-to-tooth construction of the v2.4 revisions, the revised conifer needles, sheaths, short shoots and buds, the counts selected for the additions, separate ascending vein origins, selected compound-leaf counts and previously corrected anatomy.
- Archive regression and exact extracted-byte checks run when building the ZIP.
- **Chromium integration: passed for v2.4.0** with Playwright 1.62.1 and the preinstalled Chromium 141.0.7390.37 (`BROWSERS=chromium`, `CHROMIUM_EXECUTABLE_PATH`): search, group filters including Heidezweige, Detail/Compact switching, downloads with byte comparison, copy feedback, size/colour/dark controls, all layout widths and all 400 sprite/inline pairs.
- **Firefox integration: not run for v2.4.0.** No Firefox build is available in this environment. The last completed Firefox run belongs to v1.9 (Firefox 153.0).

The hosted-gallery refinements from earlier releases (128 px default size, labeled Detail/Compact radio switch, one-line size label and value, 44 px controls, responsive grid areas and the inset select chevron) are covered by the Chromium run above, including alignment, containment and label/value-row checks. Forced-colors mode was not tested.

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

`BROWSERS=chromium` or `BROWSERS=firefox` selects one engine; `BROWSER_OUTPUT` changes the screenshot directory. An optional `CHROMIUM_EXECUTABLE_PATH` selects a locally installed Chromium binary. The previous v1.9 checks used a packaged Chromium binary. In that test container, Firefox required `MOZ_DISABLE_CONTENT_SANDBOX=1 FIREFOX_DISABLE_SANDBOX=1`; ordinary CI uses the default sandbox settings. These environment overrides affect the test browser only.

## Limits

The botanical review is source-guided design work, not independent specialist certification. Small icons cannot carry every identifying feature. No claim is made of full WCAG conformance or complete screen-reader testing. WebKit/Safari, Firefox and physical mobile devices are not verified for v2.3; when run, the included mobile-size tests use desktop-engine viewports. PNG font rendering can vary between systems. Hosted CI results are reported separately by GitHub Actions.
