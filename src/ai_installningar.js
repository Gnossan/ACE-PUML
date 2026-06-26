window.skapaAIInstallningar = function() {
  if (document.getElementById('ai-installningar-modal')) return;
  var overlay = document.createElement('div');
  overlay.id = 'ai-installningar-modal';
  overlay.style.position = 'fixed';
  overlay.style.top = '0';
  overlay.style.left = '0';
  overlay.style.width = '100%';
  overlay.style.height = '100%';
  overlay.style.backgroundColor = 'rgba(0,0,0,0.5)';
  overlay.style.display = 'flex';
  overlay.style.justifyContent = 'center';
  overlay.style.alignItems = 'center';
  overlay.style.zIndex = '9999';

  var dialog = document.createElement('div');
  dialog.style.background = '#fff';
  dialog.style.padding = '20px';
  dialog.style.borderRadius = '8px';
  dialog.style.width = '400px';
  dialog.style.maxWidth = '90%';

  var rubriken = document.createElement('h2');
  rubriken.textContent = 'AI-assistent-inställningar';
  dialog.appendChild(rubriken);

  var beskrivning = document.createElement('p');
  beskrivning.textContent = 'Ange din Anthropic API-nyckel för att använda Claude AI-assistenten.';
  dialog.appendChild(beskrivning);

  var nyckelInput = document.createElement('input');
  nyckelInput.id = 'ai-nyckel-input';
  nyckelInput.type = 'password';
  nyckelInput.placeholder = 'Anthropic API-nyckel (sk-...)';
  nyckelInput.style.width = '100%';
  nyckelInput.style.padding = '8px';
  nyckelInput.style.marginBottom = '10px';
  nyckelInput.style.boxSizing = 'border-box';
  dialog.appendChild(nyckelInput);

  var status = document.createElement('div');
  status.id = 'ai-installningar-status';
  status.style.marginBottom = '10px';
  dialog.appendChild(status);

  var varning = document.createElement('p');
  varning.style.fontSize = '0.85em';
  varning.style.color = '#666';
  varning.textContent = 'Nyckeln krypteras med safeStorage och lagras lokalt. Den skickas aldrig till renderer-processen.';
  dialog.appendChild(varning);

  var knappsamling = document.createElement('div');
  knappsamling.style.display = 'flex';
  knappsamling.style.gap = '10px';
  knappsamling.style.marginTop = '10px';

  var sparaKnapp = document.createElement('button');
  sparaKnapp.textContent = 'Spara nyckel';
  sparaKnapp.addEventListener('click', sparaNyckel);
  knappsamling.appendChild(sparaKnapp);

  var stangKnapp = document.createElement('button');
  stangKnapp.textContent = 'Stäng';
  stangKnapp.addEventListener('click', function() {
    document.body.removeChild(overlay);
  });
  knappsamling.appendChild(stangKnapp);

  dialog.appendChild(knappsamling);
  overlay.appendChild(dialog);
  document.body.appendChild(overlay);

  loadStatus();

  function loadStatus() {
    aceAPI.hamtaNyckelStatus().then(function(nyckelStatus) {
      if (nyckelStatus.sparad) {
        status.textContent = '✓ Nyckel sparad';
        status.style.color = 'green';
      } else {
        status.textContent = 'Ingen nyckel sparad';
        status.style.color = '#999';
      }
    });
  }

  function sparaNyckel() {
    var nyckel = nyckelInput.value.trim();
    if (!nyckel) {
      status.textContent = 'Vänligen ange en API-nyckel.';
      status.style.color = 'red';
      return;
    }
    aceAPI.sparaApiNyckel(nyckel).then(function(resultat) {
      if (resultat && resultat.ok) {
        status.textContent = '✓ Nyckel sparad';
        status.style.color = 'green';
        nyckelInput.value = '';
      } else {
        status.textContent = 'Fel vid sparande.';
        status.style.color = 'red';
      }
    }).catch(function(err) {
      status.textContent = 'Fel: ' + err.message;
      status.style.color = 'red';
    });
  }
};