// Hero scene: a glass slab refracting a typographic field. Exposes window.sloplessScene.
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

const WORDS = ['interview', 'direction', 'prove', 'build', 'verify', 'learn'];

function start(canvas) {
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
  } catch {
    canvas.remove();
    return null;
  }
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;

  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
  camera.position.set(0, 0, 9);

  // Typographic field behind the glass; redrawn per palette.
  const field = document.createElement('canvas');
  field.width = 2048; field.height = 1280;
  const fieldTex = new THREE.CanvasTexture(field);
  fieldTex.colorSpace = THREE.SRGBColorSpace;
  fieldTex.anisotropy = 4;
  const plane = new THREE.Mesh(new THREE.PlaneGeometry(16, 10), new THREE.MeshBasicMaterial({ map: fieldTex, toneMapped: false }));
  plane.position.z = -2.4;
  scene.add(plane);

  const glass = new THREE.MeshPhysicalMaterial({
    transmission: 1, roughness: 0.06, thickness: 1.4, ior: 1.5, metalness: 0,
    clearcoat: 1, clearcoatRoughness: 0.04, iridescence: 0.35, iridescenceIOR: 1.3,
    attenuationDistance: 3.5, envMapIntensity: 1.8, specularIntensity: 1,
  });
  const slab = new THREE.Mesh(new RoundedBoxGeometry(2.3, 3.1, 0.62, 10, 0.32), glass);
  scene.add(slab);

  const metal = new THREE.MeshPhysicalMaterial({ metalness: 1, roughness: 0.22, clearcoat: 0.6 });
  const bead = new THREE.Mesh(new THREE.SphereGeometry(0.42, 64, 64), metal);
  bead.position.set(1.55, -1.35, 0.9);
  scene.add(bead);

  const ring = new THREE.Mesh(new THREE.TorusGeometry(0.62, 0.07, 32, 128), glass);
  ring.position.set(-1.7, 1.45, 0.4);
  scene.add(ring);

  let palette = null;
  function drawField() {
    const g = field.getContext('2d');
    const { ground, ink, accent, muted } = palette;
    g.fillStyle = ground; g.fillRect(0, 0, field.width, field.height);
    g.textBaseline = 'middle';
    for (let row = 0; row < 9; row++) {
      const y = 70 + row * 142;
      g.font = `300 ${row % 3 === 1 ? 150 : 118}px "Bricolage Grotesque", system-ui, sans-serif`;
      g.fillStyle = row === 4 ? accent : row % 2 ? muted : ink;
      g.globalAlpha = row === 4 ? 0.9 : 0.07 + (row % 3) * 0.04;
      let x = -((row * 173) % 480);
      for (let i = 0; x < field.width; i++) {
        const w = WORDS[(row + i) % WORDS.length];
        g.fillText(w, x, y);
        x += g.measureText(w).width + 70;
      }
    }
    g.globalAlpha = 1;
    // Keep the headline side quiet, and put light behind the glass so it refracts something.
    const fade = g.createLinearGradient(820, 0, 1260, 0);
    fade.addColorStop(0, ground); fade.addColorStop(1, 'transparent');
    g.fillStyle = fade; g.fillRect(0, 0, 1260, field.height);
    const glow = g.createRadialGradient(1500, 600, 40, 1500, 600, 560);
    glow.addColorStop(0, accent + '40'); glow.addColorStop(1, 'transparent');
    g.fillStyle = glow; g.fillRect(900, 0, field.width - 900, field.height);
    fieldTex.needsUpdate = true;
  }

  function setPalette(p) {
    palette = p;
    glass.attenuationColor.set(p.accent).lerp(new THREE.Color('#ffffff'), 0.65);
    metal.color.set(p.accent);
    drawField();
    render();
  }

  const state = { progress: 0, px: 0, py: 0, tx: 0, ty: 0, t: 0 };
  function resize() {
    const { clientWidth: w, clientHeight: h } = canvas;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    const narrow = w < 820;
    const shift = narrow ? 0.2 : 2.1;
    const lift = narrow ? 1.25 : 0;
    slab.userData.baseX = shift; ring.userData.baseX = shift - 1.7; bead.userData.baseX = shift + 1.55;
    slab.userData.baseY = lift; ring.userData.baseY = 1.45 + lift; bead.userData.baseY = -1.35 + lift;
    const s = narrow ? 0.72 : 1; slab.scale.setScalar(s); ring.scale.setScalar(s); bead.scale.setScalar(s);
    render();
  }

  function render() {
    const p = state.progress;
    state.px += (state.tx - state.px) * 0.06;
    state.py += (state.ty - state.py) * 0.06;
    slab.position.set(slab.userData.baseX ?? 2.1, (slab.userData.baseY ?? 0) + p * 2.2, 0);
    slab.rotation.set(0.18 + state.py * 0.25 + p * 0.9, -0.5 + state.t * 0.12 + state.px * 0.35 + p * 1.6, 0.06);
    ring.position.x = ring.userData.baseX ?? 0.4; ring.position.y = (ring.userData.baseY ?? 1.45) + p * 3.2;
    ring.rotation.set(0.9 + state.t * 0.2, 0.4 + p * 2, 0);
    bead.position.x = bead.userData.baseX ?? 3.65; bead.position.y = (bead.userData.baseY ?? -1.35) + p * 1.2;
    plane.position.y = p * -0.8;
    renderer.render(scene, camera);
  }

  let visible = true, last = performance.now(), raf = 0;
  function loop(now) {
    raf = 0;
    if (!visible || document.hidden) return;
    state.t += reduced ? 0 : Math.min(now - last, 50) / 1000;
    last = now;
    render();
    if (!reduced) raf = requestAnimationFrame(loop);
  }
  const kick = () => { if (!raf && !reduced) { last = performance.now(); raf = requestAnimationFrame(loop); } };

  new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) kick(); }).observe(canvas);
  document.addEventListener('visibilitychange', kick);
  new ResizeObserver(resize).observe(canvas);
  if (!reduced) addEventListener('pointermove', (e) => { state.tx = e.clientX / innerWidth - 0.5; state.ty = e.clientY / innerHeight - 0.5; }, { passive: true });

  return {
    setPalette,
    setProgress(p) { state.progress = p; if (reduced) render(); },
    start() { resize(); kick(); },
  };
}

window.sloplessScene = { start };
