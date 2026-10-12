# Changelog

## 1.6.0 — 2026-10-13

Expansion from 100 to 117 species: 234 standalone SVGs. Both variants of every existing species were visually revisited with the retained reference material. Ginkgo is redrawn; the other 198 existing SVGs are byte-identical to v1.5.0. All existing IDs and file paths remain stable.

### Added

- First reviewed group: Common heather, Winter heath, Common broom, Dyer’s greenweed, Traveller’s joy, Common grapevine, Red currant and Alpine currant.
- Second reviewed group: Butterfly bush, Sweet mock orange, Southern catalpa, Empress tree, White mulberry, Black mulberry, Honey locust and Peach.
- Targeted addition after user feedback: European plum (`pflaume`), separately compared with primary descriptions, three foliage photographs and the existing Prunus icons.
- Additive `heath` catalog group and Heidezweige gallery filter for the two flowering heath shoots; `leaf-scale` path role for Calluna scale leaves. Consumers that enumerate groups should accept this third value.
- [Full review](docs/AUDIT-1.6.md), [per-file audit](docs/audit-1.6.json), [expansion decisions](docs/EXPANSION-1.6.md) and [Ginkgo before/after](docs/ginkgo-1.6.png).
- Regressions for heath insertion nodes, the selected Ginkgo fan taper and the even-pinnate Honey locust; expanded compound-leaf and gland checks. Both browser workflows cover the new filter.

### Corrected

- Ginkgo: replaced the still box-like v1.5 fan with spreading oblique flanks, a wedge-shaped base, unequal lobes and a clearer selected cleft; rebuilt nerve trajectories and independently simplified Compact. Source variation is documented rather than claiming one universal leaf.
- Before accepting the new icons, increased Calluna scale density and Erica needle visibility, corrected Clematis vein overshoots and Compact leaflet overlap, and rerouted basal Vitis/Ribes nerves inside the blade. Corrected slight lower-right Ginkgo nerve excursions.
- Updated gallery, sprites, manifest, both READMEs, botanical notes, overview and size reference. Preserved historical changelog/audit records and prior oak, elm, poplar and pine corrections.

### Review limits

The Ginkgo feedback showed that the first renewed acceptance was still too lenient. Previously criticized icons now need a visible before/after comparison and a distinct silhouette assessment. Technical tests and this internal source-guided review do not constitute independent botanical certification.

## 1.5.0 — 2026-10-12

Compatible expansion from 84 to 100 species: 200 standalone SVGs in two optical sizes. All 100 species received a description-and-photograph comparison. Six existing species are redrawn in both sizes; the other 156 source SVGs are byte-identical to v1.4.0, including Pedunculate oak and Wych elm.

### Added

- First group: Common box, Common lilac, Mezereon, Purple willow, Common osier, Oregon grape, European dewberry and Blackcurrant.
- Second group: Bilberry, Lingonberry, Rusty-leaved alpenrose, Gooseberry, European nettle tree, European hop-hornbeam, European black pine and Bald cypress.
- A [100-species audit](docs/AUDIT-1.5.md), source-photo provenance and SVG measurements in [audit-1.5.json](docs/audit-1.5.json), a [two-round expansion review](docs/EXPANSION-1.5.md) and explicit [collection scope](docs/SCOPE.md).
- Regressions for alternating Bald cypress insertions, new pine fascicles and compound leaflets, vein-tooth endpoints in Sweet chestnut and Hop-hornbeam, and selected fan/lanceolate proportions.

### Corrected

- Ginkgo: broader fan with concave lower flanks, more natural spreading vein trajectories and sixteen/eight terminal nerves instead of eight/four. The review no longer treats a correct branching count as proof of a correct overall drawing.
- Common hazel: clearer cordate base and redistributed venation.
- Sycamore maple and Field maple: broader connected lobes and revised margins; Sycamore maple retains acute sinuses supported by the flora.
- Montpellier maple: rounded flanks, shorter broad lobe tips and clearer shallow cordate base.
- Sweet chestnut: finer forward teeth and eighteen/nine coordinated vein-tooth pairs on an approximately 3.1:1 blade.

### Review refinements

- Broadened the new Oregon grape leaflets and reduced overly deep prickles; corrected Compact leaflet clearance.
- Replaced geometric Blackcurrant and Gooseberry margins with a broader three-lobed Blackcurrant form and curved Gooseberry crenations.
- Reduced Compact Mezereon venation in the tapering base and shortened a Purple willow vein.
- Corrected two Hop-hornbeam vein curves that exceeded the blade stroke.
- Updated both READMEs, botanical notes, gallery, sprites, manifest, overview and size reference. No IDs or public asset paths were removed.

## 1.4.0 — 2026-10-12

Compatible expansion from 68 to 84 species: 168 standalone SVGs in two optical sizes. All 68 previous species were reviewed again; their 136 source SVGs are byte-identical to v1.3.0. No existing artwork was replaced.

### Added

- First reviewed group: Northern red oak, Downy oak, Turkey oak, Silver lime, Red elder, Midland hawthorn, Red raspberry and Sea buckthorn.
- Second reviewed group: Swiss stone pine, Mountain pine, Dawn redwood, Tree of heaven, Staghorn sumac, Silver maple, Red maple and Cherry laurel. The set now contains nine maples and ten conifers.
- [Full 68-species audit](docs/AUDIT-1.4.md), a machine-readable source hash record and a [two-round expansion review](docs/EXPANSION-1.4.md).
- Regression checks for five- versus two-needle fascicle origins, opposite Dawn redwood needles and the new compound-leaf counts.

### Updated

