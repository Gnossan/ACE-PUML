document.addEventListener('DOMContentLoaded', function() {
  window.skapaPaneler();
  var pumlInput = document.getElementById('puml-input');
  if (pumlInput) {
    pumlInput.addEventListener('input', function() {
      window.visaForhandsgranskning(pumlInput.value);
    });
  }
  var btnSvg = document.getElementById('btn-export-svg');
  if (btnSvg) {
    btnSvg.addEventListener('click', function() {
      window.exporteraSVG(document.getElementById('preview-output').innerHTML);
    });
  }
  var btnPng = document.getElementById('btn-export-png');
  if (btnPng) {
    btnPng.addEventListener('click', function() {
      var code = pumlInput ? pumlInput.value : '';
      window.aceAPI.renderPumlPng(code).then(function(result) {
        if (result.png) {
          window.exporteraPNG('data:image/png;base64,' + result.png);
        }
      });
    });
  }
  var btnDrawio = document.getElementById('btn-export-drawio');
  if (btnDrawio) {
    btnDrawio.addEventListener('click', function() {
      var code = pumlInput ? pumlInput.value : '';
      var drawioXml = window.sekvensTillDrawio(code);
      window.exporteraDrawio(drawioXml);
    });
  }
});