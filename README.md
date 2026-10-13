# Blatt & Nadel

**150 woody taxa · Central Europe and selected Mediterranean foliage · 300 SVG icons · v2.0.0**

Leaf, needle and twig icons for nature websites, species profiles and filters. Two optical sizes pair distinctive botanical forms with clear, consistent linework.

[Deutsch](docs/README.de.md) · [Usage](docs/USAGE.md) · [Botanical notes](docs/BOTANY.md) · [Quality checks](docs/QUALITY.md) · [Changelog](CHANGELOG.md)

![All 150 species in the Detail variant](docs/preview.png)

Version 2.0 adds eight shrubs and evergreen trees in two reviewed groups, revises White poplar and Rowan, and preserves the other 280 SVGs byte-for-byte. All 150 taxa and both optical sizes were rechecked against descriptions and foliage. [Full review](docs/AUDIT-2.0.md) · [Expansion](docs/EXPANSION-2.0.md) · [Scope](docs/SCOPE.md). Browser integration verification for this release remains outstanding; see [quality results](docs/QUALITY.md).

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

`npm test` checks XML, labels, license notices, catalog consistency, rendering, clipping, blade/needle/bud self-intersections, separation of leaflet outlines, vein/midrib containment, complete stroke footprints, connected conifer and heath shoots and generated-file freshness. It also verifies that the current botanical audit covers every SVG and matches its exact bytes. Regression tests exercise the geometry checker and protect selected leaflet counts, venation counts, glands and stipules. Browser checks cover Chromium and Firefox:

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

Stable German ASCII IDs are retained. The manifest provides both common names, scientific names, source URLs, file paths and introduction versions.

