// Explore-page tools: interview simulator, agent-reads switcher, modes explorer, knowledge-base filter.

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
const PAL = () => window.sloplessPalettes || [];

/* ---------- Interview simulator ---------- */
{
  // [label, phrase used in the prompt, note]
  const Q = [
    { id: 'what', part: 1, q: 'What are you making?', opts: [
      ['A talk or demo deck', 'a talk deck, about 15 minutes, paced by the presenter', 'a talk deck'], ['A landing page', 'a scrolling landing page', 'a landing page'],
      ['A portfolio', 'a scrolling portfolio site', 'a portfolio site'], ['An app screen or flow', 'a mobile app flow at 390 by 844', 'an app flow'], ['Social posts or a poster', 'a set of graphics at exact pixel size', 'a set of graphics']], rec: 1 },
    { id: 'aud', part: 1, q: 'Who will look at it?', opts: [['My team', 'my team'], ['Customers', 'customers'], ['Hiring managers', 'hiring managers'], ['A room full of people', 'a room full of people']], rec: 1 },
    { id: 'line', part: 1, q: 'What should they remember afterwards?', text: true },
    { id: 'hero', part: 1, q: 'Should one thing run through the whole story?', opts: [['A ticket', 'one ticket'], ['A message', 'one message'], ['A device', 'one device'], ["A person's day", "one person's day"], ['A product', 'one product'], ['Nothing in particular', '']], rec: 0 },
    { id: 'mood', part: 2, q: 'What mood?', opts: [['Bold and loud', 'bold and loud'], ['Calm and editorial', 'calm and editorial'], ['Dark and moody', 'dark and moody'], ['Light and airy', 'light and airy'], ['Technical', 'technical']], rec: 2 },
    { id: 'motion', part: 2, q: 'How much should it move?', motion: true },
    { id: 'mat', part: 2, q: 'What should it feel like?', opts: [['Flat ink', 'flat ink'], ['Paper and matte', 'paper and matte'], ['Frosted glass', 'frosted glass'], ['Atmospheric', 'atmospheric'], ['Blueprint lines', 'blueprint lines'], ['Photography-led', 'photography-led']], rec: 1 },
    { id: 'pal', part: 2, q: 'Pick a palette', palette: true },
  ];
  const A = { what: 1, aud: 1, line: '', hero: 0, mood: 2, mat: 1, pal: document.documentElement.dataset.palette || 'obsidian' };
  let i = 0;
  const box = $('#iv'), prog = $('#iv-prog');
  const back = () => (i ? '<button class="btn btn-ghost" type="button" data-back>Back</button>' : '');

  function render() {
    if (i >= Q.length) return done();
    const q = Q[i];
    prog.textContent = `Part ${q.part} of 2: question ${i + 1} of ${Q.length}`;
    let body = '';
    if (q.text) {
      body = `<label class="fld"><span class="cap">One short sentence. Leave it blank and your agent will ask you.</span><input id="iv-line" value="${esc(A.line)}" placeholder="For example: a checkout bug can be fixed in a day" maxlength="140" autocomplete="off"></label><div class="iv-nav"><button class="btn btn-primary" type="button" data-next>${A.line ? 'Next' : 'Skip for now'}</button>${back()}</div>`;
    } else if (q.motion) {
      body = `<div class="levels" role="group" aria-label="Motion level" data-levels></div><div data-mpv></div><div class="iv-nav"><button class="btn btn-primary" type="button" data-next>Next</button>${back()}</div>`;
    } else if (q.palette) {
      body = `<div class="iv-pal" role="group" aria-label="Palette">${PAL().map((p) => `<button type="button" class="ivp" data-pal="${p.id}" aria-pressed="${A.pal === p.id}" style="--p-ground:${p.ground};--p-accent:${p.accent};--p-ink:${p.ink}"><i></i><span>${esc(p.name)}</span></button>`).join('')}</div><div class="iv-nav">${back()}</div>`;
    } else {
      body = `<div class="opts iv-opts">${q.opts.map((o, k) => `<button type="button" class="opt" data-k="${k}" aria-pressed="${A[q.id] === k}"><span>${esc(o[0])}</span><small>${k === q.rec ? 'suggested' : ''}</small></button>`).join('')}</div><div class="iv-nav">${back()}</div>`;
    }
    box.innerHTML = `<h3 class="q">${esc(q.q)}</h3>${body}`;
    if (q.motion) { const m = window.sloplessMotion; m.fill($('[data-levels]', box)); m.mount($('[data-mpv]', box)); }
    else box.querySelector('button, input')?.focus({ preventScroll: true });
  }
  function done() {
    const pick = (id) => Q.find((x) => x.id === id).opts[A[id]];
    const w = pick('what'), aud = pick('aud'), hero = pick('hero'), mood = pick('mood'), mat = pick('mat');
    const p = PAL().find((x) => x.id === A.pal) || PAL()[0];
    const motion = window.sloplessMotion.LEVELS.find((l) => l[0] === window.sloplessMotion.level)[1].toLowerCase();
    const prompt = [
      `Use slopless. I'm making ${w[2]} for ${aud[1]}.`,
      A.line ? `The one thing they should remember: "${A.line}".` : '',
      hero[1] ? `Follow ${hero[1]} through every part.` : '',
      `Look and feel: the ${p.name} palette, ${mood[1]}, ${mat[1]}, ${motion} motion.`,
      'Keep my facts and numbers exactly as I give them.',
    ].filter(Boolean).join(' ');
    const rows = [['Making', w[1]], ['For', aud[0]], ['Remember', A.line || 'not set, your agent will ask'], ['Follows', hero[0]], ['Look', `${p.name}, ${mood[0].toLowerCase()}, ${mat[0].toLowerCase()}`], ['Motion', motion]];
    prog.textContent = 'Done';
    box.innerHTML = `<h3 class="q">Here is the prompt to paste into your agent.</h3>
      <div class="cmdbox"><pre><code class="cp-src" id="iv-prompt">${esc(prompt)}</code></pre><button class="cp" type="button">Copy prompt</button></div>
      <p class="cap">What it captured</p>
      <dl class="play">${rows.map(([k, v]) => `<div><dt>${k}</dt><dd>${esc(v)}</dd></div>`).join('')}</dl>
      <div class="iv-nav"><button class="btn btn-ghost" type="button" data-back>Back</button><button class="btn btn-ghost" type="button" data-restart>Start over</button></div>`;
  }
  box.addEventListener('click', (e) => {
    const q = Q[i];
    if (e.target.closest('[data-back]')) { i = Math.max(0, i - 1); render(); return; }
    if (e.target.closest('[data-restart]')) { i = 0; render(); return; }
    if (e.target.closest('[data-next]')) { if (q.text) A.line = $('#iv-line').value.trim(); i++; render(); return; }
    const o = e.target.closest('.opt[data-k]'), pal = e.target.closest('[data-pal]');
    if (o && q) { A[q.id] = +o.dataset.k; i++; render(); return; }
    if (pal) { A.pal = pal.dataset.pal; window.sloplessApply?.(A.pal); i++; render(); }
  });
  render();
}

