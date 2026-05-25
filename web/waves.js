document.addEventListener('DOMContentLoaded', () => {
  const scene = document.querySelector('.scene-container');
  if (scene) {
    const pre = scene.querySelector('pre');
    const fit = () => {
      scene.style.transform = 'scale(1)';
      scene.style.height = '';
      const baseWidth = pre ? pre.scrollWidth : 0;
      const baseHeight = scene.scrollHeight;
      const available = scene.parentElement ? scene.parentElement.clientWidth : window.innerWidth;
      const maxWidth = 512;
      const target = Math.min(available, maxWidth);
      if (baseWidth > 0) {
        const s = target / baseWidth;
        scene.style.transform = 'scale(' + s + ')';
        scene.style.height = (baseHeight * s) + 'px';
      }
    };
    fit();
    window.addEventListener('resize', fit);
    document.fonts.ready.then(fit);
  }

  const rows = document.querySelectorAll('.wave-row');
  if (!rows.length) return;

  const COLS = 52;
  const ROWS = rows.length;
  const MAX_SHOULDER = 2;
  const BREAK_AFTER = 5;
  const NUM_WAVES = 4;
  const WAVE_SPACING = Math.ceil(ROWS / NUM_WAVES);
  const CYCLE = WAVE_SPACING * NUM_WAVES;
  let frame = 0;
  let playing = true;

  function waveLineAt(dist, crestY) {
    if (dist >= 0 && dist < 1) {
      return '~'.repeat(COLS);
    }
    if (dist >= 1 && dist <= MAX_SHOULDER && crestY >= BREAK_AFTER) {
      const age = (crestY - BREAK_AFTER) / (CYCLE - BREAK_AFTER);
      const decay = Math.max(0, 1 - age * 2);
      const baseGap = dist === 1 ? COLS - 6 : COLS - 2;
      const gapWidth = Math.min(COLS, Math.max(0, Math.floor(baseGap * decay)));
      const bandWidth = COLS - gapWidth;
      const bandStart = Math.floor((COLS - bandWidth) / 2);
      return ' '.repeat(bandStart) + '~'.repeat(bandWidth) + ' '.repeat(COLS - bandStart - bandWidth);
    }
    return null;
  }

  function renderFrame() {
    for (let y = 0; y < ROWS; y++) {
      let line = null;

      for (let w = 0; w < NUM_WAVES && !line; w++) {
        const crestY = ((frame + w * WAVE_SPACING) % CYCLE) - 1;
        const dist = y - crestY;
        line = waveLineAt(dist, crestY);
      }

      rows[y].textContent = line || ' '.repeat(COLS);
    }
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
      frame++;
      renderFrame();
    } else if (e.key === 'ArrowLeft') {
      frame = Math.max(0, frame - 1);
      renderFrame();
    } else if (e.key === ' ') {
      playing = !playing;
      if (playing) tick();
    }
  });

  let lastTime = 0;
  const FRAME_INTERVAL = 350;

  function tick(timestamp) {
    if (!playing) return;
    if (timestamp - lastTime >= FRAME_INTERVAL) {
      lastTime = timestamp;
      frame++;
      renderFrame();
    }
    requestAnimationFrame(tick);
  }

  renderFrame();
  tick();
});
