document.addEventListener('DOMContentLoaded', function() {
  window.skapaPaneler();
  window.skapaAIChatt();
  var pumlInput = document.getElementById('puml-input');
  if (pumlInput) {
    var renderTimeout = null;
    pumlInput.addEventListener('input', function() {
      if (renderTimeout) {
        clearTimeout(renderTimeout);
      }
      renderTimeout = setTimeout(function() {
        window.visaForhandsgranskning(pumlInput.value);
      }, 400);
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
      window.aceAPI.renderPumlPng(code).then(function(resultat) {
        if (resultat.png) {
          window.exporteraPNG('data:image/png;base64,' + resultat.png);
        }
      });
    });
  }
  var btnDrawio = document.getElementById('btn-export-drawio');
  if (btnDrawio) {
    btnDrawio.addEventListener('click', function() {
      var code = pumlInput ? pumlInput.value : '';
      var isKlass = code.indexOf('class ') !== -1;
      var isUsecase = code.indexOf('usecase ') !== -1 || code.indexOf('actor ') !== -1;
      var isAktivitet = code.indexOf('start') !== -1 || code.indexOf('stop') !== -1 || /^:/.test(code);
      var drawioXml;
      if (isKlass) {
        drawioXml = window.klassTillDrawio(code);
      } else if (isUsecase) {
        drawioXml = window.usecaseTillDrawio(code);
      } else if (isAktivitet) {
        drawioXml = window.aktivitetTillDrawio(code);
      } else {
        drawioXml = window.sekvensTillDrawio(code);
      }
      window.exporteraDrawio(drawioXml);
    });
  }
  var btnAI = document.getElementById('btn-ai-inställningar');
  if (btnAI) {
    btnAI.addEventListener('click', function() {
      window.skapaAIInstallningar();
    });
  }
});