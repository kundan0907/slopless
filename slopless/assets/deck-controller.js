// Optional standalone deck controller. Inline after markup; all content remains visible without JavaScript.
(() => {
  const deck = document.querySelector('[data-deck]');
  if (!deck) return;
  const slides = [...deck.querySelectorAll('.slide')];
  if (!slides.length) return;
  const displays = slides.map((el) => el.style.display);
  const marked = slides.map((el) => [...el.querySelectorAll('[data-b]')]);
  const beats = marked.map((items) => Math.max(0, ...items.map((el) => +el.dataset.b || 0)));
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  const motions = new Set();
  let slide = 0, beat = 0, generation = 0;
  const clamp = (n, max) => Math.max(0, Math.min(max, Number.isFinite(n) ? n : 0));

  function go(nextSlide, nextBeat = 0, animate = true) {
    const token = ++generation;
    const oldSlide = slide;
    deck.dataset.sloplessReady = 'false';
    motions.forEach((a) => a.cancel()); motions.clear();
    slide = clamp(nextSlide, slides.length - 1);
    beat = clamp(nextBeat, beats[slide]);
    slides.forEach((el, i) => {
      el.hidden = i !== slide;
      el.style.display = i === slide ? displays[i] : 'none';
      marked[i].forEach((item) => {
        const wasVisible = oldSlide === slide && item.style.visibility === 'visible';
        let visible = i === slide && (+item.dataset.b || 0) <= beat;
        for (let parent = item.parentElement; parent && parent !== el; parent = parent.parentElement) {
          if (parent.hasAttribute('data-b') && (+parent.dataset.b || 0) > beat) visible = false;
        }
        item.style.visibility = visible ? 'visible' : 'hidden';
        item.inert = !visible;
        if (visible && !wasVisible && animate && !reduce.matches && item.animate) {
          const a = item.animate([{ opacity: 0, transform: 'translateY(12px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 260, easing: 'cubic-bezier(.22,1,.36,1)' });
          motions.add(a);
        }
      });
    });
    deck.dataset.sloplessBeat = `${slide + 1}:${beat}`;
    history.replaceState(null, '', `#${slide + 1}`);
    if (!motions.size) deck.dataset.sloplessReady = 'true';
    else Promise.all([...motions].map((a) => a.finished.catch(() => {}))).then(() => {
      if (token === generation) { motions.clear(); deck.dataset.sloplessReady = 'true'; }
    });
  }
  const next = () => beat < beats[slide] ? go(slide, beat + 1) : slide < slides.length - 1 && go(slide + 1);
  const previous = () => beat > 0 ? go(slide, beat - 1) : slide > 0 && go(slide - 1, beats[slide - 1]);
  const interactive = (el) => el.isContentEditable || el.closest('a,button,input,textarea,select,summary,[role="button"],[role="slider"]');
  document.addEventListener('keydown', (e) => {
    if (e.altKey || e.ctrlKey || e.metaKey || e.target.isContentEditable || e.target.closest('input,textarea,select,[role="slider"]')) return;
    if (e.key === ' ' && interactive(e.target)) return;
    if (['ArrowRight', 'PageDown', ' '].includes(e.key)) { e.preventDefault(); next(); }
    else if (['ArrowLeft', 'PageUp'].includes(e.key)) { e.preventDefault(); previous(); }
    else if (e.key === 'Home') { e.preventDefault(); go(0); }
    else if (e.key === 'End') { e.preventDefault(); go(slides.length - 1, beats.at(-1)); }
  });
  document.addEventListener('click', (e) => {
    if (e.target.closest('[data-deck-next]')) next();
    else if (e.target.closest('[data-deck-prev]')) previous();
    else if (deck.hasAttribute('data-click-advance') && deck.contains(e.target) && !interactive(e.target) && !getSelection()?.toString()) next();
  });
  addEventListener('hashchange', () => go(parseInt(location.hash.slice(1), 10) - 1));
  reduce.addEventListener('change', () => go(slide, beat, false));
  // Printing exposes every beat without changing the presenter's saved position.
  addEventListener('beforeprint', () => {
    motions.forEach((a) => a.cancel()); motions.clear();
    slides.forEach((el, i) => { el.hidden = false; el.style.display = displays[i]; marked[i].forEach((item) => { item.style.visibility = 'visible'; item.inert = false; }); });
  });
  addEventListener('afterprint', () => go(slide, beat, false));
  go(parseInt(location.hash.slice(1), 10) - 1, 0, false);
})();
