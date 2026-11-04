// Home page: 3D hero scene, the glass lens section and scroll motion.
(() => {
  const root = document.documentElement;
  let scene = null;
  window.sloplessOnPalette = (p) => scene?.setPalette(p);
  const boot = () => {
    scene = window.sloplessScene?.start(document.getElementById('glass')) || null;
    if (scene) { scene.start(); window.sloplessApply(root.dataset.palette); }
  };
  document.fonts.ready.then(() => ('requestIdleCallback' in window ? requestIdleCallback(boot, { timeout: 600 }) : setTimeout(boot, 200)));

  // Lens section: a glass pane that drifts on its own, follows the pointer and answers the arrow keys.
  const stage = document.getElementById('lens-stage');
  if (stage) {
    const W = 50, H = 84, MX = 100 - W, MY = 100 - H, REST_Y = 8;
    const reduce = matchMedia('(prefers-reduced-motion: reduce)');
    const still = () => reduce.matches || root.dataset.motion === 'still';
    const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
    let x = MX / 2, y = REST_Y, tx = x, ty = y, manual = false, inside = false, focused = false, visible = true, raf = 0, idle = 0;
    const paint = () => { stage.style.setProperty('--x', x.toFixed(2)); stage.style.setProperty('--y', y.toFixed(2)); };
    const say = () => { const v = Math.round((tx / MX) * 100); stage.setAttribute('aria-valuenow', v); stage.setAttribute('aria-valuetext', v < 15 ? 'Glass at the left' : v > 85 ? 'Glass at the right' : `Glass ${v} percent across`); };
    const tick = (t) => {
      if (!manual) { const s = t / 1000; tx = MX * (0.5 + 0.5 * Math.sin(s * 0.45)); ty = REST_Y + 4 * Math.sin(s * 0.3 + 1); }
      x += (tx - x) * 0.12; y += (ty - y) * 0.12; paint();
      raf = requestAnimationFrame(tick);
    };
    const sync = () => {
      cancelAnimationFrame(raf); raf = 0;
      if (still() || !visible || document.hidden) return;
      raf = requestAnimationFrame(tick);
    };
    const go = (nx, ny) => { tx = clamp(nx, 0, MX); ty = clamp(ny, 0, MY); manual = true; clearTimeout(idle); say(); if (still()) { x = tx; y = ty; paint(); } };
    const release = () => { clearTimeout(idle); idle = setTimeout(() => { if (!inside && !focused) manual = false; }, 2500); };
    const at = (e) => { const r = stage.getBoundingClientRect(); go(((e.clientX - r.left) / r.width) * 100 - W / 2, ((e.clientY - r.top) / r.height) * 100 - H / 2); };
    stage.addEventListener('pointermove', (e) => { if (e.pointerType === 'mouse' || e.buttons) { inside = true; at(e); } });
    stage.addEventListener('pointerdown', (e) => { inside = true; stage.setPointerCapture?.(e.pointerId); at(e); });
    for (const ev of ['pointerup', 'pointercancel', 'pointerleave']) stage.addEventListener(ev, () => { inside = false; release(); });
    stage.addEventListener('focus', () => { focused = true; });
    stage.addEventListener('blur', () => { focused = false; release(); });
    stage.addEventListener('keydown', (e) => {
      const d = { ArrowLeft: [-5, 0], ArrowRight: [5, 0], ArrowUp: [0, -5], ArrowDown: [0, 5] }[e.key];
      if (d) go(tx + d[0], ty + d[1]);
      else if (e.key === 'Home') go(0, ty);
      else if (e.key === 'End') go(MX, ty);
      else return;
      e.preventDefault();
    });
    new IntersectionObserver(([en]) => { visible = en.isIntersecting; sync(); }).observe(stage);
    document.addEventListener('visibilitychange', sync);
    reduce.addEventListener('change', () => { if (still()) { tx = MX / 2; ty = REST_Y; x = tx; y = ty; paint(); } sync(); });
    if (still()) { paint(); say(); } else sync();
  }

  if (!window.gsap) return;
  gsap.registerPlugin(ScrollTrigger);
  gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
    if (root.dataset.motion === 'still') return; // the visitor chose Still: no entrances, no scrubbed hero
    gsap.from('.hero h1 .line > span', { yPercent: 110, duration: 1.1, ease: 'expo.out', stagger: 0.09, delay: 0.15 });
    gsap.from('.hero .lead, .hero-actions, .swatches', { y: 24, opacity: 0, duration: 0.7, ease: 'power3.out', stagger: 0.06, delay: 0.3 });
    ScrollTrigger.create({ trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true, onUpdate: (s) => scene?.setProgress(s.progress) });
    // Each example wipes from the before to a half-and-half split once as it scrolls in, then the handle is the visitor's.
    document.querySelectorAll('#before-after .cmp input').forEach((range) => {
      const v = { x: 92 };
      range.value = v.x; range.dispatchEvent(new Event('input'));
      const wipe = gsap.to(v, { x: 50, duration: 1.8, ease: 'power2.inOut', paused: true, onUpdate: () => { range.value = Math.round(v.x); range.dispatchEvent(new Event('input')); } });
      ScrollTrigger.create({ trigger: range.closest('.cmp'), start: 'top 70%', once: true, onEnter: () => wipe.play() });
      range.addEventListener('pointerdown', () => wipe.kill(), { once: true });
      range.addEventListener('keydown', () => wipe.kill(), { once: true });
    });
    gsap.from('.steps li', { y: 40, opacity: 0, duration: 0.9, ease: 'power3.out', stagger: 0.1, scrollTrigger: { trigger: '.steps', start: 'top 82%', once: true } });
    gsap.from('.poster', { y: 50, opacity: 0, duration: 0.8, ease: 'power3.out', stagger: 0.05, scrollTrigger: { trigger: '#posters', start: 'top 85%', once: true } });
    gsap.from('.bigname', { yPercent: 40, opacity: 0, duration: 1.4, ease: 'expo.out', scrollTrigger: { trigger: 'footer', start: 'top 70%', once: true } });
  });
})();
