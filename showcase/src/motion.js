// Shared motion level and live preview. Any [data-level-btn] picks the level; every .mpv scene re-runs in it.
(() => {
  const LEVELS = [['still', 'Still', 'Hover and press only'], ['subtle', 'Subtle', 'Entrances: rise and fade'], ['cinematic', 'Cinematic', 'The ticket travels between scenes'], ['spatial', 'Spatial', '3D tilt and depth']];
  const HINT = { still: 'Hover and press the ticket. Nothing else moves.', subtle: 'Each part rises and fades in once.', cinematic: 'One ticket travels from the queue to the build to the phone.', spatial: 'Move over the scene: layers sit at different depths.' };
  const root = document.documentElement;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
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
    sync(); previews.forEach(run);
    document.dispatchEvent(new CustomEvent('sloplessmotion', { detail: l }));
  }
  function fill(box) {
    box.innerHTML = LEVELS.map(([id, n, d]) => `<button type="button" class="opt" data-level-btn="${id}" aria-pressed="false"><span>${n}</span><small>${d}</small></button>`).join('');
    sync();
  }
  document.addEventListener('click', (e) => { const b = e.target.closest('[data-level-btn]'); if (b) set(b.dataset.levelBtn); });

  function html() {
    return `<div class="mpv-stage"><div class="mpv-world">
      <span class="mpv-zone" style="left:16.67%">Queue</span><span class="mpv-zone" style="left:50%">Build</span><span class="mpv-zone" style="left:83.33%">Phone</span>
      <div class="mpv-slot" style="left:50%"><div class="mpv-card"><b>Build 214</b><small>Checks running</small><div class="bar"><i></i></div></div></div>
      <div class="mpv-slot" style="left:83.33%"><div class="mpv-phone"><div class="mpv-scr"><b class="done">Released</b><small>Phone</small></div></div></div>
      <div class="mpv-slot" style="left:16.67%;z-index:2"><div class="mpv-ticket" tabindex="0"><b>Checkout bug</b><small>Ticket 4821</small></div></div>
    </div></div>
    <div class="mpv-bar"><span class="mpv-hint" aria-live="polite"></span><button class="btn btn-ghost" type="button">Replay</button></div>`;
  }

  function run(p) {
    const q = (s) => p.querySelector(s), g = window.gsap, stage = q('.mpv-stage'), world = q('.mpv-world');
    const [card, phone, ticket] = ['.mpv-card', '.mpv-phone', '.mpv-ticket'].map(q), bar = q('.bar i');
    p.tl?.kill(); p.dataset.level = level; delete p.dataset.done;
    q('.mpv-hint').textContent = HINT[level] + (reduced ? ' (Reduced motion is on, so it stays still.)' : '');
    q('.mpv-bar .btn').hidden = level === 'still' || level === 'spatial';
    if (g) { g.killTweensOf([card, phone, ticket, bar, world]); g.set([card, phone, ticket, world], { clearProps: 'all' }); g.set(bar, { clearProps: 'all' }); }
    const dx = (f) => stage.clientWidth * f;
    if (level === 'spatial') {
      if (g) {
        g.set(world, { rotationY: -10, rotationX: 5 });
        g.set(card, { z: 30 }); g.set(phone, { z: 60 }); g.set(ticket, { z: 100 });
      }
      return;
    }
    if (reduced || !g) { if (level === 'cinematic') { g?.set(ticket, { x: dx(0.6667) }); p.dataset.done = ''; } return; }
    if (level === 'subtle') p.tl = g.from([card, phone, ticket], { y: 24, opacity: 0, duration: 0.6, ease: 'power3.out', stagger: 0.1 });
    if (level === 'cinematic') {
      g.set(bar, { scaleX: 0.15 });
      p.tl = g.timeline()
        .to(ticket, { x: dx(0.3333), duration: 1.1, ease: 'power3.inOut' }, 0.4)
        .to(bar, { scaleX: 1, duration: 0.9, ease: 'power2.inOut' }, 1.0)
        .to(ticket, { x: dx(0.6667), scale: 0.6, duration: 1.1, ease: 'power3.inOut' }, 2.2)
        .add(() => (p.dataset.done = ''), 3.2);
    }
  }

  function mount(p) {
    if (p.dataset.ready) return;
    p.dataset.ready = '1'; p.classList.add('mpv'); p.innerHTML = html(); previews.add(p);
    p.querySelector('.btn').addEventListener('click', () => run(p));
    p.addEventListener('pointermove', (e) => {
      if (level !== 'spatial' || reduced || !window.gsap) return;
      const r = p.querySelector('.mpv-stage').getBoundingClientRect();
      gsap.to(p.querySelector('.mpv-world'), { rotationY: ((e.clientX - r.left) / r.width - 0.5) * 30, rotationX: -((e.clientY - r.top) / r.height - 0.5) * 22, duration: 0.4, ease: 'power2.out', overwrite: 'auto' });
    });
    // Play when first seen, so a scene that mounts offscreen is not wasted.
    const io = new IntersectionObserver(([en]) => { if (en.isIntersecting) { io.disconnect(); run(p); } });
    io.observe(p);
    run(p);
  }
  document.querySelectorAll('[data-levels]').forEach(fill);
  document.querySelectorAll('[data-mpv]').forEach(mount);
  sync();
  window.sloplessMotion = { LEVELS, mount, set, sync, fill, get level() { return level; } };
})();
