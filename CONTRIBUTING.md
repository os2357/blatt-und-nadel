# Contributing

Botanical corrections, clearer small-size shapes and useful species additions are welcome. Open an issue with the scientific name, icon ID, variant and specific feature you propose to change. Cite a flora, botanical institution or other reliable primary reference.

## Development

Use Node.js 24 (`.nvmrc`) and run `npm ci`. Edit `icons/detail/<id>.svg` and `icons/compact/<id>.svg` directly. These are the source artwork; there is no hidden illustration generator. Update `src/icons.json` for descriptions and references.

After the drawing review, update the affected record in the audit selected by `package.json.botanicalAudit`: findings, references, optical reductions, geometry summary and the SHA-256 of each final SVG. Keep the original baseline hash and classify each variant as added, revised or unchanged. Hash replacement alone is not a review. For a new release, create a new audit file and retain previous reports. `npm test` rejects stale artwork hashes or incomplete variant coverage.

```sh
npm run format
npm run build
npm run render:preview
npm test
npm run format:check
```

Run `npx playwright install --with-deps chromium firefox` once, then `npm run test:browser` after gallery, sprite or rendering changes.

Commit changed source files and generated sprites, manifest, gallery and previews together. PNG previews are reviewed visually rather than compared byte-for-byte because system fonts vary.

Run `npm run test:release` after packaging changes. See [PUBLISHING.md](docs/PUBLISHING.md) for versioning and release archives.

## Drawing rules

- Use the 96 × 96 viewBox; leave padding so round strokes remain inside it.
- Preserve the species’ blade outline, leaf arrangement and relative petiole length. Do not normalize all stems to the same length.
- Detail strokes: outline/stem 1.9, minor veins 1.12. Compact defaults: outline 3.45, stem 3.3, veins 2.25. Compact compound leaves and narrow blades use optically adjusted widths to keep interior gaps readable; the canonical SVGs record each value. Filled needles are adjusted separately.
- Give every path a drawing role: `leaf-blade` for a closed leaf outline, `leaf-vein` for lateral or palmate veins, `leaf-midrib` for a simple leaf’s internal midrib, `leaf-petiole` for external petioles/petiolules, `leaf-rachis` for a compound leaf’s axis (a winged rachis may be a closed `currentColor` fill; ordinary rachises remain strokes), `leaf-axis` for conifer or heath shoot axes, `leaf-needle` for filled needles, `leaf-scale` for filled heath scale leaves, `leaf-sheath` for the filled basal sheath of a pine short shoot, `leaf-bud` for an outlined bud, `leaf-gland` for an outlined petiolar gland and `leaf-stipule` for an outlined stipule. Broadleaf files must separate internal midribs from external stalks. Never change a role merely to bypass a failed check.
- Blade, filled-needle, sheath, bud, gland, stipule and filled winged-rachis contours must close explicitly and must not cross themselves. Internal vein centerlines must remain within the blade, including near concave lobes. Veins may meet a marginal tooth; the numerical tolerance is 0.06 viewBox units. The complete stroke footprint must also stay within the filled blade plus its outline; a 16× raster check includes round caps and joins. Do not use clipping to conceal faulty source geometry.
- Separate leaflet blades must neither cross nor contain one another. Their painted outlines must also remain separated after accounting for stroke width. Petiolules and rachises may connect blades; these intentional joins are not contour errors.
- Use line, quadratic or cubic paths. The geometry checker also supports relative and smooth commands; convert elliptical arcs to Bezier curves before contributing.
- Keep round joins/caps, `currentColor`, no raster images and no external resources. Prefer explicit paths over editor-specific markup. Bake transforms into path coordinates; the source validator only accepts attributes it can check.
- Simplify secondary veins and teeth for Compact. Retain the defining outline and stem relationship. Do not merely thicken the Detail file.
- A conifer needle must meet its actual curved twig or its short-shoot sheath; do not position roots against an imagined straight axis. The current conifer drawings must form one connected painted component.
- In Scots pine, Black pine and Mountain pine, keep exactly two needles per represented sheath in both variants. Swiss stone pine retains five needles per represented short shoot; the selected mature fascicles omit the deciduous sheath. Dawn redwood retains opposite paired insertion; Bald cypress retains individually alternating insertions. In spruce, retain individual pointed needles and front/side projections; do not simplify it into a strictly two-row generic sprig.
- Avoid drawing every needle in a natural bundle. Describe such reductions in the metadata or botanical notes.
- Record the selected shoot/leaf form, a species-specific reference, the retained characters and the omissions of each optical size. Do not claim independent botanical review or measured accuracy without that evidence.
- When a vein-to-tooth relationship is diagnostic, coordinate the path endpoints and contour rather than adding arbitrary teeth.
- Retain German ASCII IDs and the `leaf-<id>` symbol convention. Add English/German common names and a scientific name.
- Include exactly one title before the paths, an accessible name matching the catalog, copyright and license comments in each standalone SVG.

Before accepting a drawing, follow every [review gate](docs/QUALITY.md#required-review-gates): primary description plus foliage photos; silhouette and proportions; base/apex/petiole; margin and vein trajectories; close-neighbor comparison; separate optical-size review; technical and preservation checks. A feature-count test alone is never a botanical approval.

Inspect 24/32 px Compact and 48/64 px Detail on both light and dark backgrounds. Check near-neighbor species together. A passing renderer does not establish botanical correctness; describe the evidence and remaining simplification in your pull request.

## Preserve prior corrections

Before a release, identify the latest canonical package and record hashes of existing source SVGs. Review the relevant source and both sizes before changing an icon. Modify only explicitly reviewed species, list every existing artwork change in the changelog, and compare unaffected SVG bytes with the baseline. Do not rebuild older artwork from an obsolete illustration generator or replace an entire icon directory with older files. Work in small addition groups: source review, drawing, geometry and visual review, then the next group. Retain earlier release records.

## Rights

Contribute original geometry or material you have permission to license. Do not trace third-party illustrations without a compatible grant. Contributions follow the license for the material: CC BY 4.0 for artwork/documentation/metadata and MIT for software. Keep existing notices and add contributor notices where appropriate.

Heath shoots use the `heath` catalog group and `leaf-scale` for filled Calluna scale leaves. They receive the same contour and painted-connectivity checks as conifers, while remaining botanically separate. The groups are presentation categories, not a complete taxonomic classification. For a previously criticized icon, include a before/after rendering and a separate whole-silhouette finding against visible foliage references; matching feature counts alone is insufficient.

### Adult scale foliage

`leaf-scale` may be a closed `currentColor` fill or a closed unfilled stroked contour. A spray may use a continuous lateral outline plus internal overlapping facial-scale contours. State scale enlargement, reduced rows, projection and omitted insertion details in the audit. Closed-contour and shoot-connectivity checks still apply.
