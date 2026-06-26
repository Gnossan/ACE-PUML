document.addEventListener('DOMContentLoaded', function() {
  window.skapaPaneler();
  var pumlInput = document.getElementById('puml-input');
  if (pumlInput) {
    pumlInput.addEventListener('input', function() {
      window.visaForhandsgranskning(pumlInput.value);
    });
  }
});