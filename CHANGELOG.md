# Changelog

## 2.4.0 — 2026-10-15

### Changed

- Photo-guided batch re-review continued: 34 taxa in four batches, 22 revised in both sizes (44 SVGs). [Review and revisions](docs/AUDIT-2.4.md).
- Batch 3, Fagaceae and Silberahorn: Rotbuche redrawn as an elliptic-ovate blade (L/W 1.6) with seven / four straight parallel vein pairs. Roteiche and Zerreiche (verdict A) redrawn with their measured outlines: bristle-tipped lobes with U-shaped sinuses, and narrow-oblong blades with irregular triangular lobes. Flaumeiche, Steineiche and Korkeiche redrawn in their measured proportions; Edelkastanie teeth stand clear of the margin. Silberahorn redrawn with deeply cut palmate lobes and coarse sharp teeth. Stieleiche and Traubeneiche confirmed.
- Batch 4, Betulaceae: all ten taxa redrawn with a vein-first margin. Straight secondary veins ascend at the photographed angle of about 40–60° and each ends in a primary tooth, with smaller secondary teeth between. Outlines remeasured: for example Schwarzerle broadly obovate with a notched truncate apex, Hasel broadly ovate-obovate with a short cusp, Baumhasel ovate with rounded basal lobes, Zwergbirke round and crenate. A second pass after user review revised Zwergbirke, Schwarzerle, Grauerle, Hasel and Baumhasel again and then the remaining five.
- Batch 5, Salicaceae: Korbweide redrawn as a linear-lanceolate blade (L/W 8.2, previously as broad as Silberweide); Silberpappel's lobed blade lengthened (L/W 1.03); Mandelweide lateral veins rebuilt. The other ten taxa are unchanged; an optional refinement of the Espe teeth (verdict C) was tried and declined.
- Batch 6, Weißtanne after user review: the three-bud cluster at the shoot tip merged into a trefoil. The distal needle pairs are now shorter and turned forward, and a single ovoid, obtuse terminal bud projects beyond them.
- Catalog descriptions, BOTANY table and README updated for all revised taxa.

### Preserved and verified

- **44 revised and 356 byte-identical SVGs** against v2.3.0. 80 of 200 taxa now carry a v2.3-or-later review; the other 120 keep their v2.2.3 record (`carried-over (review pending)` in [audit-2.4.json](docs/audit-2.4.json)).
- Five new artwork regressions: measured blade proportions of oaks, beech, silver maple and willows; beech vein counts; clear chestnut teeth; birch-family vein angles of 36–60°; and veins ending in their own marginal tooth for ten Betulaceae. The silver fir checks cover the single terminal bud and shortened distal needles. 48 tests pass; audit hashes match all 400 SVGs.
- IDs, paths, viewBoxes and licenses unchanged; photographs are linked, never traced or redistributed.

## 2.3.0 — 2026-10-14

### Added

- 25 taxa in three reviewed groups: Bruchweide, Lavendelweide, Mistel, Brombeere, Spätblühende Traubenkirsche, Silberwurz, Gagel, Kanadische Hemlocktanne, Riesenmammutbaum, Sumpfeiche, Schnurbaum, Tatarischer Steppen-Ahorn, Schmalblättrige Esche, Kartoffelrose, Johannisbrotbaum, Mönchspfeffer, Kermes-Eiche, Echte Bärentraube, Pfriemenginster, Baumheide, Tamariske, Sumpfporst, Krähenbeere, Kirschpflaume and Blaufichte. **200 taxa / 400 SVGs**.
- Each addition: at least three full-size foliage photographs, a primary description, neighbor comparison and a final counter-review against a fresh photograph. [Expansion record](docs/EXPANSION-2.3.md) and [overview](docs/additions-2.3.png).
- Baumheide and Krähenbeere join the `heath` group; Mistel, Pfriemenginster, Tamariske and Sumpfporst are connected twig-bearing shoots.

### Changed

- Start of a photo-guided re-review in family batches. Batches 1–2 cover all 22 gymnosperms; 13 taxa revised in both sizes (26 SVGs): [review and revisions](docs/AUDIT-2.3.md).
- Fichte, Douglasie, Nordmanntanne: parallel-sided needle bodies with short tips; Fichte gains a terminal bud, Weißtanne an obtuse terminal bud (Detail with two lateral buds).
- Waldkiefer, Schwarzkiefer, Pinie, Aleppo-Kiefer, Strandkiefer: short tubular sheaths in natural needle : sheath proportions instead of long collars. Bergkiefer redrawn as a dense upright candle shoot (eight / four fascicles).
- Europäische Lärche redrawn with tufts on visible short shoots. Eibe redrawn with linear, gradually cuspidate needles spreading two-ranked at about 50–63°; a first draft with blunt tips and too wide an angle was corrected before release. Wacholder needles reprofiled.
- Catalog descriptions of the revised conifers updated to match the drawings; BOTANY, README and quality notes updated.
- Browser test: the heath filter expectation is derived from the catalog, and the Detail/Compact switch is operated through its visible label.

