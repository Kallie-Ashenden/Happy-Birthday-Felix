// Happy Birthday Card — main script

(function () {
  // --- Name injection ---
  // Read ?name= from the URL and inject it into the DOM.
  // Falls back to "Friend" if the param is absent or empty.
  const params = new URLSearchParams(window.location.search);
  const name = params.get('name') || 'Friend';
  document.getElementById('birthdayName').textContent = name;

  // --- Spin interaction ---
  // Clicking the text block adds .is-spinning, triggering the CSS animation.
  // Removing and re-adding the class (with a forced reflow) allows the
  // animation to restart cleanly if clicked while already spinning.
  const el = document.getElementById('birthdayText');

  el.addEventListener('click', function () {
    el.classList.remove('is-spinning');
    void el.offsetWidth; // force reflow so the browser registers the removal
    el.classList.add('is-spinning');
  });

  el.addEventListener('animationend', function () {
    el.classList.remove('is-spinning');
  });
}());