- Both READMEs, catalog, sprites, gallery, overview and size reference for all 84 species.
- Conifer gallery test derives its expected count from the catalog.
- Botanical documentation corrects stale file/path totals and uses directly accessible primary references for Ginkgo and Japanese maple.
- Contribution guidance protects prior drawings with a verified release baseline and explicitly records changed species.

### Review corrections before release

- New oak and Sea buckthorn veins shortened where they exceeded their blades; Sea buckthorn Compact midrib lightened.
- Red elder and Tree-of-heaven terminal leaflet clearances increased.
- Silver maple's main vein adjusted through the connected blade between deep sinuses. No clipping masks conceal geometry errors.

## 1.3.0 — 2026-10-12

Compatible expansion from 52 to 68 species: 136 standalone SVGs in two optical sizes. All 104 previous source SVGs are byte-identical to v1.2.0, including both Pedunculate oak and Wych elm variants.

### Added

- First review round: Field elm, Grey alder, Common whitebeam, European crab apple, Wild pear, Wayfaring tree, White poplar and Service tree.
- Second review round: Ginkgo, London plane, Tulip tree, American sweetgum, Japanese maple, Italian maple, Common ivy and Turkish hazel. The collection now includes seven Acer species.
- Species-specific morphology and optical-size limits in the botanical notes, plus a [two-round expansion review](docs/EXPANSION-1.3.md).
- Artwork regression coverage for Service tree leaflet counts, the additional declared vein counts and Ginkgo’s bifurcating vein structure without a midrib.

### Updated

- Both READMEs, searchable gallery, sprites, manifest, overview and size reference for all 68 species. Long overview labels wrap inside their cells.
- Browser screenshots are divided into bounded sections when needed, avoiding Firefox’s image-height limit for the longer mobile gallery. All icons still undergo layout and sprite comparison checks.
- Clarify selected shoot forms for White poplar and Common ivy, and leaf-form grouping for Ginkgo.
- Gallery description covers all three poplars and the expanded woody-plant scope; the displayed review date derives from the catalog.

## 1.2.0 — 2026-10-12

Compatible expansion from 28 to 52 species: 104 standalone SVGs in two optical sizes. All 56 existing source SVGs are byte-identical to v1.1.0.

### Added

- First review round: Black elder, Common hawthorn, Blackthorn, Common dogwood, Guelder rose, European holly, Alder buckthorn, European spindle, Dog rose, Cornelian cherry, Wild cherry, Large-leaved lime, Common walnut, Downy birch, European white elm and Wild service tree.
- Second review round: Montpellier maple, Box elder, Wild privet, Common barberry, Fly honeysuckle, Common buckthorn, Snowy mespilus and Bird cherry.
- Species-specific botanical notes and a [two-round expansion review](docs/EXPANSION-1.2.md), with explicit optical-size omissions.
- Closed `leaf-gland` and `leaf-stipule` drawing roles, validated for self-crossings. Semantic artwork regression tests protect selected leaflet/vein counts and small diagnostic structures.

### Updated

- Both READMEs, gallery, sprites, manifest, SVG/PNG overview and size reference for all 52 species.
- Browser test reporting derives the symbol count from the catalog. No changes to existing IDs, paths, licenses or prior artwork.

## 1.1.0 — 2026-10-06

Compatible artwork refresh: species IDs, paths and the 28-species catalog are unchanged.

- Redraw both variants of Silberweide with a balanced lanceolate blade, retaining fine serration in Detail.
- Give Douglasie a less regular, spatially suggested needle arrangement and a pointed terminal bud; validate the new closed bud contour.
- Broaden Schwarzpappel's base while preserving the curved flanks introduced in 1.0.2.
- Reshape Schwarzerle as an obovate blade with a wedge-shaped base and a much shallower apical notch.
- Make Edelkastanie more slender with sharper marginal teeth, retaining its vein-tooth connections.
- Clarify Waldkiefer's three shared-sheath needle pairs through closer grouping and separation along the twig.
- Smooth Bergahorn's basal lobes and coarse teeth while retaining the botanically supported acute sinuses.
- Increase Wacholder to six depicted triple whorls in Detail and four in Compact, with alternating spatial projections.
- Refresh sprites, gallery, manifest, README overviews and size previews; document the botanical assessment and optical reductions.
- Preserve the other 40 source SVGs byte-for-byte from 1.0.2, including Stieleiche and Bergulme.

## 1.0.2 — 2026-10-06

- Redraw Schwarzpappel (Black poplar) in both variants with convex flanks, rounded shoulders, a prolonged apex and a curved, finely toothed margin.
- Curve the lateral veins and adjust Compact vein spacing and endpoints for small sizes.
- Refresh sprites, gallery, manifest, overview and botanical notes. The other 54 source SVGs, including the 1.0.1 Stieleiche redraw, are unchanged.

## 1.0.1 — 2026-10-06

- Redraw Stieleiche (Pedunculate oak) in both variants with fuller ascending lobes, an irregular rounded outline and a more integrated auriculate base.
- Reposition the Detail lateral veins at the lobe margins and retain two sinus veins; simplify Compact to six lateral veins with more space around its heavier strokes.
- Refresh sprites, gallery, manifest, overview and botanical notes. The other 54 source SVGs are unchanged.

## 1.0.0 — 2026-10-05

Initial release.

- 28 Central European tree and shrub species in Detail and Compact: 56 editable SVG icons.
- Two SVG symbol sprites, stable species IDs and a structured catalog with English, German and scientific names.
- Responsive gallery with search, size and color controls, light/dark preview, SVG copying and downloads.
- English and German READMEs, botanical references, integration examples and visual overviews.
- Reproducible builds, geometry and rendering checks, Chromium/Firefox tests and GitHub Actions CI.
- Release archives verified against the complete source file list and file contents.
- Artwork, documentation and botanical metadata under CC BY 4.0; software under MIT.