/* ---------- Modes explorer ---------- */
{
  const M = {
    routes: { label: 'Run modes', items: {
      quick: { n: 'Quick', does: 'Makes a clear visual upgrade to hierarchy, composition, readability or interaction. Preserves content and controls, compares before and after, then verifies one repair batch.', when: 'Improve, polish, restyle or make a fast V2 of an existing artifact.', p: 'Use slopless quick. Improve this deck into V2. Keep every word, number and working control.', loads: ['quick.md'] },
      standard: { n: 'Standard', does: 'Resolves missing decisions, renders the opening and densest view early, then builds and verifies.', when: 'New work or an explicit redesign.', p: 'Use slopless Standard to redesign this page. Keep the content and show the visual direction early.', loads: ['direction.md', 'storytelling.md', 'craft-floor.md'] },
      deep: { n: 'Deep', does: 'Adds focused research, alternatives and detailed storytelling or motion checks when the job calls for them.', when: 'Explicit exploration, detailed audits or complex motion. Helpers remain opt-in.', p: 'Use slopless Deep. Explore two storytelling directions for this presentation.', loads: ['storytelling.md', 'visual-quality.md', 'motion.md'] },
    } },
    surfaces: { label: 'Surfaces', items: {
      deck: { n: 'Deck', does: 'Preserves working decks. New decks use presenter-paced beats and a dependency-free controller, with cinematic timelines only when needed.', when: 'A talk, demo deck, keynote or interactive explainer.', p: "Use slopless. I'm giving a 15-minute talk to our platform team on how we cut release time. Here's my outline.", loads: ['surfaces/deck.md', 'interview.md', 'motion.md'] },
      web: { n: 'Web', does: 'The first screen says what it is in large type. Sections follow claim to proof, and the idea reaches the footer.', when: 'A landing page, product page, portfolio or one-pager.', p: 'Use slopless to redesign this landing page. Keep every word. It looks like every other AI site.', loads: ['surfaces/web.md', 'layout.md', 'type.md'] },
      app: { n: 'App', does: 'Platform fit first: iOS, Android or React Native conventions, every list state, designed dark mode, 44pt or 48dp targets.', when: 'An app screen, mobile flow or dashboard.', p: 'Use slopless on this onboarding screen for iOS. 390 by 844, dark and light, add empty and error states.', loads: ['surfaces/app.md', 'craft-floor.md'] },
      graphic: { n: 'Graphic', does: 'One message readable in two seconds. Built in HTML or SVG at exact pixel size, then exported.', when: 'A social post, poster, slide image, brand board or thumbnail.', p: 'slopless, three Instagram posts announcing our beta, Porcelain Cobalt, 1080 by 1350.', loads: ['surfaces/graphic.md', 'palettes.md'] },
    } },
    review: { label: 'Review modes', items: {
      review: { n: 'Review', does: 'Inspect the source and rendering, then report a verdict, three concrete problems and missing coverage. Scores are optional; no edits in Review.', when: 'Review, audit, "why does this look AI", or polishing something that exists.', p: 'Use slopless to review this screen. Why does it look generated?', loads: ['review.md', 'tells.md'] },
      bolder: { n: 'Bolder', does: 'For safe and bland work: bigger scale contrast, a committed colour field, one signature move.', when: 'You say it is bland, safe or forgettable.', p: 'Use slopless: make this hero bolder.', loads: ['review.md', 'direction.md'] },
      quieter: { n: 'Quieter', does: 'For loud work: remove effects, drop to one accent, keep one motion moment, add space.', when: 'You say it is loud, busy or too much.', p: 'Use slopless: make this page quieter.', loads: ['review.md', 'motion.md'] },
      distill: { n: 'Distill', does: 'For cluttered work: cut sections without a claim, merge beats, one idea per view.', when: 'You say it is cluttered or too long.', p: 'Use slopless to distill this deck. One idea per slide.', loads: ['review.md', 'layout.md'] },
      harden: { n: 'Harden', does: 'For production: empty, error and loading states, long text, i18n, slow network, keyboard.', when: 'You are about to ship.', p: 'Use slopless to harden this checkout screen.', loads: ['review.md', 'craft-floor.md'] },
    } },
    motion: { label: 'Motion levels', items: {
      still: { n: 'Still', does: 'Hover, press and focus feedback only. A thing that needs animation to look finished is not finished.', when: 'You pick it in part 2 of the interview.', p: 'Use slopless on this dashboard. Still motion, feedback only.', loads: ['motion.md'] },
      subtle: { n: 'Subtle', does: 'Entrances once per section, 60 to 90 ms stagger, 16 to 32 px rise with opacity, gentle parallax.', when: 'You pick it in part 2 of the interview.', p: 'Use slopless on this portfolio. Subtle motion.', loads: ['motion.md'] },
      cinematic: { n: 'Cinematic', does: 'Scenes connect. The same object travels from one beat to the next on scrubbed, pinned timelines.', when: 'You pick it in part 2 of the interview.', p: 'Use slopless for the demo deck. Cinematic: the ticket travels between slides.', loads: ['motion.md', 'surfaces/deck.md'] },
      spatial: { n: 'Spatial', does: 'Real 3D objects and shader backgrounds, with depth and lighting that respond to angle. Starts after load, pauses offscreen.', when: 'You pick it in part 2 of the interview.', p: 'Use slopless for the launch page. Spatial 3D, a glass slab hero.', loads: ['motion.md'] },
    } },
    agents: { label: 'Agents mode', items: {
      agents: { n: 'Agents', does: 'Off by default. On a big job it is offered once; you choose one to four helpers. Mechanical work runs on cheaper models.', when: 'The job is about 12+ slides, 6+ sections or several surfaces, and you say yes.', p: 'Use slopless in agents mode with three helpers. Rebuild the deck in the Sapphire Glass direction.', loads: ['agents.md', 'brief.md'] },
    } },
    memory: { label: 'Taste memory', items: {
      memory: { n: 'Taste memory', does: 'Reads your taste file and the project DESIGN.md first. Writes one dated line whenever you correct or praise the look.', when: 'Every run reads it; corrections, praise and palette picks write to it.', p: 'Remember for slopless: I reject decorative colour bars and I want two live studies before a full build.', loads: ['memory.md'] },
    } },
  };
  const tabs = $('#mode-tabs'), sub = $('#mode-sub'), panel = $('#mode-panel');
  let g = 'routes', k = 'quick';
  // The motion group follows the shared level, so a pick here also updates the interview and this page.
  const motionKey = () => window.sloplessMotion.level;
  document.addEventListener('sloplessmotion', () => { if (g === 'motion') { k = motionKey(); renderTabs(); renderPanel(); } });
  const renderTabs = () => {
    tabs.innerHTML = Object.entries(M).map(([id, v]) => `<button role="tab" type="button" id="mt-${id}" aria-selected="${id === g}" aria-controls="mode-panel" tabindex="${id === g ? 0 : -1}" data-g="${id}">${v.label}</button>`).join('');
    const items = Object.entries(M[g].items);
    sub.hidden = items.length < 2;
    sub.innerHTML = items.map(([id, v]) => g === 'motion' ? `<button type="button" data-level-btn="${id}" aria-pressed="${id === k}">${v.n}</button>` : `<button type="button" data-k="${id}" aria-pressed="${id === k}">${v.n}</button>`).join('');
  };
  const BASE = 'https://github.com/kundan0907/slopless/blob/main/slopless/references/';
  const renderPanel = () => {
    const m = M[g].items[k];
    panel.setAttribute('aria-labelledby', `mt-${g}`);
    panel.innerHTML = `<div class="mode-copy"><h3>${esc(m.n)}</h3><p>${esc(m.does)}</p><dl class="facts"><div><dt>Triggers</dt><dd>${esc(m.when)}</dd></div><div><dt>Loads</dt><dd class="files">${['SKILL.md'].concat(m.loads).map((f) => `<a href="${f === 'SKILL.md' ? BASE.replace('references/', '') + f : BASE + f}" target="_blank" rel="noopener">${f}</a>`).join('')}</dd></div></dl>
      <div class="cmdbox"><pre><code class="cp-src">${esc(m.p)}</code></pre><button class="cp" type="button">Copy prompt</button></div></div>${g === 'motion' ? '<div data-mpv></div>' : ''}`;
    if (g === 'motion') window.sloplessMotion.mount($('[data-mpv]', panel));
  };
  const show = () => { renderTabs(); renderPanel(); };
  tabs.addEventListener('click', (e) => { const b = e.target.closest('[data-g]'); if (!b) return; g = b.dataset.g; k = g === 'motion' ? motionKey() : Object.keys(M[g].items)[0]; show(); b.ownerDocument.getElementById('mt-' + g).focus(); });
  tabs.addEventListener('keydown', (e) => {
    const ids = Object.keys(M), n = ids.indexOf(g);
    const d = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
    if (!d) return;
    g = ids[(n + d + ids.length) % ids.length]; k = g === 'motion' ? motionKey() : Object.keys(M[g].items)[0]; show(); $('#mt-' + g).focus(); e.preventDefault();
  });
  sub.addEventListener('click', (e) => { const b = e.target.closest('[data-k]'); if (!b) return; k = b.dataset.k; renderTabs(); renderPanel(); $(`[data-k="${k}"]`, sub)?.focus(); });
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

/* ---------- What your agent reads ---------- */
{
  const tabs = $('#reads-tabs'), panels = $$('.reads-panel');
  const pick = (id) => {
    $$('[data-job]', tabs).forEach((b) => { const on = b.dataset.job === id; b.setAttribute('aria-selected', String(on)); b.tabIndex = on ? 0 : -1; });
    panels.forEach((p) => (p.hidden = p.dataset.job !== id));
  };
  tabs.addEventListener('click', (e) => { const b = e.target.closest('[data-job]'); if (b) pick(b.dataset.job); });
  tabs.addEventListener('keydown', (e) => {
    const bs = $$('[data-job]', tabs), n = bs.findIndex((b) => b.getAttribute('aria-selected') === 'true'), d = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
    if (!d) return;
    const nb = bs[(n + d + bs.length) % bs.length]; pick(nb.dataset.job); nb.focus(); e.preventDefault();
  });
  pick(tabs.querySelector('[data-job]').dataset.job);
}
