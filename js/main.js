// Happy Birthday Card — main script

(function () {
  // --- Name injection ---
  // Read ?name= from the URL and inject it into the DOM.
  // Falls back to "Friend" if the param is absent or empty.
  var params = new URLSearchParams(window.location.search);
  var name = params.get('name') || 'Friend';
  document.getElementById('birthdayName').textContent = name;
  document.title = 'Happy Birthday, ' + name + '!';

  // --- Reduced motion ---
  // Respect the OS preference — skip animations if requested.
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // --- Spin interaction ---
  var el   = document.getElementById('birthdayText');
  var hint = document.getElementById('clickHint');

  el.addEventListener('click', function () {
    // Dismiss the hint on first interaction
    if (hint) {
      hint.classList.add('is-hidden');
    }

    if (reducedMotion) return;

    // Remove and re-add the class (with a forced reflow) so clicking
    // mid-spin restarts the animation cleanly.
    el.classList.remove('is-spinning');
    void el.offsetWidth;
    el.classList.add('is-spinning');
  });

  // When the spin ends, trigger the starburst and fireworks.
  // Guard with e.target so bubbled animationend events from child elements
  // (e.g. the starburst animation) don't re-fire this handler.
  el.addEventListener('animationend', function (e) {
    if (e.target !== el) return;
    el.classList.remove('is-spinning');
    el.classList.add('show-effects');
    launchFireworks();
    setTimeout(function () {
      el.classList.remove('show-effects');
    }, 1000);
  });

  // --- Fireworks ---
  var COLORS = ['#ffd700', '#ff6ec7', '#ff4d4d', '#44dd88', '#66aaff', '#ff8844'];

  function launchFireworks() {
    if (reducedMotion) return;

    var BURST_COUNT = 6;
    var PARTICLES_PER_BURST = 14;

    for (var b = 0; b < BURST_COUNT; b++) {
      (function (delay) {
        setTimeout(function () {
          var burst = document.createElement('div');
          burst.className = 'firework';
          burst.style.left = (15 + Math.random() * 70) + 'vw';
          burst.style.top  = (10 + Math.random() * 55) + 'vh';
          document.body.appendChild(burst);

          for (var p = 0; p < PARTICLES_PER_BURST; p++) {
            var particle = document.createElement('div');
            particle.className = 'firework__particle';
            var angle    = (p / PARTICLES_PER_BURST) * 360;
            var distance = (70 + Math.random() * 90) + 'px';
            var color    = COLORS[Math.floor(Math.random() * COLORS.length)];
            particle.style.setProperty('--angle', angle + 'deg');
            particle.style.setProperty('--distance', distance);
            particle.style.backgroundColor = color;
            particle.style.animationDelay  = (Math.random() * 0.15) + 's';
            burst.appendChild(particle);
          }

          setTimeout(function () { burst.remove(); }, 1500);
        }, delay);
      }(b * 180));
    }
  }
}());
