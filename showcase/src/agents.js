// Agents-mode graph on the explore page.
(() => {
  const ROLES = [
    { id: 'builder', name: 'Builder', tier: 'mid tier', x: 40, y: 70 },
    { id: 'builder2', name: 'Builder', tier: 'mid tier', x: 40, y: 382 },
    { id: 'motion', name: 'Motion / 3D', tier: 'mid, top for one move', x: 370, y: 70 },
    { id: 'review', name: 'Reviewer + QA', tier: 'mid tier, read-only', x: 370, y: 382 },
  ];
  const SETS = { 0: [], 1: ['review'], 2: ['builder', 'review'], 3: ['builder', 'motion', 'review'], 4: ['builder', 'builder2', 'motion', 'review'] };
  const LABEL = { 0: 'Just me', 1: '1', 2: '2', 3: '3', 4: '4' };
  const ns = 'http://www.w3.org/2000/svg';
  const edges = document.getElementById('edges'), nodes = document.getElementById('nodes');
  const node = (cls, x, y, name, tier, w = 190) => {
    const g = document.createElementNS(ns, 'g'); g.setAttribute('class', `node ${cls}`);
    g.innerHTML = `<rect x="${x}" y="${y}" width="${w}" height="64" rx="18"/><text x="${x + 20}" y="${y + 28}">${name}</text><text class="tier" x="${x + 20}" y="${y + 49}">${tier}</text>`;
    nodes.append(g); return g;
  };
  node('lead', 185, 214, 'Lead (you)', 'interview, direction, merge', 230);
  const roleEls = ROLES.map((r) => {
    const path = document.createElementNS(ns, 'path');
    const sx = 300, sy = r.y < 214 ? 214 : 278, ex = r.x + 95, ey = r.y < 214 ? r.y + 64 : r.y;
    path.setAttribute('d', `M${sx} ${sy} C ${sx} ${(sy + ey) / 2}, ${ex} ${(sy + ey) / 2}, ${ex} ${ey}`);
    edges.append(path);
    return { r, el: node('', r.x, r.y, r.name, r.tier), path };
  });
  const roster = document.getElementById('roster');
  const countBox = document.getElementById('count');
  function setCount(n) {
    const on = SETS[n];
    for (const { r, el, path } of roleEls) {
      const active = on.includes(r.id);
      el.classList.toggle('off', !active); path.classList.toggle('off', !active);
      if (active && window.gsap && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
        const len = path.getTotalLength();
        gsap.fromTo(path, { strokeDasharray: len, strokeDashoffset: len }, { strokeDashoffset: 0, duration: 0.8, ease: 'power2.out' });
      }
    }
    roster.innerHTML = n ? on.map((id) => { const r = ROLES.find((x) => x.id === id); return `<li>${r.name}<span>${r.tier}</span></li>`; }).join('') : '<li>One agent does everything<span>the default</span></li>';
    countBox.querySelectorAll('button').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.n === String(n))));
  }
  for (const n of [0, 1, 2, 3, 4]) {
    const b = document.createElement('button'); b.type = 'button'; b.dataset.n = n; b.textContent = LABEL[n];
    b.setAttribute('aria-label', n ? `${n} helper${n > 1 ? 's' : ''}` : 'No helpers');
    b.addEventListener('click', () => setCount(n));
    countBox.append(b);
  }
  setCount(3);
})();
