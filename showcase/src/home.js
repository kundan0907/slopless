// Home page: 3D hero scene and scroll motion.
(() => {
  const root = document.documentElement;
  let scene = null;
  window.sloplessOnPalette = (p) => scene?.setPalette(p);
  const boot = () => {
    scene = window.sloplessScene?.start(document.getElementById('glass')) || null;
    if (scene) { scene.start(); window.sloplessApply(root.dataset.palette); }
  };
  document.fonts.ready.then(() => ('requestIdleCallback' in window ? requestIdleCallback(boot, { timeout: 600 }) : setTimeout(boot, 200)));

  if (!window.gsap) return;
  gsap.registerPlugin(ScrollTrigger);
  gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
    gsap.from('.hero h1 .line > span', { yPercent: 110, duration: 1.1, ease: 'expo.out', stagger: 0.09, delay: 0.15 });
    gsap.from('.hero .lead, .hero-actions, .swatches', { y: 24, opacity: 0, duration: 0.7, ease: 'power3.out', stagger: 0.06, delay: 0.3 });
    ScrollTrigger.create({ trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true, onUpdate: (s) => scene?.setProgress(s.progress) });
    // Wipe from the generated version to the decided one once, then hand the handle to the visitor.
    const range = document.querySelector('#before-after .cmp input');
    if (range) {
      const v = { x: Number(range.value) };
      const wipe = gsap.to(v, { x: 8, duration: 1.8, ease: 'power2.inOut', paused: true, onUpdate: () => { range.value = Math.round(v.x); range.dispatchEvent(new Event('input')); } });
      ScrollTrigger.create({ trigger: '#before-after .cmp', start: 'top 60%', once: true, onEnter: () => wipe.play() });
      range.addEventListener('pointerdown', () => wipe.kill(), { once: true });
    }
    gsap.from('.steps li', { y: 40, opacity: 0, duration: 0.9, ease: 'power3.out', stagger: 0.1, scrollTrigger: { trigger: '.steps', start: 'top 82%', once: true } });
    gsap.from('.poster', { y: 50, opacity: 0, duration: 0.8, ease: 'power3.out', stagger: 0.05, scrollTrigger: { trigger: '#posters', start: 'top 85%', once: true } });
    gsap.from('.bigname', { yPercent: 40, opacity: 0, duration: 1.4, ease: 'expo.out', scrollTrigger: { trigger: 'footer', start: 'top 70%', once: true } });
  });
})();
