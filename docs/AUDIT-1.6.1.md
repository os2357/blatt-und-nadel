# Cultivated apple review — 1.6.1

13 October 2026 · **118 species / 236 source SVGs** · baseline: canonical v1.6.0 ZIP

This release adds **Kulturapfel / Cultivated apple / Malus domestica**, ID `kulturapfel`, in both optical sizes. All **234 existing SVGs are byte-identical to v1.6.0**, including Ginkgo, Pedunculate oak, Wych elm, Black poplar, the pines and European plum. The prior full collection review remains in [AUDIT-1.6.md](AUDIT-1.6.md); it is not presented as newly repeated in this small release. [audit-1.6.1.json](audit-1.6.1.json) records all current hashes and identifies the inherited review records.

## Source and form decisions

- [Flora of North America](https://floranorthamerica.org/Malus_domestica): selected a broad ovate, unlobed leaf with rounded base, acute apex and blunt serration. The drawing fits within the described variable blade and petiole proportions.
- [InfoFlora / Flora Helvetica, under Malus pumila](https://www.infoflora.ch/de/flora/malus-pumila.html): relative petiole length and the difficult distinction from Wild apple. The catalog follows FNA's conserved name Malus domestica; the alternate source name is retained in this reference rather than creating a duplicate icon.
- [Bochum Botanical Association](https://botanik-bochum.de/web/pflanzenbilder/Malus_domestica.htm): four foliage views, including a complete leaf with fruit, upper/lower margin close-ups and an orchard shoot. References were compared, not traced or redistributed. Exact photo URLs are in the JSON audit.

## Selected drawing and optical review

Selected broad ovate leaf with a rounded base, acute apex, blunt serration and a petiole about two-fifths of the blade length. Detail has seven ascending lateral vein pairs; Compact retains three and merges fine teeth. Counts are drawing choices. Cultivar variation, hairs, deciduous stipules and the fine venation network are omitted. Shape overlaps Wild apple; this icon is not a cultivar or hybrid identification tool.

The contour is original geometry with slightly unequal flanks. The lower blade is broad and rounded, and the short acute upper end has no invented extra lobes. Teeth have rounded shoulders and steeper forward-facing sides. Internal nerves ascend and curve toward the margin; the complete fine mesh is not encoded. The leaf was compared beside the existing Wild apple, European plum and Wild pear in both variants, at 220 px and at Compact 24/32 px and Detail 48/64 px on light/dark backgrounds. Compact uses fewer teeth and separately positioned vein endpoints, not a thickened copy of Detail.

## Validation and limits

The complete collection passes the XML, accessibility, contour, blade-separation, viewport, internal-line and 16× painted-stroke checks. The 25 regression tests and generated-file check pass. Browser checks in Chromium and Firefox cover all 236 external sprite/inline pairs, gallery interactions and layouts from 320 to 1440 CSS pixels. See [QUALITY.md](QUALITY.md) for the method and tolerances.

Cultivated apples have diverse leaves and can overlap Wild apple in shape. Hairs and other omitted characters matter for botanical comparison. These icons accompany a species name; they do not independently determine cultivar, wild ancestry or hybrid status.
