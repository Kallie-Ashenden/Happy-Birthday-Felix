(function () {
  const NS = 'http://www.w3.org/2000/svg';
  const SPACING = 36;
  const BASE_R = 1.8;
  const MAX_R = 3.4;
  const MIN_OPACITY = 0.07;
  const MAX_OPACITY = 0.26;
  const WAVE_FREQ = 0.048;   // spatial frequency of the background wave
  const WAVE_SPEED = 1.1;    // radians per second

  // Create and inject the SVG layer
  const svg = document.createElementNS(NS, 'svg');
  svg.classList.add('dot-bg');
  svg.setAttribute('aria-hidden', 'true');
  document.body.insertBefore(svg, document.body.firstChild);

  let dots = [];
  let ripples = [];

  function build() {
    const W = window.innerWidth;
    const H = window.innerHeight;
    svg.setAttribute('width', W);
    svg.setAttribute('height', H);
    svg.setAttribute('viewBox', `0 0 ${W} ${H}`);

    while (svg.firstChild) svg.removeChild(svg.firstChild);
    dots = [];

    const cols = Math.ceil(W / SPACING) + 1;
    const rows = Math.ceil(H / SPACING) + 1;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const el = document.createElementNS(NS, 'circle');
        const cx = c * SPACING;
        const cy = r * SPACING;
        el.setAttribute('cx', cx);
        el.setAttribute('cy', cy);
        el.setAttribute('r', BASE_R);
        el.setAttribute('fill', 'white');
        svg.appendChild(el);
        dots.push({ el, cx, cy });
      }
    }
  }

  function addRipple(x, y) {
    ripples.push({ x, y, age: 0 });
  }

  function animate(ts) {
    const t = ts * 0.001;

    dots.forEach(d => {
      // Diagonal travelling wave
      const wave = Math.sin(t * WAVE_SPEED + (d.cx + d.cy) * WAVE_FREQ);
      let opacity = MIN_OPACITY + (MAX_OPACITY - MIN_OPACITY) * ((wave + 1) / 2);
      let radius  = BASE_R + (MAX_R - BASE_R) * ((wave + 1) / 2);

      // Ripple contributions
      ripples.forEach(rip => {
        const dist = Math.hypot(d.cx - rip.x, d.cy - rip.y);
        // Ring that travels outward and fades
        const ring = Math.sin(dist * 0.09 - rip.age * 7)
          * Math.exp(-dist * 0.007)
          * Math.exp(-rip.age * 0.9);
        opacity += ring * 0.35;
        radius  += ring * 2.0;
      });

      opacity = Math.max(0, Math.min(1, opacity));
      radius  = Math.max(0.3, radius);

      d.el.setAttribute('r', radius.toFixed(2));
      d.el.style.opacity = opacity.toFixed(3);
    });

    // Advance and expire ripples
    ripples = ripples
      .map(r => ({ ...r, age: r.age + 0.016 }))
      .filter(r => r.age < 4.5);

    requestAnimationFrame(animate);
  }

  build();
  window.addEventListener('resize', build);

  // Ripple on click anywhere on the page
  document.addEventListener('click', e => addRipple(e.clientX, e.clientY));
  document.addEventListener('touchstart', e => {
    const touch = e.touches[0];
    addRipple(touch.clientX, touch.clientY);
  }, { passive: true });

  requestAnimationFrame(animate);
})();
