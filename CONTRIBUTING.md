# Contributing

Botanical corrections, clearer small-size shapes and useful species additions are welcome. Open an issue with the scientific name, icon ID, variant and specific feature you propose to change. Cite a flora, botanical institution or other reliable primary reference.

## Development

Use Node.js 24 (`.nvmrc`) and run `npm ci`. Edit `icons/detail/<id>.svg` and `icons/compact/<id>.svg` directly. These are the source artwork; there is no hidden illustration generator. Update `src/icons.json` for descriptions and references.

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
- Detail strokes: outline/stem 1.9, minor veins 1.12. Compact defaults: outline 3.45, stem 3.3, veins 2.25. Compact compound leaves and white willow use optically adjusted widths to keep interior gaps readable; the canonical SVGs record each value. Filled needles are adjusted separately.
- Give every path a drawing role: `leaf-blade` for a closed leaf outline, `leaf-vein` for lateral or palmate veins, `leaf-midrib` for a simple leaf’s internal midrib, `leaf-petiole` for external petioles/petiolules, `leaf-rachis` for a compound leaf’s axis, `leaf-axis` for conifer twigs/needle lines, `leaf-needle` for filled needles, and `leaf-sheath` for the filled basal sheath of a pine short shoot. Broadleaf files must separate internal midribs from external stalks. Never change a role merely to bypass a failed check.
- Blade, filled-needle and sheath contours must close explicitly and must not cross themselves. Internal vein centerlines must remain within the blade, including near concave lobes. Veins may meet a marginal tooth; the numerical tolerance is 0.06 viewBox units. The complete stroke footprint must also stay within the filled blade plus its outline; a 16× raster check includes round caps and joins. Do not use clipping to conceal faulty source geometry.
- Separate leaflet blades must neither cross nor contain one another. Their painted outlines must also remain separated after accounting for stroke width. Petiolules and rachises may connect blades; these intentional joins are not contour errors.
- Use line, quadratic or cubic paths. The geometry checker also supports relative and smooth commands; convert elliptical arcs to Bezier curves before contributing.
- Keep round joins/caps, `currentColor`, no raster images and no external resources. Prefer explicit paths over editor-specific markup. Bake transforms into path coordinates; the source validator only accepts attributes it can check.
- Simplify secondary veins and teeth for Compact. Retain the defining outline and stem relationship. Do not merely thicken the Detail file.
- A conifer needle must meet its actual curved twig or its short-shoot sheath; do not position roots against an imagined straight axis. The current conifer drawings must form one connected painted component.
- In Scots pine, keep exactly two needles per represented sheath in both variants. In spruce, retain individual pointed needles and front/side projections; do not simplify it into a strictly two-row generic sprig.
- Avoid drawing every needle in a natural bundle. Describe such reductions in the metadata or botanical notes.
- Record the selected shoot/leaf form, a species-specific reference, the retained characters and the omissions of each optical size. Do not claim independent botanical review or measured accuracy without that evidence.
- When a vein-to-tooth relationship is diagnostic, coordinate the path endpoints and contour rather than adding arbitrary teeth.
- Retain German ASCII IDs and the `leaf-<id>` symbol convention. Add English/German common names and a scientific name.
- Include exactly one title before the paths, an accessible name matching the catalog, copyright and license comments in each standalone SVG.

Inspect 24/32 px Compact and 48/64 px Detail on both light and dark backgrounds. Check near-neighbor species together. A passing renderer does not establish botanical correctness; describe the evidence and remaining simplification in your pull request.

## Rights

Contribute original geometry or material you have permission to license. Do not trace third-party illustrations without a compatible grant. Contributions follow the license for the material: CC BY 4.0 for artwork/documentation/metadata and MIT for software. Keep existing notices and add contributor notices where appropriate.
