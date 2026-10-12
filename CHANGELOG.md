# Changelog

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