### Preserved and verified

- **50 added, 26 revised and 324 byte-identical SVGs** against v2.2.3. The other 153 existing taxa are not yet re-reviewed and keep their v2.2.3 record (`carried-over (v2.3 review pending)` in [audit-2.3.json](docs/audit-2.3.json)).
- Five new artwork regressions: needle profiles, sheath proportions, short shoots and buds, the additions' leaflet, leaf, stipule and gland counts, even-pinnate carob and the new conifers' foliage types. 43 tests pass; audit hashes match all 400 SVGs.
- IDs, paths, viewBoxes and licenses unchanged; photographs are linked, never traced or redistributed.

## 2.2.3 — 2026-10-13

### Fixed

- Atlas cedar in Detail and Compact: replace repeated flat stars with individually projected tufts on three explicit short shoots.
- Give needles slender, nearly parallel bodies, gentle curvature and short pointed ends. Retain solitary needles on the terminal extension in both variants.
- Add a regression for short-shoot origins, true curved-twig insertions and needle width before the terminal taper.
- Update the [source review and comparison](docs/AUDIT-2.2.3.md), exact audit hashes, gallery, sprites and current previews. **Two revised SVGs; 348 byte-identical to v2.2.2**, including the refined herbs.
- Count remains 175 taxa / 350 SVGs; licenses and IDs unchanged.

## 2.2.2 — 2026-10-13

### Fixed

- Refine Lavendel and Rosmarin in both optical sizes using the supplied Köhler botanical plates, existing foliage references and freshly checked modern descriptions.
- Lavendel: longer, narrower ascending blades, gentle curvature and varied angles. Rosmarin: naturally arched, nearly parallel-sided blades with rounded tips and curved Detail midribs.
- Retain opposite pairs, the axillary rosemary branch and open Compact interiors; resolve projected leaf contacts in both sizes.
- Update the [focused review](docs/AUDIT-2.2.2.md), exact hashes, preview, gallery and sprites. **Four revised SVGs; 346 byte-identical to v2.2.1.**
- Count remains 175 taxa / 350 SVGs; licenses and IDs unchanged.

## 2.2.1 — 2026-10-13

### Fixed

- Lavendel and Rosmarin in both variants: replace weak single-leaf silhouettes with source-guided leafy shoots, retaining opposite pairs and natural narrow blade shapes.
- Lavendel selects an upright eight-leaf shoot; Rosmarin a sixteen-leaf branched shoot with a true axillary branch origin. Compact omits midribs for open interiors.
- New explicit twig role and connected-shoot validation; regression protects the paired insertions, blade proportions and branch origin.
- [Sources, limits and before/after review](docs/AUDIT-2.2.1.md), exact audit hashes, gallery, sprites and current previews updated. **Four revised SVGs; 346 byte-identical to v2.2.0.**
- Historical v2.2 expansion records retained. Count remains 175 taxa / 350 SVGs; licenses and IDs unchanged.

## 2.2.0 — 2026-10-13

### Added

- 17 taxa in two sequential reviewed groups: Judasbaum, Terpentin-Pistazie, Breitblättrige Steinlinde, Myrte, Granatapfel, Oleander, Goldregen, Schneebeere, Abendländischer Lebensbaum, Lawsons Scheinzypresse, Mittelmeer-Zypresse, Atlas-Zeder, Weymouth-Kiefer, Nordmanntanne, Garten-Forsythie, Echter Lavendel and Rosmarin. **175 taxa / 350 SVGs**.
- [Expansion record](docs/EXPANSION-2.2.md) and [individual audit of all 350 SVGs](docs/AUDIT-2.2.md), with primary descriptions, foliage references, selected forms, optical limitations, measurements and exact hashes.
- Outlined overlapping scale contours, covered by closed-contour and connected-shoot validation.
- Regression protection for the selected five-needle Weymouth fascicles, seven/three-leaflet additions, revised ascending veins and narrow Compact herbs.

### Fixed

- Rotbuche, Hasel and Salweide: separate ascending lateral vein origins in both variants.
- Pfeifenstrauch: a stronger low ascending pair, supported by the primary references.
- Hainbuche Compact: five more evenly spaced pairs; previously corrected Detail unchanged.
- New draft leaflet contacts, scale outlines, cedar canvas clearance and small-size herb interiors corrected before acceptance.

### Preserved and verified

