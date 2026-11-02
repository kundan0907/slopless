// Explore-page tools: scanner, interview simulator, modes explorer, knowledge-base filter.
import { scan } from '../../slopless/scripts/slop-scan.mjs';

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const PAL = () => window.sloplessPalettes || [];

/* ---------- Live scanner ---------- */
// slopless-ignore-start: deliberately sloppy sample the scanner is meant to catch
const LT = String.fromCharCode(60); // keeps a literal style tag out of this page's own scan
const SAMPLE = `${LT}style>
.hero{background:linear-gradient(135deg,#7c3aed,#2563eb);text-align:center;font-family:Inter,sans-serif}
.kicker{text-transform:uppercase;letter-spacing:.2em;font-size:12px}
h1{background:linear-gradient(90deg,#a78bfa,#38bdf8);-webkit-background-clip:text;color:transparent}
.btn{box-shadow:0 0 40px #a78bfa;transition:transform .4s cubic-bezier(.34,1.56,.64,1)}
${LT}/style>
<section class="hero">
  <p class="kicker">New · Introducing</p>
  <h1>\u{1F680} Unlock seamless workflows ✨</h1>
  <p>The all-in-one platform that empowers your team to do more.</p>
  <a class="btn">Get started</a>
</section>`;
// slopless-ignore-end
{
  const ta = $('#scan-in'), out = $('#scan-out'), ext = $('#scan-ext');
  const run = () => {
    const found = scan(ta.value, ext.value);
    const f = found.filter((x) => x.level === 'FAIL').length, w = found.length - f;
    const lines = found.map((x) => `<span class="${x.level === 'FAIL' ? 'f' : 'w'}">${x.level.padEnd(4)}</span> snippet${ext.value}  [${esc(x.rule)}] ${esc(x.msg)}`);
    lines.push('', `<span class="${f ? 'f' : 'ok'}">1 file(s): ${f} FAIL, ${w} WARN${f ? '' : ' - clean of banned tells'}</span>`);
    out.innerHTML = lines.join('\n');
    $('#scan-status').textContent = `${f} fail, ${w} warn`;
  };
  ta.value = SAMPLE;
  $('#scan-run').addEventListener('click', run);
  $('#scan-sample').addEventListener('click', () => { ta.value = SAMPLE; ext.value = '.html'; run(); });
  $('#scan-clear').addEventListener('click', () => { ta.value = ''; ta.focus(); out.textContent = 'Paste HTML, CSS or copy, then press Scan.'; $('#scan-status').textContent = ''; });
  ext.addEventListener('change', run);
  ta.addEventListener('keydown', (e) => { if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') run(); });
  run();
}

/* ---------- Interview simulator ---------- */
{
  const Q = [
    { id: 'what', round: 1, q: 'What is it?', opts: [
      ['Talk with a presenter', 'deck, 15 minutes, presenter-paced', 'a talk'], ['Scrolling page', 'web, one page, scrolling', 'a landing page'],
      ['Portfolio', 'web, portfolio, scrolling', 'a portfolio'], ['App screen or flow', 'app, one flow, 390x844', 'an app flow'], ['Graphic', 'graphic, a set of posts, exact pixel size', 'a graphic set']], rec: 1 },
    { id: 'aud', round: 1, q: 'Who sees it?', opts: [['My team'], ['Customers'], ['Hiring managers'], ['A conference room']], rec: 0 },
    { id: 'line', round: 1, q: 'The one sentence.', text: true },
    { id: 'hero', round: 1, q: 'The hero object: the one thing that travels through the story.', opts: [['A ticket'], ['A message'], ['A device'], ["A person's day"], ['A product'], ['A number']], rec: 0 },
    { id: 'mood', round: 2, q: 'Mood', opts: [['Bold and loud'], ['Calm and editorial'], ['Dark and cinematic'], ['Light and airy'], ['Technical']], rec: 2 },
    { id: 'motion', round: 2, q: 'Motion', opts: [['Still', 'hover and press feedback only'], ['Subtle', 'entrances, gentle parallax'], ['Cinematic', 'connected scenes, scrubbed timelines'], ['Spatial 3D', 'real 3D, shaders']], rec: 2 },
    { id: 'mat', round: 2, q: 'Material', opts: [['Flat ink'], ['Paper / matte'], ['Frosted glass'], ['Atmosphere'], ['Blueprint lines'], ['Photography-led']], rec: 1 },
    { id: 'pal', round: 2, q: 'Palette (applies to this page)', palette: true },
  ];
  const A = { aud: 'My team', claim: 'the checkout bug could be fixed the same day', proof: 'we followed one ticket from report to release', pal: 'obsidian' };
  let i = 0;
  const box = $('#iv'), prog = $('#iv-prog');
  const lum = (hex) => { const [r, g, b] = [1, 3, 5].map((k) => parseInt(hex.slice(k, k + 2), 16) / 255); return 0.2126 * r + 0.7152 * g + 0.0722 * b; };
  const val = (id) => A[id] ?? '';

  function render() {
    if (i >= Q.length) return done();
    const q = Q[i];
    prog.textContent = `Round ${q.round} of 2, question ${i + 1} of ${Q.length}`;
    let body = '';
    if (q.text) {
      body = `<label class="fld">After this, <input id="iv-aud" value="${esc(A.aud)}" aria-label="Audience"> believes<br><textarea id="iv-claim" rows="2" aria-label="Claim">${esc(A.claim)}</textarea>because<br><textarea id="iv-proof" rows="2" aria-label="Proof">${esc(A.proof)}</textarea></label><div class="iv-nav"><button class="btn btn-primary" type="button" data-next>Next</button></div>`;
    } else if (q.palette) {
      body = `<div class="iv-pal" role="group" aria-label="Palette">${PAL().map((p) => `<button type="button" class="ivp" data-pal="${p.id}" aria-pressed="${A.pal === p.id}" style="--p-ground:${p.ground};--p-accent:${p.accent};--p-ink:${p.ink}"><i></i><span>${esc(p.name)}</span></button>`).join('')}</div>`;
    } else {
      body = `<div class="opts iv-opts">${q.opts.map((o, k) => `<button type="button" class="opt${A[q.id] === o[0] ? ' pick' : ''}" data-k="${k}"><span>${esc(o[0])}</span><small>${esc(o[1] && q.id === 'motion' ? o[1] : k === q.rec ? 'recommended' : '')}</small></button>`).join('')}</div>`;
    }
    box.innerHTML = `<h3 class="q">${esc(q.q)}</h3>${body}<div class="iv-nav">${i ? '<button class="btn btn-ghost" type="button" data-back>Back</button>' : ''}</div>`;
    box.querySelector('button, input')?.focus({ preventScroll: true });
  }
  function done() {
    const w = Q[0].opts.find((o) => o[0] === A.what) || Q[0].opts[1];
    const p = PAL().find((x) => x.id === A.pal) || PAL()[0];
    const tone = lum(p.ground) > 0.5 ? 'light' : 'dark';
    const story = `After this, ${val('aud').toLowerCase()} believes ${val('claim')} because ${val('proof')}.`;
    const lines = [
      ['Story', story], ['Format', w[1]], ['Hero', `${A.hero.toLowerCase()} that travels through every part`],
      ['Taste', `${p.name}, ${A.mat.toLowerCase()}, ${A.motion.toLowerCase()} motion, ${tone}, mood: ${A.mood.toLowerCase()}`],
      ['Authority', 'your own material. Must not change: facts and numbers you give me'],
    ];
    const prompt = `Use slopless. I'm making ${w[2]}. ${story.replace(/^After this, /, 'After this, ')} Hero object: ${A.hero.toLowerCase()}. Taste: ${p.name}, ${A.mat.toLowerCase()}, ${A.motion.toLowerCase()} motion, ${A.mood.toLowerCase()}. Keep my facts and numbers exactly as given.`;
    prog.textContent = 'Playback';
    box.innerHTML = `<h3 class="q">Playback. Say yes and the build starts.</h3><dl class="play">${lines.map(([k, v]) => `<div><dt>${k}</dt><dd>${esc(v)}</dd></div>`).join('')}</dl>
      <div class="cmdbox"><pre><code class="cp-src" id="iv-prompt">${esc(prompt)}</code></pre><button class="cp" type="button">Copy prompt</button></div>
      <div class="iv-nav"><button class="btn btn-ghost" type="button" data-back>Back</button><button class="btn btn-ghost" type="button" data-restart>Start over</button></div>`;
  }
  box.addEventListener('click', (e) => {
    const q = Q[i];
    const o = e.target.closest('.opt'), pal = e.target.closest('[data-pal]');
    if (e.target.closest('[data-back]')) { i = Math.max(0, i - 1); render(); return; }
    if (e.target.closest('[data-restart]')) { i = 0; render(); return; }
    if (e.target.closest('[data-next]')) { A.aud = $('#iv-aud').value.trim() || A.aud; A.claim = $('#iv-claim').value.trim() || A.claim; A.proof = $('#iv-proof').value.trim() || A.proof; i++; render(); return; }
    if (o && q) { A[q.id] = q.opts[+o.dataset.k][0]; i++; render(); return; }
    if (pal) { A.pal = pal.dataset.pal; window.sloplessApply?.(A.pal); i++; render(); }
  });
  A.what = Q[0].opts[1][0]; A.hero = 'A ticket'; A.mood = 'Dark and cinematic'; A.motion = 'Cinematic'; A.mat = 'Paper / matte';
  render();
}

/* ---------- Modes explorer ---------- */
{
  const M = {
    surfaces: { label: 'Surfaces', items: {
      deck: { n: 'Deck', does: 'Builds beats, not slides. One master timeline, the presenter owns the pace, and a stage object carries the story across chapters.', when: 'A talk, demo deck, keynote or interactive explainer.', p: "Use slopless. I'm giving a 15-minute talk to our platform team on how we cut release time. Here's my outline.", loads: ['surfaces/deck.md', 'interview.md', 'motion.md'] },
      web: { n: 'Web', does: 'The first screen says what it is in large type. Sections follow claim to proof, and the idea reaches the footer.', when: 'A landing page, product page, portfolio or one-pager.', p: 'Use slopless to redesign this landing page. Keep every word. It looks like every other AI site.', loads: ['surfaces/web.md', 'layout.md', 'type.md'] },
      app: { n: 'App', does: 'Platform fit first: iOS, Android or React Native conventions, every list state, designed dark mode, 44pt or 48dp targets.', when: 'An app screen, mobile flow or dashboard.', p: 'Use slopless on this onboarding screen for iOS. 390 by 844, dark and light, add empty and error states.', loads: ['surfaces/app.md', 'craft-floor.md'] },
      graphic: { n: 'Graphic', does: 'One message readable in two seconds. Built in HTML or SVG at exact pixel size, then exported.', when: 'A social post, poster, slide image, brand board or thumbnail.', p: 'slopless, three Instagram posts announcing our beta, Porcelain Cobalt, 1080 by 1350.', loads: ['surfaces/graphic.md', 'palettes.md'] },
    } },
    review: { label: 'Review modes', items: {
      review: { n: 'Review', does: 'Scan, screenshot, then ten scored passes. Reports a score, a verdict, the top three problems and what was not verified.', when: 'Review, audit, "why does this look AI", or polishing something that exists.', p: 'Use slopless to review this screen. Why does it look generated?', loads: ['review.md', 'tells.md'] },
      bolder: { n: 'Bolder', does: 'For safe and bland work: bigger scale contrast, a committed colour field, one signature move.', when: 'You say it is bland, safe or forgettable.', p: 'Use slopless: make this hero bolder.', loads: ['review.md', 'direction.md'] },
      quieter: { n: 'Quieter', does: 'For loud work: remove effects, drop to one accent, keep one motion moment, add space.', when: 'You say it is loud, busy or too much.', p: 'Use slopless: make this page quieter.', loads: ['review.md', 'motion.md'] },
      distill: { n: 'Distill', does: 'For cluttered work: cut sections without a claim, merge beats, one idea per view.', when: 'You say it is cluttered or too long.', p: 'Use slopless to distill this deck. One idea per slide.', loads: ['review.md', 'layout.md'] },
      harden: { n: 'Harden', does: 'For production: empty, error and loading states, long text, i18n, slow network, keyboard.', when: 'You are about to ship.', p: 'Use slopless to harden this checkout screen.', loads: ['review.md', 'craft-floor.md'] },
    } },
    motion: { label: 'Motion levels', items: {
      still: { n: 'Still', does: 'Hover, press and focus feedback only. A thing that needs animation to look finished is not finished.', when: 'You pick it in round 2 of the interview.', p: 'Use slopless on this dashboard. Still motion, feedback only.', loads: ['motion.md'], demo: 'still' },
      subtle: { n: 'Subtle', does: 'Entrances once per section, 60 to 90 ms stagger, 16 to 32 px rise with opacity, gentle parallax.', when: 'You pick it in round 2 of the interview.', p: 'Use slopless on this portfolio. Subtle motion.', loads: ['motion.md'], demo: 'subtle' },
      cinematic: { n: 'Cinematic', does: 'Scenes connect. The same object travels from one beat to the next on scrubbed, pinned timelines.', when: 'You pick it in round 2 of the interview.', p: 'Use slopless for the demo deck. Cinematic: the ticket travels between slides.', loads: ['motion.md', 'surfaces/deck.md'], demo: 'cinematic' },
      spatial: { n: 'Spatial', does: 'Real 3D objects and shader backgrounds, with depth and lighting that respond to angle. Starts after load, pauses offscreen.', when: 'You pick it in round 2 of the interview.', p: 'Use slopless for the launch page. Spatial 3D, a glass slab hero.', loads: ['motion.md'], demo: 'spatial' },
    } },
    agents: { label: 'Agents mode', items: {
      agents: { n: 'Agents', does: 'Off by default. On a big job it is offered once; you choose one to four helpers. Mechanical work runs on cheaper models.', when: 'The job is about 12+ slides, 6+ sections or several surfaces, and you say yes.', p: 'Use slopless in agents mode with three helpers. Rebuild the deck in the Sapphire Glass direction.', loads: ['agents.md', 'brief.md'] },
    } },
    memory: { label: 'Taste memory', items: {
      memory: { n: 'Taste memory', does: 'Reads your taste file and the project DESIGN.md first. Writes one dated line whenever you correct or praise the look.', when: 'Every run reads it; corrections, praise and palette picks write to it.', p: 'Remember for slopless: I reject decorative colour bars and I want two live studies before a full build.', loads: ['memory.md'] },
    } },
  };
  const tabs = $('#mode-tabs'), sub = $('#mode-sub'), panel = $('#mode-panel');
  let g = 'surfaces', k = 'deck';
  const renderTabs = () => {
    tabs.innerHTML = Object.entries(M).map(([id, v]) => `<button role="tab" type="button" id="mt-${id}" aria-selected="${id === g}" aria-controls="mode-panel" tabindex="${id === g ? 0 : -1}" data-g="${id}">${v.label}</button>`).join('');
    const items = Object.entries(M[g].items);
    sub.hidden = items.length < 2;
    sub.innerHTML = items.map(([id, v]) => `<button type="button" data-k="${id}" aria-pressed="${id === k}">${v.n}</button>`).join('');
  };
  const BASE = 'https://github.com/kundan0907/slopless/blob/main/slopless/references/';
  const renderPanel = () => {
    const m = M[g].items[k];
    panel.setAttribute('aria-labelledby', `mt-${g}`);
    panel.innerHTML = `<div class="mode-copy"><h3>${esc(m.n)}</h3><p>${esc(m.does)}</p><dl class="facts"><div><dt>Triggers</dt><dd>${esc(m.when)}</dd></div><div><dt>Loads</dt><dd class="files">${['SKILL.md'].concat(m.loads).map((f) => `<a href="${f === 'SKILL.md' ? BASE.replace('references/', '') + f : BASE + f}" target="_blank" rel="noopener">${f}</a>`).join('')}</dd></div></dl>
      <div class="cmdbox"><pre><code class="cp-src">${esc(m.p)}</code></pre><button class="cp" type="button">Copy prompt</button></div></div>${m.demo ? '<div class="mdemo-wrap"><div class="mdemo" id="mdemo" data-level="" aria-label="Live demo"><span class="zone z1">Queue</span><span class="zone z2">Machine</span><span class="zone z3">Phone</span><div class="mo" id="mo" tabindex="0"><b>Checkout fails on saved cards</b><small>Ticket 4821</small><i></i></div></div><div class="mdemo-bar"><span id="mdemo-hint"></span><button class="btn btn-ghost" id="mdemo-replay" type="button">Replay</button></div></div>' : ''}`;
    if (m.demo) demo(m.demo);
  };
  function demo(level) {
    const stage = $('#mdemo'), mo = $('#mo'), hint = $('#mdemo-hint'), btn = $('#mdemo-replay');
    stage.dataset.level = level;
    const HINT = { still: 'Hover and press the card. Nothing else moves.', subtle: 'Entrance once: rise and fade, staggered.', cinematic: 'One object travels through three scenes.', spatial: 'Move over the slab: depth responds to the pointer.' };
    hint.textContent = HINT[level];
    const g = window.gsap;
    const play = () => {
      if (!g || reduced) return;
      g.killTweensOf([mo, ...mo.children]); g.set(mo, { clearProps: 'all' }); g.set(mo.children, { clearProps: 'all' });
      if (level === 'subtle') g.from([mo, ...mo.children], { y: 24, opacity: 0, duration: 0.6, ease: 'power3.out', stagger: 0.08 });
      if (level === 'cinematic') {
        const zs = $$('.zone', stage).map((z) => z.offsetLeft + z.offsetWidth / 2 - mo.offsetWidth / 2 - mo.offsetLeft);
        g.timeline().fromTo(mo, { x: zs[0] }, { x: zs[0], duration: 0.01 }).to(mo, { x: zs[1], duration: 1.1, ease: 'power3.inOut' }, '+=0.3').to(mo, { x: zs[2], scale: 0.7, rotate: -4, duration: 1.2, ease: 'power3.inOut' }, '+=0.5');
      }
    };
    btn.hidden = level === 'still' || level === 'spatial';
    if (level === 'cinematic') {
      const place = () => { const z = $('.z1', stage); mo.style.left = z.offsetLeft + z.offsetWidth / 2 - mo.offsetWidth / 2 + 'px'; };
      place();
      if (reduced) { const z = $('.z3', stage); mo.style.left = z.offsetLeft + z.offsetWidth / 2 - mo.offsetWidth / 2 + 'px'; }
    }
    if (level === 'spatial') {
      const tilt = (e) => { const r = stage.getBoundingClientRect(); const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5; mo.style.transform = `rotateY(${x * 40}deg) rotateX(${-y * 30}deg)`; };
      if (!reduced) { stage.addEventListener('pointermove', tilt); stage.addEventListener('pointerleave', () => (mo.style.transform = '')); }
      mo.style.transform = 'rotateY(-18deg) rotateX(8deg)';
    }
    btn.onclick = play; play();
  }
  const show = () => { renderTabs(); renderPanel(); };
  tabs.addEventListener('click', (e) => { const b = e.target.closest('[data-g]'); if (!b) return; g = b.dataset.g; k = Object.keys(M[g].items)[0]; show(); b.ownerDocument.getElementById('mt-' + g).focus(); });
  tabs.addEventListener('keydown', (e) => {
    const ids = Object.keys(M), n = ids.indexOf(g);
    const d = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
    if (!d) return;
    g = ids[(n + d + ids.length) % ids.length]; k = Object.keys(M[g].items)[0]; show(); $('#mt-' + g).focus(); e.preventDefault();
  });
  sub.addEventListener('click', (e) => { const b = e.target.closest('[data-k]'); if (!b) return; k = b.dataset.k; renderTabs(); renderPanel(); $(`[data-k="${k}"]`, sub).focus(); });
  show();
}

/* ---------- Knowledge base filter ---------- */
{
  const q = $('#kbq'), rows = $$('[data-kb]'), groups = $$('.kb-group'), status = $('#kb-status');
  q.addEventListener('input', () => {
    const t = q.value.trim().toLowerCase(); let n = 0;
    rows.forEach((r) => { const hit = !t || r.textContent.toLowerCase().includes(t); r.hidden = !hit; if (hit) n++; });
    groups.forEach((gr) => (gr.hidden = !$$('[data-kb]:not([hidden])', gr).length));
    status.textContent = t ? `${n} of ${rows.length} files` : '';
  });
}
