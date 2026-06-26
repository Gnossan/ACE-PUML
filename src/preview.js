window.visaForhandsgranskning = function(text) {
  var previewOutput = document.getElementById('preview-output');
  previewOutput.textContent = 'Förhandsgranskning (kommer i nästa steg). Du skrev: ' + text.length + ' tecken.';
};