- **34 added, nine revised and 307 byte-identical SVGs** against v2.1.0. Previous oak, elm, Ginkgo, poplar and conifer corrections remain intact.
- Every taxon and both optical variants received source-guided enlarged and target-size review. Same-day baseline sources were reread; new sources and three targeted baseline clarifications were freshly retrieved. All additions received neighboring-species comparisons.
- README overview, catalog, sprites, gallery and previews updated; stable IDs, licensing and historical review records retained.
- Geometry, stroke, connectivity, metadata, audit-hash and archive checks passed. Fresh browser integration execution remains unavailable, as disclosed in [QUALITY.md](docs/QUALITY.md); no independent botanical certification is claimed.

## 2.1.0 — 2026-10-13

### Added

- Pinie, Aleppo-Kiefer, Salbeiblättrige Zistrose, Montpellier-Zistrose, Strandkiefer, Weißliche Zistrose, Schmalblättrige Steinlinde and Mastixstrauch, each in Detail and Compact: **158 taxa / 316 SVGs**.
- [Two sequential expansion rounds](docs/EXPANSION-2.1.md) and [individual review of every SVG](docs/AUDIT-2.1.md), including references, optical limits, exact artwork hashes and measurements.
- Regression protection for basal Hainbuche veins, Mahonie petiolules, sessile rockroses, the even-pinnate Mastixstrauch leaf and all three new pine fascicles.
- Closed, non-self-crossing filled winged rachises supported by the validator.

### Fixed

- Hainbuche Detail: removed four crowded basal veins; ten distinct ascending pairs remain.
- Mahonie: near-sessile lateral leaflet insertions in both optical sizes; longer terminal stalk retained.
- Schwarzerle catalog: six Detail vein pairs, correcting the former count of five. Artwork unchanged.
- Gallery group selector: chevron inset and text clearance, with native keyboard behavior and forced-colors fallback.
- Draft pine sheath connections and Steinlinde vein spacing refined before acceptance.

### Preserved and verified

- **16 added, three revised and 297 byte-identical SVGs** against v2.0.0. Earlier oak, elm, Ginkgo, conifer, Silberpappel and Vogelbeere corrections remain intact.
- Updated README overview, catalog, sprites, gallery, source notes and previews. Stable IDs, file paths, viewBoxes and licensing retained.
- Every source SVG passed geometry/stroke checks and enlarged/target-size raster review. The 149 existing HTML primary treatments were freshly retrieved; the Acer palmatum treatment text and existing reference photographs were transparently reused and rechecked.
- Fresh browser integration execution was unavailable and remains outstanding, as recorded in [QUALITY.md](docs/QUALITY.md). No independent botanical certification is claimed.

## 2.0.0 — 2026-10-13

### Added

- Schwarze Heckenkirsche, Alpen-Kreuzdorn, Breitblättriges Pfaffenhütchen, Fingerstrauch, Steineiche, Korkeiche, Westlicher Erdbeerbaum and Lorbeer-Schneeball in Detail and Compact: **150 taxa / 300 SVGs**.
- [Two sequential expansion rounds](docs/EXPANSION-2.0.md) and [individual review of every SVG](docs/AUDIT-2.0.md), with source/photo references, optical limits, exact hashes and oriented blade measurements.
- A Rowan regression for excessively narrow leaflets and an undersized terminal leaflet.

### Fixed

- Gallery toolbar: size label/value now share one row; consistent 44 px controls and explicit desktop/tablet/mobile layouts replace arbitrary wrapping. Range control follows the theme and reports its pixel value accessibly.
- Silberpappel: broad, continuous transition into the middle lobe in both sizes.
- Vogelbeere: broader oblong-lanceolate leaflets, rounded slightly unequal bases, entire basal margins and a more comparable terminal leaflet.
- Refined draft Fingerstrauch proportions and Korkeiche vein endpoints before accepting the additions.

### Updated and preserved

- **16 added, four revised and 280 byte-identical SVGs** compared with v1.9.0. Previous Stieleiche, Bergulme, Ginkgo and conifer revisions are preserved.
- README species table now covers all 150 taxa. Updated sources, documentation, catalog, previews, sprites and gallery.
- Package gallery adopts the already-approved hosted settings: 128 px default, Detail/Compact radio switch, Natur-Apps und Naturwebseiten introduction.
- Version 2.0 marks the requested collection milestone; existing IDs, paths and viewBoxes remain compatible.
- Geometry/raster and source review completed. Fresh browser integration execution is unavailable in this environment and remains outstanding, explicitly recorded in [QUALITY.md](docs/QUALITY.md). No independent botanical certification is claimed.

## 1.9.0 — 2026-10-13

### Added

