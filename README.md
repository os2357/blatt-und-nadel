# Blatt & Nadel

**28 Central European tree and shrub species · 56 SVG icons · v1.1.0**

Leaf, needle and twig icons for nature websites, species profiles and filters. Two optical sizes pair distinctive botanical forms with clear, consistent linework.

[Deutsch](docs/README.de.md) · [Usage](docs/USAGE.md) · [Botanical notes](docs/BOTANY.md) · [Quality checks](docs/QUALITY.md) · [Changelog](CHANGELOG.md)

![All 28 species in the Detail variant](docs/preview.png)

## Use the icons

Copy the SVGs you need from `icons/` or `sprites/` into your project. No installation or build is required.

| Variant   | Display size    | Use                                               |
| --------- | --------------- | ------------------------------------------------- |
| `compact` | 24–40 px        | Small controls, filters and navigation            |
| `detail`  | 48 px and above | Species portraits; 64 px or larger for fine veins |

Every icon uses a `0 0 96 96` viewBox, a transparent background and `currentColor`. The files contain editable vector paths, with no embedded images, fonts, scripts or remote assets.

```html
<!-- Decorative icon next to a visible label -->
<svg width="32" height="32" viewBox="0 0 96 96" aria-hidden="true"
     style="color: #34573e">
  <use href="/sprites/leaves-compact.svg#leaf-rotbuche"></use>
</svg>
<span>Rotbuche</span>
```

Serve an external sprite over HTTP(S) from the same origin as your page. Adapt the path to your asset location. An `<img>` also works, but does not inherit surrounding CSS text color. See [usage and accessibility](docs/USAGE.md) and the [attribution template](ATTRIBUTION.md).

## Explore the collection

Open `index.html` for the self-contained gallery: search, switch variants, adjust size and color, preview on a dark background, and copy or download SVGs. The [size reference](docs/sizes.png) shows all species at 24, 32, 48 and 64 px.

For the external sprite examples, start the local server with Node.js:

```sh
npm run serve
# http://127.0.0.1:8080
# http://127.0.0.1:8080/examples/sprite.html
```

## Develop

Use Node.js 24 (`.nvmrc`). Individual SVGs in `icons/` are the canonical artwork. Edit them directly, then regenerate the gallery, sprites and previews:

```sh
npm ci
npm run format
npm run build
npm run render:preview
npm test
npm run format:check
```

`npm test` checks XML, labels, license notices, catalog consistency, rendering, clipping, blade/needle/bud self-intersections, separation of leaflet outlines, vein/midrib containment, complete stroke footprints, connected conifer shoots and generated-file freshness. Regression tests exercise the geometry checker. Browser checks cover Chromium and Firefox:

```sh
npx playwright install --with-deps chromium firefox
npm run test:browser
```

CI runs the geometry and browser checks, the archive regression test and the release builder. The lockfile pins development dependencies; the icons themselves have none. Preview text uses system fonts and may differ slightly between systems. See [quality checks and their limits](docs/QUALITY.md).

For a verified release ZIP, use `npm run test:release` and `npm run release`. See [release instructions](docs/PUBLISHING.md).

## Project layout

| Path                      | Contents                                                  |
| ------------------------- | --------------------------------------------------------- |
| `icons/{detail,compact}/` | Canonical SVG artwork                                     |
| `src/icons.json`          | Names, descriptions and botanical references              |
| `src/gallery.*`           | Gallery template, CSS and JavaScript                      |
| `sprites/`                | Generated SVG symbol sprites                              |
| `data/manifest.json`      | Generated catalog with paths and stable IDs               |
| `docs/`                   | Guides, sources, overview and size reference              |
| `examples/sprite.html`    | Minimal integration examples                              |
| `scripts/`                | Build, validation, preview rendering, releases and server |
| `tests/`                  | Geometry, archive and browser checks                      |
| `.github/`                | CI and contribution templates                             |

Generated assets are included so the collection is ready to use. Drawing and contribution rules are in [CONTRIBUTING.md](CONTRIBUTING.md).

## Species

