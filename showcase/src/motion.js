// Shared motion level and live preview. Any [data-level-btn] picks the level; every .mpv scene re-runs in it.
(() => {
  const LEVELS = [['still', 'Still', 'Hover and press only'], ['subtle', 'Subtle', 'Entrances: rise and fade'], ['cinematic', 'Cinematic', 'The ticket travels between scenes'], ['spatial', 'Spatial', '3D tilt and depth']];
  const HINT = { still: 'Hover and press the ticket. Nothing else moves.', subtle: 'Each part rises and fades in once.', cinematic: 'One ticket travels from the queue to the build to the phone.', spatial: 'Move over the scene: layers sit at different depths.' };
  const root = document.documentElement;
  const rm = matchMedia('(prefers-reduced-motion: reduce)');
  const ok = (l) => LEVELS.some((x) => x[0] === l);
  let level = 'cinematic';
  try { const s = localStorage.getItem('slopless:motion'); if (ok(s)) level = s; } catch {}
  root.dataset.motion = level;
  const previews = new Set();

  function sync() {
    document.querySelectorAll('[data-level-btn]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.levelBtn === level)));
  }
  function set(l) {
    if (!ok(l) || l === level) return;
    level = l; root.dataset.motion = l;
    try { localStorage.setItem('slopless:motion', l); } catch {}
    sync(); rerun();
    document.dispatchEvent(new CustomEvent('sloplessmotion', { detail: l }));
  }
  // The toolbox re-renders its panel on every level change; drop previews that left the page.
  function rerun() { previews.forEach((p) => (p.isConnected ? run(p) : previews.delete(p))); }
  function fill(box) {
    box.innerHTML = LEVELS.map(([id, n, d]) => `<button type="button" class="opt" data-level-btn="${id}" aria-pressed="false"><span>${n}</span><small>${d}</small></button>`).join('');
    sync();
  }
  document.addEventListener('click', (e) => { const b = e.target.closest('[data-level-btn]'); if (b) set(b.dataset.levelBtn); });

  function html() {
    return `<div class="mpv-stage"><div class="mpv-world">
      <span class="mpv-zone" style="left:16.67%">Queue</span><span class="mpv-zone" style="left:50%">Build</span><span class="mpv-zone" style="left:83.33%">Phone</span>
      <div class="mpv-slot" style="left:50%;z-index:3"><div class="mpv-card"><b>Build 214</b><small>Checks running</small><div class="bar"><i></i></div></div></div>
      <div class="mpv-slot" style="left:83.33%"><div class="mpv-phone"><div class="mpv-scr"><b class="done">Released</b><small>Phone</small></div></div></div>
      <div class="mpv-slot" style="left:16.67%;z-index:2"><div class="mpv-ticket" tabindex="0"><b>Checkout bug</b><small>Ticket 4821</small></div></div>
    </div></div>
    <div class="mpv-bar"><span class="mpv-hint" aria-live="polite"></span><button class="btn btn-ghost" type="button">Replay</button></div>`;
  }

  function run(p) {
    const q = (s) => p.querySelector(s), g = window.gsap, world = q('.mpv-world');
    const [card, phone, ticket] = ['.mpv-card', '.mpv-phone', '.mpv-ticket'].map(q), bar = q('.bar i'), status = q('.mpv-card small'), reduced = rm.matches;
    p.tl?.kill(); p.tl = null; p.dataset.level = level; delete p.dataset.done; status.textContent = 'Checks running';
    q('.mpv-hint').textContent = HINT[level] + (reduced ? ' (Reduced motion is on, so it stays still.)' : '');
    q('.mpv-bar .btn').hidden = level === 'still' || level === 'spatial' || reduced;
    if (g) { g.killTweensOf([card, phone, ticket, bar, world]); g.set([card, phone, ticket, world], { clearProps: 'all' }); g.set(bar, { clearProps: 'all' }); }
    if (level === 'spatial') {
      if (g) {
        g.set(world, { rotationY: -10, rotationX: 5 });
        g.set(card, { z: 30 }); g.set(phone, { z: 60 }); g.set(ticket, { z: 100 });
      }
      return;
    }
    // Poses first: the ticket docks behind the build card with its whole title showing, then lands on the phone at the phone's width.
    const box = (el) => el.getBoundingClientRect(), t = box(ticket), c = box(card), ph = box(phone), scr = box(q('.mpv-scr')), result = box(q('.mpv-scr .done')), top = box(q('.mpv-stage')).top + 4 - t.top;
    const build = { x: c.left + c.width / 2 - t.left - t.width / 2, y: c.top - (box(q('.mpv-ticket b')).bottom - t.top) - 4 - t.top, scale: 1 };
    const fit = Math.min(1, ph.width / t.width), landTop = Math.min(scr.top + 6, result.top - 6 - t.height * fit); // never covers the phone's result line
    const land = { x: ph.left + ph.width / 2 - t.left - t.width / 2, y: landTop + (t.height * fit) / 2 - t.top - t.height / 2, scale: fit };
    // Without GSAP nothing moves, so the opening poster stays as it is.
    if (reduced || !g) { if (g && level === 'cinematic') { g.set(ticket, land); g.set(bar, { scaleX: 1 }); status.textContent = 'Checks passed'; p.dataset.done = ''; } return; }
    // Every tween stays under 300ms; the story takes longer through the holds between beats.
    if (level === 'subtle') { const parts = [card, phone, ticket]; p.tl = g.timeline().from(parts, { y: 20, opacity: 0, duration: 0.2, ease: 'power3.out', stagger: 0.03 }).from(parts, { x: -10, duration: 0.2, ease: 'sine.inOut', stagger: 0.03 }, 0); }
    if (level === 'cinematic') {
      // A quadratic curve through a lifted control point: easing a straight tween changes its speed, not its path.
      const arc = (from, to) => {
        const o = { k: 0 }, cx = (from.x + to.x) / 2, cy = Math.max(top, Math.min(from.y, to.y) - Math.abs(to.x - from.x) * 0.3); // the lift stops at the stage edge
        return g.to(o, { k: 1, duration: 0.28, ease: 'power2.inOut', onUpdate: () => { const u = 1 - o.k; g.set(ticket, { x: u * u * from.x + 2 * u * o.k * cx + o.k * o.k * to.x, y: u * u * from.y + 2 * u * o.k * cy + o.k * o.k * to.y, scale: from.scale + (to.scale - from.scale) * o.k }); } });
      };
      g.set(bar, { scaleX: 0.15 });
      p.tl = g.timeline()
        .add(arc({ x: 0, y: 0, scale: 1 }, build), 0.5)
        .to(bar, { scaleX: 0.6, duration: 0.28, ease: 'power2.out' }, '>0.35')
        .to(bar, { scaleX: 1, duration: 0.28, ease: 'power2.out' }, '>0.25')
        .add(() => (status.textContent = 'Checks passed'))
        .add(arc(build, land), '>0.6')
        .add(() => (p.dataset.done = ''));
    }
  }

  function mount(p) {
    if (p.dataset.ready) return;
    p.dataset.ready = '1'; p.classList.add('mpv'); p.innerHTML = html(); previews.add(p);
    p.querySelector('.btn').addEventListener('click', () => run(p));
    p.addEventListener('pointermove', (e) => {
      if (level !== 'spatial' || rm.matches || !window.gsap) return;
      const r = p.querySelector('.mpv-stage').getBoundingClientRect();
      gsap.to(p.querySelector('.mpv-world'), { rotationY: ((e.clientX - r.left) / r.width - 0.5) * 30, rotationX: -((e.clientY - r.top) / r.height - 0.5) * 22, duration: 0.2, ease: 'power2.out', overwrite: 'auto' });
    });
    // Play when first seen, so a scene that mounts offscreen is not wasted.
    // Poses are measured in pixels, so a resized stage replays from fresh measurements.
    let w = 0; new ResizeObserver(([e]) => { const n = e.contentRect.width; if (!n) return; if (w && n !== w) run(p); w = n; }).observe(p.querySelector('.mpv-stage'));
    const io = new IntersectionObserver(([en]) => { if (en.isIntersecting) { io.disconnect(); run(p); } });
    io.observe(p);
    run(p);
  }
  document.querySelectorAll('[data-levels]').forEach(fill);
  document.querySelectorAll('[data-mpv]').forEach(mount);
  sync();
  rm.addEventListener('change', rerun);
  window.sloplessMotion = { LEVELS, mount, set, sync, fill, get level() { return level; } };
})();