- Green alder, Mahaleb cherry, European bladdernut, Common cotoneaster, Black walnut, Swedish whitebeam, Smoke tree and Manna ash in Detail and Compact: **142 taxa / 284 source SVGs**.
- [Two-stage expansion review](docs/EXPANSION-1.9.md), [fresh complete audit](docs/AUDIT-1.9.md), per-variant hashes and source/photo records.
- Release audit validation: all taxa and both variants must be covered, hashes must match the exact source SVGs, and baseline classifications and release totals must agree. Four regressions cover stale or incomplete evidence.

### Preserved and checked

- **All 268 previous SVGs remain byte-identical to v1.8.0; 16 were added.** No existing drawing was regenerated or reverted.
- All 134 existing primary descriptions and reference photographs were retrieved anew; every old SVG received enlarged and target-size review. Both addition rounds were checked against descriptions, photos and neighboring species.
- Refined draft leaflet spacing and vein endpoints before accepting the new compound leaves. Updated botanical limits, names, both READMEs, previews, catalog, manifest, gallery and sprites.
- Sources use explicit regional taxonomic concepts; no claim of independent botanical certification. Release results are recorded in [QUALITY.md](docs/QUALITY.md).

## 1.8.0 — 2026-10-13

### Added

- Eared willow, Grey willow, Almond willow, Bay willow, Dwarf birch, Bog bilberry, Net-leaved willow and Dwarf willow in Detail and Compact: **134 taxa / 268 source SVGs**.
- [Two-stage expansion review](docs/EXPANSION-1.8.md), [fresh full collection audit](docs/AUDIT-1.8.md), per-variant hashes and source/photo records.

### Fixed

- Gallery license links follow the light/dark theme instead of retaining the browser's low-contrast default blue in dark mode.
- SVG validation no longer mistakes the scientific label “Betula nana” for a NaN value. Invalid-number detection is scoped to path geometry; whole-source XML safety checks remain. Malformed-path regressions cover NaN, Infinity, undefined and numeric overflow.

### Preserved and checked

- **All 252 previous SVGs are byte-identical to v1.7.0; 16 were added.** No previous drawing was regenerated or reverted.
- Fresh review of all 134 taxa in both optical sizes, including photographs and target sizes on light/dark backgrounds.
- Updated both READMEs, botanical limits, previews, catalog, manifest, gallery and sprites. Existing IDs and licenses remain unchanged.
- Automated and browser release results are recorded in [QUALITY.md](docs/QUALITY.md).

## 1.7.0 — 2026-10-13

### Added

- Olive, Common fig, Quince, Cultivated pear, Apricot, Almond, Medlar and Bay laurel in Detail and Compact: **126 taxa / 252 source SVGs**.
- [Two-stage expansion review](docs/EXPANSION-1.7.md), a [fresh full collection audit](docs/AUDIT-1.7.md) and per-variant hashes, geometry and source/photo references.
- Permanent validation of visible vein-origin attachment, including a regression for branches and false contour-only contact.

### Fixed

- Wych elm: unequal rounded basal lobe and very short partly concealed petiole, preserving the selected three-point apex.
- European hornbeam: rounded slightly unequal base on the retained elongated blade.
- Sweet cherry: more elongated selected blade proportions; petiole and Detail glands retained.
- Fourteen detached vein origins in eight Detail drawings reconnected to their parent curves; their outlines and Compact variants are unchanged.

### Preserved and checked

- **222 existing SVGs are byte-identical to v1.6.1; 14 were revised and 16 added.** Stieleiche, Ginkgo, Schwarzpappel and all conifers are preserved.
- All 252 variants received final target-size review; 26 regression tests, full geometry/metadata checks, generated-file checks and Chromium/Firefox workflows pass.
- Updated both READMEs, previews, catalog, manifest, gallery and sprites. Existing IDs and licenses remain in place.

## 1.6.1 — 2026-10-13

### Added

- Cultivated apple / Kulturapfel (`kulturapfel`, _Malus domestica_) in Detail and Compact, bringing the collection to **118 species / 236 standalone SVGs**.
- Source and foliage comparison, neighboring-fruit-tree review and documented optical reductions in [AUDIT-1.6.1.md](docs/AUDIT-1.6.1.md); current hashes in [audit-1.6.1.json](docs/audit-1.6.1.json).
- Updated catalog, sprites, gallery, manifest, overview, size reference and both READMEs.

### Preserved

- All **234 existing SVGs are byte-identical to v1.6.0**. No earlier Ginkgo, oak, elm, poplar, pine or plum artwork was replaced.
- Existing licenses, species IDs, optical-size conventions and accessibility metadata remain in place.

The requested patch version is used for this targeted addition. Both new drawings are source-guided stylizations of a variable cultivated species, not cultivar identifiers.

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
