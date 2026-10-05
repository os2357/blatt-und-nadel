// SPDX-FileCopyrightText: 2026 Oliver Simon
// SPDX-License-Identifier: MIT
export function overview(icons, geometry, esc, version) {
  const height = 456 + Math.ceil(icons.length / 7) * 221;
  let sheet =
    '<svg xmlns="http://www.w3.org/2000/svg" width="1512" height="' +
    height +
    '" viewBox="0 0 1512 ' +
    height +
    '"><rect width="1512" height="' +
    height +
    '" fill="#f7f7f0"/><g fill="#203d32" font-family="DejaVu Sans,sans-serif"><text x="56" y="66" font-size="12" letter-spacing="3.1">BOTANISCHE ZEICHEN · MITTELEUROPA</text><text x="52" y="145" font-family="P052,Georgia,serif" font-size="73">Blatt &amp; Nadel</text><text x="56" y="191" font-size="16" fill="#68766a">' +
    icons.length +
    ' Gehölze. Ein zusammenhängendes System aus Blatt-, Nadel- und Zweigformen.</text><text x="1456" y="68" text-anchor="end" font-size="12" fill="#68766a">SVG v' +
    esc(version) +
    ' / 2026</text><line x1="56" x2="1456" y1="227" y2="227" stroke="#cdd4c7"/><text x="56" y="258" font-size="11" letter-spacing="1.8" fill="#68766a">DETAIL · 96 × 96 RASTER · FREI SKALIERBAR</text><text x="1456" y="258" text-anchor="end" font-size="11" letter-spacing="1.8" fill="#68766a">EINZEL-SVGS + COMPACT + SPRITES</text></g>';
  icons.forEach((i, n) => {
    const x = 56 + (n % 7) * 200,
      y = 290 + Math.floor(n / 7) * 221;
    sheet +=
      '<g transform="translate(' +
      x +
      ' ' +
      y +
      ')"><text x="3" y="10" fill="#8a9688" font-family="DejaVu Sans" font-size="10">' +
      String(n + 1).padStart(2, '0') +
      '</text><svg x="43" y="15" width="114" height="114" viewBox="0 0 96 96" color="#294b3a" stroke-linecap="round" stroke-linejoin="round">' +
      geometry(i) +
      '</svg><text x="100" y="157" text-anchor="middle" font-family="DejaVu Sans" font-size="13" fill="#203d32">' +
      esc(i.name) +
      '</text><text x="100" y="179" text-anchor="middle" font-family="P052,Georgia,serif" font-style="italic" font-size="14" fill="#738070">' +
      esc(i.latin) +
      '</text><line x1="0" x2="200" y1="205" y2="205" stroke="#dce1d5"/></g>';
  });
  sheet +=
    '<text x="56" y="' +
    (height - 48) +
    '" fill="#68766a" font-family="DejaVu Sans" font-size="11">© 2026 Oliver Simon · CC BY 4.0 · creativecommons.org/licenses/by/4.0/</text><g font-family="DejaVu Sans" fill="#68766a"><text x="56" y="' +
    (height - 115) +
    '" font-size="12">Für Artenporträts, Baumfilter und Naturwissen.</text><text x="56" y="' +
    (height - 90) +
    '" font-size="12">Eigenständig gezeichnete Vektoren · Transparenter Hintergrund · Farbe über currentColor</text><text x="1456" y="' +
    (height - 115) +
    '" text-anchor="end" font-size="12">Detail ab 48 px · Compact ab 24 px</text><text x="1456" y="' +
    (height - 90) +
    '" text-anchor="end" font-size="12">Stilisierte Merkmale, kein Bestimmungsschlüssel.</text></g></svg>';
  return sheet;
}
