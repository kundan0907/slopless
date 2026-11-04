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

  // How it works: the active step drives the stage card, and a line draws from the step to the card.
  const how = document.getElementById('how-flow');
  if (how) {
    const steps = [...how.querySelectorAll('.step')], lis = steps.map((b) => b.closest('li'));
    const stage = document.getElementById('how-stage'), scenes = [...stage.querySelectorAll('.scene')];
    const svg = how.querySelector('.link'), line = svg.querySelector('.link-line'), head = svg.querySelector('.link-head');
    const opts = scenes[1].querySelector('.ask-opts');
    const desk = matchMedia('(min-width: 901px)'), reduce = matchMedia('(prefers-reduced-motion: reduce)');
    const instant = () => reduce.matches || root.dataset.motion === 'still' || !window.gsap;
    let active = 0, tl = null, near = false, raf = 0, lock = 0;
    const place = () => { const host = desk.matches ? how : lis[active]; if (stage.parentElement !== host) host.append(stage); };
    const route = () => {
      svg.toggleAttribute('hidden', !desk.matches); // SVG elements have no .hidden property
      if (!desk.matches) return;
      const a = how.getBoundingClientRect(), b = lis[active].getBoundingClientRect(), c = stage.getBoundingClientRect();
      const x1 = b.right - a.left + 8, y1 = b.top + b.height / 2 - a.top, x2 = c.left - a.left - 12, y2 = c.top + 44 - a.top, dx = Math.max(24, (x2 - x1) * 0.55);
      line.setAttribute('d', `M${x1} ${y1}C${x1 + dx} ${y1} ${x2 - dx} ${y2} ${x2} ${y2}`);
      head.setAttribute('d', `M${x2 + 10} ${y2}l-11 -6.5v13z`);
    };
    const draw = (animate) => {
      route();
      if (!desk.matches) return;
      line.style.strokeDasharray = 'none'; line.style.strokeDashoffset = 0; head.style.opacity = 1;
      if (!animate) return;
      const len = line.getTotalLength();
      line.style.strokeDasharray = len;
      gsap.fromTo(line, { strokeDashoffset: len }, { strokeDashoffset: 0, duration: 0.6, ease: 'power2.out', onComplete: () => { line.style.strokeDasharray = 'none'; } });
      gsap.fromTo(head, { opacity: 0 }, { opacity: 1, duration: 0.2, delay: 0.45 });
    };
    // One authored move per step.
    const q = (i, sel) => scenes[i].querySelectorAll(sel);
    const scene = [
      () => gsap.timeline().from(q(0, '.bubble.me'), { y: 16, scale: 0.96, opacity: 0, duration: 0.5, ease: 'power3.out' }).from(q(0, '.bubble.bot'), { y: 12, opacity: 0, duration: 0.45, ease: 'power3.out' }, '+=0.4'),
      () => { opts.classList.remove('picked'); gsap.set(opts.children, { transition: 'none' }); /* a CSS transition would chase every tween frame */ return gsap.timeline().from(q(1, '.ask-q'), { y: 8, opacity: 0, duration: 0.35 }).from(opts.children, { y: 10, opacity: 0, duration: 0.4, stagger: 0.1, ease: 'power3.out', clearProps: 'opacity,transform,transition' }, '<0.1').call(() => opts.classList.add('picked'), null, '+=0.35'); },
      () => gsap.timeline().from(q(2, '.mini i'), { scale: 0.6, opacity: 0, transformOrigin: '0 50%', duration: 0.35, stagger: 0.12, ease: 'back.out(1.6)' }).from(q(2, '.checks li'), { x: -12, opacity: 0, duration: 0.3, stagger: 0.35 }, '+=0.1').from(q(2, '.checks svg'), { scale: 0, duration: 0.25, stagger: 0.35, ease: 'back.out(2.4)' }, '<0.15'),
      () => gsap.timeline().from(q(3, '.r-row'), { y: 12, opacity: 0, duration: 0.4, stagger: 0.18, ease: 'power3.out' }).fromTo(q(3, '.was'), { '--s': 0 }, { '--s': 1, duration: 0.4 }, '-=0.1').from(q(3, '.arrow'), { scaleX: 0, duration: 0.3 }, '<'),
    ];
    const set = (i, force) => {
      if (i === active && !force) return;
      active = i;
      steps.forEach((b, k) => { b.setAttribute('aria-current', k === i ? 'step' : 'false'); lis[k].classList.toggle('on', k === i); });
      place();
      scenes.forEach((s, k) => { s.hidden = k !== i; });
      tl?.kill();
      if (window.gsap) gsap.set(stage.querySelectorAll('.scene *'), { clearProps: 'all' });
      opts.classList.add('picked');
      const go = !instant();
      if (go) tl = scene[i]();
      draw(go);
    };
    // A click or focus wins over scroll for a moment, so focus scrolling cannot flip the step back.
    const pick = (k) => { lock = performance.now() + 900; set(k); };
    steps.forEach((b, k) => { b.addEventListener('click', () => pick(k)); b.addEventListener('focus', () => pick(k)); });
    how.addEventListener('keydown', (e) => {
      const i = steps.indexOf(document.activeElement), n = { ArrowDown: i + 1, ArrowUp: i - 1 }[e.key];
      if (i < 0 || !steps[n]) return;
      e.preventDefault(); steps[n].focus();
    });
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting && desk.matches && performance.now() > lock) set(lis.indexOf(e.target)); }), { rootMargin: '-42% 0px -42% 0px' });
    lis.forEach((li) => io.observe(li));
    new IntersectionObserver(([e]) => { near = e.isIntersecting; if (near) route(); }, { rootMargin: '200px' }).observe(how);
    addEventListener('scroll', () => { if (near && !raf) raf = requestAnimationFrame(() => { raf = 0; route(); }); }, { passive: true });
    addEventListener('resize', route);
    desk.addEventListener('change', () => { place(); draw(false); });
    place(); document.fonts.ready.then(() => draw(false));
    // First time the section is on screen, play step 1 once.
    new IntersectionObserver(([e], o) => { if (e.isIntersecting) { o.disconnect(); set(active, true); } }, { threshold: 0.25 }).observe(how);
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
    gsap.from('.poster', { y: 50, opacity: 0, duration: 0.8, ease: 'power3.out', stagger: 0.05, scrollTrigger: { trigger: '#posters', start: 'top 85%', once: true } });
    gsap.from('.bigname', { yPercent: 40, opacity: 0, duration: 1.4, ease: 'expo.out', scrollTrigger: { trigger: 'footer', start: 'top 70%', once: true } });
  });
})();
