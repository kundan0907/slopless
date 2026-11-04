// Shared page behaviour: copy buttons, phone menu, before/after sliders.
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

/* ---------- Copy buttons ---------- */
function copyText(btn, text) {
  const done = () => { const t = btn.dataset.label || btn.textContent; btn.dataset.label = t; btn.textContent = 'Copied'; setTimeout(() => (btn.textContent = t), 1400); };
  (navigator.clipboard?.writeText(text) || Promise.reject()).then(done, () => {
    const ta = document.createElement('textarea'); ta.value = text; document.body.append(ta); ta.select();
    try { document.execCommand('copy'); done(); } catch {} ta.remove();
  });
}
document.addEventListener('click', (e) => {
  const b = e.target.closest('.cp');
  if (!b) return;
  const src = b.dataset.target ? document.getElementById(b.dataset.target) : b.parentElement.querySelector('.cp-src');
  if (src) copyText(b, src.value ?? src.textContent);
});

/* ---------- Phone menu ---------- */
{
  const btn = $('#menu-btn'), menu = $('#menu');
  const set = (open) => { btn.setAttribute('aria-expanded', String(open)); menu.hidden = !open; };
  btn.addEventListener('click', () => set(menu.hidden));
  menu.addEventListener('click', (e) => { if (e.target.closest('a')) set(false); });
  addEventListener('keydown', (e) => { if (e.key === 'Escape' && !menu.hidden) { set(false); btn.focus(); } });
}

/* ---------- Before / after compare sliders ---------- */
$$('.cmp').forEach((c) => {
  const r = $('input', c);
  const set = () => { c.style.setProperty('--pos', r.value + '%'); r.setAttribute('aria-valuetext', r.value < 15 ? 'Showing the after version' : r.value > 85 ? 'Showing the before version' : `${r.value} percent before`); };
  r.addEventListener('input', set); set();
});

