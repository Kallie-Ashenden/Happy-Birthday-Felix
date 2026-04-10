// Happy Birthday Card — main script

// Read ?name= from the URL and inject it into the DOM.
// Falls back to "Friend" if the param is absent or empty.
(function () {
  const params = new URLSearchParams(window.location.search);
  const name = params.get('name') || 'Friend';
  document.getElementById('birthdayName').textContent = name;
}());
