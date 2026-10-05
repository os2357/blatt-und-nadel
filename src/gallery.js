/* SPDX-FileCopyrightText: 2026 Oliver Simon
 * SPDX-License-Identifier: MIT */
const $ = (s) => document.querySelector(s),
  cards = [...document.querySelectorAll('.card')];
let variant = 'detail';
function filter() {
  const q = $('#search').value.trim().toLocaleLowerCase('de'),
    group = $('#group').value;
  let n = 0;
  for (const c of cards) {
    c.hidden = !(c.dataset.search.includes(q) && (!group || c.dataset.group === group));
    if (!c.hidden) n++;
  }
  $('#count').textContent = n + ' ' + (n === 1 ? 'Motiv' : 'Motive');
  $('#empty').style.display = n ? 'none' : 'block';
}
$('#search').addEventListener('input', filter);
$('#group').addEventListener('change', filter);
$('#variant').addEventListener('change', (e) => {
  variant = e.target.value;
  for (const c of cards) {
    c.querySelector('[data-detail]').toggleAttribute('hidden', variant !== 'detail');
    c.querySelector('[data-compact]').toggleAttribute('hidden', variant !== 'compact');
    c.querySelector('.download').href = 'icons/' + variant + '/' + c.dataset.id + '.svg';
  }
});
$('#size').addEventListener('input', (e) => {
  document.documentElement.style.setProperty('--icon-size', e.target.value + 'px');
  $('#size-label').textContent = e.target.value + ' px';
});
$('#color').addEventListener('input', (e) =>
  document.documentElement.style.setProperty('--icon-color', e.target.value),
);
$('#theme').addEventListener('click', (e) => {
  const dark = document.body.classList.toggle('dark');
  e.target.setAttribute('aria-pressed', String(dark));
  e.target.textContent = dark ? 'Heller Hintergrund' : 'Dunkler Hintergrund';
  document.documentElement.style.removeProperty('--icon-color');
  $('#color').value = dark ? '#d4dfbd' : '#34573e';
});
let timeout;
function status(s) {
  $('#status').textContent = s;
  $('#status').hidden = false;
  clearTimeout(timeout);
  timeout = setTimeout(() => ($('#status').hidden = true), 3500);
}
document.querySelectorAll('.copy').forEach((b) =>
  b.addEventListener('click', async () => {
    const c = b.closest('.card'),
      clone = c.querySelector('.specimen').cloneNode(true);
    clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    clone.setAttribute('width', '96');
    clone.setAttribute('height', '96');
    clone.removeAttribute('class');
    clone.querySelector(variant === 'detail' ? '[data-compact]' : '[data-detail]').remove();
    clone.querySelector('g').removeAttribute('hidden');
    clone.querySelector('g').removeAttribute('data-' + variant);
    const code =
      '<!-- © 2026 Oliver Simon · Blatt & Nadel · CC BY 4.0 · https://creativecommons.org/licenses/by/4.0/ -->\n' +
      new XMLSerializer().serializeToString(clone);
    try {
      await navigator.clipboard.writeText(code);
      status(c.querySelector('h2').textContent + ' · SVG kopiert');
    } catch {
      const t = document.createElement('textarea');
      t.value = code;
      t.style.position = 'fixed';
      t.style.opacity = '0';
      document.body.append(t);
      t.select();
      const ok = document.execCommand('copy');
      t.remove();
      status(
        ok ? 'SVG kopiert' : 'Kopieren hier nicht verfügbar. Bitte Einzeldatei herunterladen.',
      );
    }
  }),
);