| ID                                 | English                | Deutsch                        | Scientific name                |
| ---------------------------------- | ---------------------- | ------------------------------ | ------------------------------ |
| `fichte`                           | Norway spruce          | Fichte                         | _Picea abies_                  |
| `kiefer`                           | Scots pine             | Waldkiefer                     | _Pinus sylvestris_             |
| `laerche`                          | European larch         | Europäische Lärche             | _Larix decidua_                |
| `tanne`                            | Silver fir             | Weißtanne                      | _Abies alba_                   |
| `douglasie`                        | Douglas fir            | Douglasie                      | _Pseudotsuga menziesii_        |
| `eibe`                             | English yew            | Eibe                           | _Taxus baccata_                |
| `wacholder`                        | Common juniper         | Wacholder                      | _Juniperus communis_           |
| `stieleiche`                       | Pedunculate oak        | Stieleiche                     | _Quercus robur_                |
| `traubeneiche`                     | Sessile oak            | Traubeneiche                   | _Quercus petraea_              |
| `rotbuche`                         | European beech         | Rotbuche                       | _Fagus sylvatica_              |
| `haengebirke`                      | Silver birch           | Hängebirke                     | _Betula pendula_               |
| `schwarzpappel`                    | Black poplar           | Schwarzpappel                  | _Populus nigra_                |
| `espe`                             | European aspen         | Espe · Zitterpappel            | _Populus tremula_              |
| `schwarzerle`                      | Black alder            | Schwarzerle                    | _Alnus glutinosa_              |
| `hainbuche`                        | European hornbeam      | Hainbuche                      | _Carpinus betulus_             |
| `winterlinde`                      | Small-leaved lime      | Winterlinde                    | _Tilia cordata_                |
| `hasel`                            | Common hazel           | Hasel                          | _Corylus avellana_             |
| `bergahorn`                        | Sycamore maple         | Bergahorn                      | _Acer pseudoplatanus_          |
| `spitzahorn`                       | Norway maple           | Spitzahorn                     | _Acer platanoides_             |
| `feldahorn`                        | Field maple            | Feldahorn                      | _Acer campestre_               |
| `esche`                            | European ash           | Gemeine Esche                  | _Fraxinus excelsior_           |
| `bergulme`                         | Wych elm               | Bergulme                       | _Ulmus glabra_                 |
| `salweide`                         | Goat willow            | Salweide                       | _Salix caprea_                 |
| `silberweide`                      | White willow           | Silberweide                    | _Salix alba_                   |
| `rosskastanie`                     | Horse chestnut         | Rosskastanie                   | _Aesculus hippocastanum_       |
| `edelkastanie`                     | Sweet chestnut         | Edelkastanie                   | _Castanea sativa_              |
| `vogelbeere`                       | Rowan                  | Vogelbeere                     | _Sorbus aucuparia_             |
| `robinie`                          | Black locust           | Robinie                        | _Robinia pseudoacacia_         |
| `schwarzer-holunder`               | Black elder            | Schwarzer Holunder             | _Sambucus nigra_               |
| `eingriffeliger-weissdorn`         | Common hawthorn        | Eingriffeliger Weißdorn        | _Crataegus monogyna_           |
| `schlehe`                          | Blackthorn             | Schlehe                        | _Prunus spinosa_               |
| `roter-hartriegel`                 | Common dogwood         | Roter Hartriegel               | _Cornus sanguinea_             |
| `gewoehnlicher-schneeball`         | Guelder rose           | Gewöhnlicher Schneeball        | _Viburnum opulus_              |
| `stechpalme`                       | European holly         | Stechpalme                     | _Ilex aquifolium_              |
| `faulbaum`                         | Alder buckthorn        | Faulbaum                       | _Frangula alnus_               |
| `pfaffenhuetchen`                  | European spindle       | Pfaffenhütchen                 | _Euonymus europaeus_           |
| `hundsrose`                        | Dog rose               | Hundsrose                      | _Rosa canina_                  |
| `kornelkirsche`                    | Cornelian cherry       | Kornelkirsche                  | _Cornus mas_                   |
| `vogelkirsche`                     | Wild cherry            | Vogelkirsche                   | _Prunus avium_                 |
| `sommerlinde`                      | Large-leaved lime      | Sommerlinde                    | _Tilia platyphyllos_           |
| `walnuss`                          | Common walnut          | Walnuss                        | _Juglans regia_                |
| `moorbirke`                        | Downy birch            | Moorbirke                      | _Betula pubescens_             |
| `flatterulme`                      | European white elm     | Flatterulme                    | _Ulmus laevis_                 |
| `elsbeere`                         | Wild service tree      | Elsbeere                       | _Sorbus torminalis_            |
| `franzoesischer-ahorn`             | Montpellier maple      | Französischer Ahorn            | _Acer monspessulanum_          |
| `eschenahorn`                      | Box elder              | Eschenahorn                    | _Acer negundo_                 |
| `liguster`                         | Wild privet            | Liguster                       | _Ligustrum vulgare_            |
| `berberitze`                       | Common barberry        | Berberitze                     | _Berberis vulgaris_            |
| `rote-heckenkirsche`               | Fly honeysuckle        | Rote Heckenkirsche             | _Lonicera xylosteum_           |
| `kreuzdorn`                        | Common buckthorn       | Kreuzdorn                      | _Rhamnus cathartica_           |
| `felsenbirne`                      | Snowy mespilus         | Felsenbirne                    | _Amelanchier ovalis_           |
| `traubenkirsche`                   | Bird cherry            | Traubenkirsche                 | _Prunus padus_                 |
| `feldulme`                         | Field elm              | Feldulme                       | _Ulmus minor_                  |
| `grauerle`                         | Grey alder             | Grauerle                       | _Alnus incana_                 |
| `mehlbeere`                        | Common whitebeam       | Mehlbeere                      | _Sorbus aria_                  |
| `wildapfel`                        | European crab apple    | Wildapfel                      | _Malus sylvestris_             |
| `wildbirne`                        | Wild pear              | Wildbirne                      | _Pyrus pyraster_               |
| `wolliger-schneeball`              | Wayfaring tree         | Wolliger Schneeball            | _Viburnum lantana_             |
| `silberpappel`                     | White poplar           | Silberpappel                   | _Populus alba_                 |
| `speierling`                       | Service tree           | Speierling                     | _Sorbus domestica_             |
| `ginkgo`                           | Ginkgo                 | Ginkgo                         | _Ginkgo biloba_                |
| `ahornblaettrige-platane`          | London plane           | Ahornblättrige Platane         | _Platanus × hispanica_         |
| `tulpenbaum`                       | Tulip tree             | Tulpenbaum                     | _Liriodendron tulipifera_      |
| `amberbaum`                        | American sweetgum      | Amberbaum                      | _Liquidambar styraciflua_      |
| `faecherahorn`                     | Japanese maple         | Fächerahorn                    | _Acer palmatum_                |
| `schneeballblaettriger-ahorn`      | Italian maple          | Schneeballblättriger Ahorn     | _Acer opalus_                  |
| `efeu`                             | Common ivy             | Efeu                           | _Hedera helix_                 |
| `baumhasel`                        | Turkish hazel          | Baumhasel                      | _Corylus colurna_              |
| `roteiche`                         | Northern red oak       | Roteiche                       | _Quercus rubra_                |
| `flaumeiche`                       | Downy oak              | Flaumeiche                     | _Quercus pubescens_            |
| `zerreiche`                        | Turkey oak             | Zerreiche                      | _Quercus cerris_               |
| `silberlinde`                      | Silver lime            | Silberlinde                    | _Tilia tomentosa_              |
| `roter-holunder`                   | Red elder              | Roter Holunder                 | _Sambucus racemosa_            |
| `zweigriffeliger-weissdorn`        | Midland hawthorn       | Zweigriffeliger Weißdorn       | _Crataegus laevigata_          |
| `himbeere`                         | Red raspberry          | Himbeere                       | _Rubus idaeus_                 |
| `sanddorn`                         | Sea buckthorn          | Sanddorn                       | _Hippophae rhamnoides_         |
| `zirbelkiefer`                     | Swiss stone pine       | Zirbelkiefer · Arve            | _Pinus cembra_                 |
| `bergkiefer`                       | Mountain pine          | Bergkiefer                     | _Pinus mugo_                   |
| `urweltmammutbaum`                 | Dawn redwood           | Urweltmammutbaum               | _Metasequoia glyptostroboides_ |
| `goetterbaum`                      | Tree of heaven         | Götterbaum                     | _Ailanthus altissima_          |
| `essigbaum`                        | Staghorn sumac         | Essigbaum                      | _Rhus typhina_                 |
| `silberahorn`                      | Silver maple           | Silberahorn                    | _Acer saccharinum_             |
| `rotahorn`                         | Red maple              | Rotahorn                       | _Acer rubrum_                  |
| `kirschlorbeer`                    | Cherry laurel          | Kirschlorbeer                  | _Prunus laurocerasus_          |
| `buchsbaum`                        | Common box             | Buchsbaum                      | _Buxus sempervirens_           |
| `flieder`                          | Common lilac           | Flieder                        | _Syringa vulgaris_             |
| `seidelbast`                       | Mezereon               | Echter Seidelbast              | _Daphne mezereum_              |
| `purpurweide`                      | Purple willow          | Purpurweide                    | _Salix purpurea_               |
| `korbweide`                        | Basket willow          | Korbweide                      | _Salix viminalis_              |
| `mahonie`                          | Oregon grape           | Mahonie                        | _Mahonia aquifolium_           |
| `kratzbeere`                       | European dewberry      | Kratzbeere                     | _Rubus caesius_                |
| `schwarze-johannisbeere`           | Blackcurrant           | Schwarze Johannisbeere         | _Ribes nigrum_                 |
| `heidelbeere`                      | Bilberry               | Heidelbeere                    | _Vaccinium myrtillus_          |
| `preiselbeere`                     | Lingonberry            | Preiselbeere                   | _Vaccinium vitis-idaea_        |
| `rostblaettrige-alpenrose`         | Rusty-leaved alpenrose | Rostblättrige Alpenrose        | _Rhododendron ferrugineum_     |
| `stachelbeere`                     | Gooseberry             | Stachelbeere                   | _Ribes uva-crispa_             |
| `zuergelbaum`                      | European nettle tree   | Europäischer Zürgelbaum        | _Celtis australis_             |
| `hopfenbuche`                      | European hop-hornbeam  | Hopfenbuche                    | _Ostrya carpinifolia_          |
| `schwarzkiefer`                    | European black pine    | Schwarzkiefer                  | _Pinus nigra_                  |
| `sumpfzypresse`                    | Bald cypress           | Sumpfzypresse                  | _Taxodium distichum_           |
| `besenheide`                       | Common heather         | Besenheide                     | _Calluna vulgaris_             |
| `schneeheide`                      | Winter heath           | Schneeheide                    | _Erica carnea_                 |
| `besenginster`                     | Common broom           | Besenginster                   | _Cytisus scoparius_            |
| `faerberginster`                   | Dyer’s greenweed       | Färber-Ginster                 | _Genista tinctoria_            |
| `waldrebe`                         | Traveller’s joy        | Gewöhnliche Waldrebe           | _Clematis vitalba_             |
| `weinrebe`                         | Common grapevine       | Weinrebe                       | _Vitis vinifera_               |
| `rote-johannisbeere`               | Red currant            | Rote Johannisbeere             | _Ribes rubrum_                 |
| `alpen-johannisbeere`              | Alpine currant         | Alpen-Johannisbeere            | _Ribes alpinum_                |
| `sommerflieder`                    | Butterfly bush         | Sommerflieder                  | _Buddleja davidii_             |
| `pfeifenstrauch`                   | Sweet mock orange      | Gewöhnlicher Pfeifenstrauch    | _Philadelphus coronarius_      |
| `trompetenbaum`                    | Southern catalpa       | Gewöhnlicher Trompetenbaum     | _Catalpa bignonioides_         |
| `blauglockenbaum`                  | Empress tree           | Blauglockenbaum                | _Paulownia tomentosa_          |
| `weisse-maulbeere`                 | White mulberry         | Weiße Maulbeere                | _Morus alba_                   |
| `schwarze-maulbeere`               | Black mulberry         | Schwarze Maulbeere             | _Morus nigra_                  |
| `gleditschie`                      | Honey locust           | Gleditschie                    | _Gleditsia triacanthos_        |
| `pfirsich`                         | Peach                  | Pfirsich                       | _Prunus persica_               |
| `pflaume`                          | European plum          | Pflaume                        | _Prunus domestica_             |
| `kulturapfel`                      | Cultivated apple       | Kulturapfel                    | _Malus domestica_              |
| `oelbaum`                          | Olive                  | Ölbaum                         | _Olea europaea_                |
| `feige`                            | Common fig             | Echte Feige                    | _Ficus carica_                 |
| `quitte`                           | Quince                 | Quitte                         | _Cydonia oblonga_              |
| `kulturbirne`                      | Cultivated pear        | Kulturbirne                    | _Pyrus communis_               |
| `aprikose`                         | Apricot                | Aprikose                       | _Prunus armeniaca_             |
| `mandel`                           | Almond                 | Mandelbaum                     | _Prunus dulcis_                |
| `mispel`                           | Medlar                 | Mispel                         | _Mespilus germanica_           |
| `lorbeer`                          | Bay laurel             | Echter Lorbeer                 | _Laurus nobilis_               |
| `ohrweide`                         | Eared willow           | Ohrweide                       | _Salix aurita_                 |
| `grauweide`                        | Grey willow            | Grauweide                      | _Salix cinerea_                |
| `mandelweide`                      | Almond willow          | Mandelweide                    | _Salix triandra_               |
| `lorbeerweide`                     | Bay willow             | Lorbeerweide                   | _Salix pentandra_              |
| `zwergbirke`                       | Dwarf birch            | Zwergbirke                     | _Betula nana_                  |
| `rauschbeere`                      | Bog bilberry           | Rauschbeere                    | _Vaccinium uliginosum_         |
| `netzweide`                        | Net-leaved willow      | Netzweide                      | _Salix reticulata_             |
| `krautweide`                       | Dwarf willow           | Krautweide                     | _Salix herbacea_               |
| `gruenerle`                        | Green alder            | Grünerle                       | _Alnus viridis_                |
| `steinweichsel`                    | Mahaleb cherry         | Steinweichsel                  | _Prunus mahaleb_               |
| `pimpernuss`                       | European bladdernut    | Pimpernuss                     | _Staphylea pinnata_            |
| `gewoehnliche-zwergmispel`         | Common cotoneaster     | Gewöhnliche Zwergmispel        | _Cotoneaster integerrimus_     |
| `schwarznuss`                      | Black walnut           | Schwarznuss                    | _Juglans nigra_                |
| `schwedische-mehlbeere`            | Swedish whitebeam      | Schwedische Mehlbeere          | _Sorbus intermedia_            |
| `perueckenstrauch`                 | Smoke tree             | Perückenstrauch                | _Cotinus coggygria_            |
| `blumenesche`                      | Manna ash              | Blumenesche                    | _Fraxinus ornus_               |
| `schwarze-heckenkirsche`           | Black honeysuckle      | Schwarze Heckenkirsche         | _Lonicera nigra_               |
| `alpen-kreuzdorn`                  | Alpine buckthorn       | Alpen-Kreuzdorn                | _Rhamnus alpina_               |
| `breitblaettriges-pfaffenhuetchen` | Broad-leaved spindle   | Breitblättriges Pfaffenhütchen | _Euonymus latifolius_          |
| `fingerstrauch`                    | Shrubby cinquefoil     | Fingerstrauch                  | _Potentilla fruticosa_         |
| `steineiche`                       | Holm oak               | Steineiche                     | _Quercus ilex_                 |
| `korkeiche`                        | Cork oak               | Korkeiche                      | _Quercus suber_                |
| `erdbeerbaum`                      | Strawberry tree        | Westlicher Erdbeerbaum         | _Arbutus unedo_                |
| `lorbeer-schneeball`               | Laurustinus            | Lorbeer-Schneeball             | _Viburnum tinus_               |