IDs use stable German ASCII names. The manifest includes English and German common names, scientific names, paths, references and `since` version fields. Gallery controls and short botanical descriptions are in German.

| ID              | English           | Deutsch             | Scientific name          |
| --------------- | ----------------- | ------------------- | ------------------------ |
| `fichte`        | Norway spruce     | Fichte              | _Picea abies_            |
| `kiefer`        | Scots pine        | Waldkiefer          | _Pinus sylvestris_       |
| `laerche`       | European larch    | Europäische Lärche  | _Larix decidua_          |
| `tanne`         | Silver fir        | Weißtanne           | _Abies alba_             |
| `douglasie`     | Douglas fir       | Douglasie           | _Pseudotsuga menziesii_  |
| `eibe`          | English yew       | Eibe                | _Taxus baccata_          |
| `wacholder`     | Common juniper    | Wacholder           | _Juniperus communis_     |
| `stieleiche`    | Pedunculate oak   | Stieleiche          | _Quercus robur_          |
| `traubeneiche`  | Sessile oak       | Traubeneiche        | _Quercus petraea_        |
| `rotbuche`      | European beech    | Rotbuche            | _Fagus sylvatica_        |
| `haengebirke`   | Silver birch      | Hängebirke          | _Betula pendula_         |
| `schwarzpappel` | Black poplar      | Schwarzpappel       | _Populus nigra_          |
| `espe`          | European aspen    | Espe · Zitterpappel | _Populus tremula_        |
| `schwarzerle`   | Black alder       | Schwarzerle         | _Alnus glutinosa_        |
| `hainbuche`     | European hornbeam | Hainbuche           | _Carpinus betulus_       |
| `winterlinde`   | Small-leaved lime | Winterlinde         | _Tilia cordata_          |
| `hasel`         | Common hazel      | Hasel               | _Corylus avellana_       |
| `bergahorn`     | Sycamore maple    | Bergahorn           | _Acer pseudoplatanus_    |
| `spitzahorn`    | Norway maple      | Spitzahorn          | _Acer platanoides_       |
| `feldahorn`     | Field maple       | Feldahorn           | _Acer campestre_         |
| `esche`         | European ash      | Gemeine Esche       | _Fraxinus excelsior_     |
| `bergulme`      | Wych elm          | Bergulme            | _Ulmus glabra_           |
| `salweide`      | Goat willow       | Salweide            | _Salix caprea_           |
| `silberweide`   | White willow      | Silberweide         | _Salix alba_             |
| `rosskastanie`  | Horse chestnut    | Rosskastanie        | _Aesculus hippocastanum_ |
| `edelkastanie`  | Sweet chestnut    | Edelkastanie        | _Castanea sativa_        |
| `vogelbeere`    | Rowan             | Vogelbeere          | _Sorbus aucuparia_       |
| `robinie`       | Black locust      | Robinie             | _Robinia pseudoacacia_   |

## Botanical scope

The drawings preserve characteristic leaf shapes, arrangements, lobes and relative petiole lengths. They depict selected typical forms: for example, a rounded short-shoot leaf for aspen and a comb-like shade shoot for silver fir. Each species is scaled independently.

These are botanically informed stylizations. Veins, teeth and needle counts are simplified for legibility; natural variation, surface hairs and three-dimensional features are not fully represented. Each species has a documented source and variant-specific limits. The collection is not a complete identification key or an independently reviewed scientific plate series. [Botanical notes](docs/BOTANY.md) explain the choices and sources.

## License

**Artwork, previews, documentation and botanical metadata: [CC BY 4.0](LICENSE), © 2026 Oliver Simon.** Sharing, adaptation and commercial use are permitted with attribution, a license link and notice of changes. [Copy-ready attribution](ATTRIBUTION.md).

**Software, gallery code, examples and project configuration: [MIT](LICENSES/MIT.txt).** Embedded artwork retains CC BY 4.0. See [license scope](LICENSES/README.md).

To publish your repository and tag this release, follow [PUBLISHING.md](docs/PUBLISHING.md). The project is marked `private` to avoid accidental npm publication.
