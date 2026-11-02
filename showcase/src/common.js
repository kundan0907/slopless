// Palette picker shared by both pages. Persists the choice and tells the hero scene (home only) to redraw.
(() => {
  const PALETTES = [
    ['obsidian', 'Obsidian Brass', 'Restrained dark', '#0B0C0F', '#ECE8E1', '#D6AE6B', '#15171B', '#9C978E'],
    ['vermilion', 'Vermilion', 'Drenched', '#E4401E', '#140B08', '#140B08', '#16100D', '#1F0A05'],
    ['glacier', 'Glacier', 'Restrained light', '#EDF1F4', '#16202A', '#2C5A88', '#FFFFFF', '#55626F'],
    ['sapphire', 'Sapphire Glass', 'Dark with glass', '#070B18', '#E8EEFA', '#9DB7FF', '#0F1730', '#98A6C4'],
    ['graphite', 'Graphite Signal', 'Restrained dark', '#111214', '#E7E6E2', '#FF7A1A', '#1A1B1E', '#9A9993'],
    ['moss', 'Moss Paper', 'Editorial light', '#E9E8E1', '#1A1E19', '#2E5638', '#F5F4EF', '#565C53'],
    ['cobalt', 'Porcelain Cobalt', 'Committed light', '#F6F6F3', '#0D1430', '#2340D6', '#FFFFFF', '#4A5170'],
    ['oxblood', 'Oxblood', 'Drenched dark', '#2B0E13', '#F4E7E0', '#F0B79F', '#3A151B', '#C9A79F'],
    ['blueprint', 'Blueprint Slate', 'Full palette', '#0B1220', '#E6EDF7', '#3DDC97', '#121B2D', '#8C9AB0'],
    ['klein', 'Klein', 'Drenched', '#1D2BD6', '#F5F4EE', '#F5F4EE', '#121A8C', '#C9CCF2'],
  ].map(([id, name, strategy, ground, ink, accent, panel, muted]) => ({ id, name, strategy, ground, ink, accent, panel, muted }));


  const root = document.documentElement;
  const swatchBox = document.querySelector('.swatches');
  const posterBox = document.getElementById('posters');

  for (const p of PALETTES) {
    const s = document.createElement('button');
    s.className = 'swatch'; s.type = 'button'; s.dataset.id = p.id;
    s.setAttribute('aria-label', p.name);
    s.style.setProperty('--sw-ground', p.ground); s.style.setProperty('--sw-accent', p.accent);
    swatchBox?.append(s);
    if (!posterBox) continue;
    const b = document.createElement('button');
    b.className = 'poster'; b.type = 'button'; b.dataset.id = p.id;
    for (const k of ['ground', 'ink', 'accent', 'panel']) b.style.setProperty(`--p-${k}`, p[k]);
    b.innerHTML = `<i></i><u></u><span><b>${p.name}</b><br><small>${p.strategy} · ${p.ground} ${p.accent}</small></span>`;
    posterBox.append(b);
  }

  window.sloplessPalettes = PALETTES;
  function apply(id) {
    const p = PALETTES.find((x) => x.id === id) || PALETTES[0];
    root.dataset.palette = p.id;
    try { localStorage.setItem('slopless:palette', p.id); } catch {}
    document.querySelectorAll('.swatch,.poster').forEach((el) => el.setAttribute('aria-pressed', String(el.dataset.id === p.id)));
    window.sloplessOnPalette?.(p);
  }
  window.sloplessApply = apply;
  document.addEventListener('click', (e) => {
    const t = e.target.closest('.swatch,.poster');
    if (t) apply(t.dataset.id);
    const c = e.target.closest('.copy');
    if (c) navigator.clipboard?.writeText(c.parentElement.querySelector('code').textContent).then(() => { c.textContent = 'Copied'; setTimeout(() => (c.textContent = 'Copy'), 1400); });
  });
  apply(root.dataset.palette);
})();