## Botanical scope

The collection includes native, naturalized and planted trees, shrubs and woody climbers of Central Europe, with selected Mediterranean evergreens. The `broadleaf` catalog group describes blade-bearing foliage; it includes Ginkgo, a gymnosperm, and is not an angiosperm classification. The added `heath` group contains Calluna and Erica shoots; these flowering plants are not conifers. It is a drawing group, not the complete Ericaceae family. The drawings preserve characteristic leaf shapes, arrangements, lobes and relative petiole lengths. They depict selected typical forms: for example, a rounded short-shoot leaf for aspen and a comb-like shade shoot for silver fir. Each species is scaled independently.

These are botanically informed stylizations. Veins, teeth and needle counts are simplified for legibility; natural variation, surface hairs and three-dimensional features are not fully represented. Each species has a documented source and variant-specific limits. The collection is not a complete identification key or an independently reviewed scientific plate series. [Botanical notes](docs/BOTANY.md) explain the choices and sources.

## License

**Artwork, previews, documentation and botanical metadata: [CC BY 4.0](LICENSE), © 2026 Oliver Simon.** Sharing, adaptation and commercial use are permitted with attribution, a license link and notice of changes. [Copy-ready attribution](ATTRIBUTION.md).

**Software, gallery code, examples and project configuration: [MIT](LICENSES/MIT.txt).** Embedded artwork retains CC BY 4.0. See [license scope](LICENSES/README.md).

To publish your repository and tag this release, follow [PUBLISHING.md](docs/PUBLISHING.md). The project is marked `private` to avoid accidental npm publication.
