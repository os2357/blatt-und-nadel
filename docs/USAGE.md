# Using the SVGs

## Standalone image

```html
<img src="/icons/detail/stieleiche.svg"
     width="64" height="64" alt="Pedunculate oak leaf">
```

For an image already explained by adjacent text, use `alt=""`. The accessible name inside an SVG does not replace the `<img>` element’s own alt text.

`currentColor` in a separate image document defaults to black. To choose a color, use inline SVG, an SVG sprite, or a CSS mask. Copying a file to an `<img>` does not let it inherit the parent page’s `color`.

## External sprite

Choose one variant. The same species ID exists in both sprite files:

```html
<svg width="64" height="64" viewBox="0 0 96 96"
     role="img" aria-label="Aspen leaf" style="color: #34573e">
  <use href="/sprites/leaves-detail.svg#leaf-espe"></use>
</svg>
```

Keep the sprite on the same origin, serve it as `image/svg+xml`, and use HTTP(S). Put the accessible name on the outer `<svg>`. Symbols intentionally have no fixed title IDs, so repeated instances do not create duplicate IDs.

Use `aria-hidden="true"` on a purely decorative SVG beside a visible label. In an icon-only button, give the **button** an accessible name and hide its SVG from assistive technology.

```html
<button type="button" aria-label="Filter by beech">
  <svg width="24" height="24" viewBox="0 0 96 96" aria-hidden="true">
    <use href="/sprites/leaves-compact.svg#leaf-rotbuche"></use>
  </svg>
</button>
```

If you inline the entire sprite document, include each symbol only once. To include both variants inline, rename the symbol IDs and references to prevent collisions.

## Inline SVG and frameworks

Paste the contents of an individual SVG into HTML to inherit `color`. The gallery’s copy button includes the selected variant and a license comment. The downloadable source remains a simpler SVG with only a title and paths.

With React JSX, translate SVG attribute names where required, for example `stroke-width` to `strokeWidth` and `stroke-linecap` to `strokeLinecap`. No framework-specific package is necessary.

## CSS mask

```css
.leaf-icon {
  display: inline-block;
  width: 2rem;
  height: 2rem;
  background: currentColor;
  mask: url('/icons/compact/rotbuche.svg') center / contain no-repeat;
}
```

A CSS mask has no accessible name. Use it decoratively with visible text, or label the containing control.

## Size and visual weight

Use Compact at 24–40 px and Detail at 48 px or above. At 24 px, a vein fork or the exact kind of serration is not a reliable distinction: keep species labels visible when identification matters. The [size reference](sizes.png) shows all species on light and dark backgrounds.

Stroke widths scale with the artwork. Do not set a global `path { fill: ... }` or override all strokes: filled needle shapes and open blade contours have different jobs. The `.leaf-blade` class can be used to fill broadleaf contours selectively. Changing strokes or adding fills is an adaptation; describe it in your credits.

## Attribution

Keep the copyright and license information when redistributing the files. For a website, add a legible credit in your credits/imprint section, with the author, project title, license link and any changes. An invisible SVG comment alone is not a useful user-facing credit. [Examples](../ATTRIBUTION.md).
