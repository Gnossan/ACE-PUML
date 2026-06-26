window.skapaAIChatt = function() {
  var editorPanel = document.getElementById('editor-panel');
  if (!editorPanel) return;
  var chatBlock = document.createElement('div');
  chatBlock.id = 'ai-chatt-block';
  chatBlock.style.padding = '5px';
  chatBlock.style.borderTop = '1px solid #ccc';

  var label = document.createElement('label');
  label.textContent = 'AI-assistent: Fråga Claude om PlantUML';
  label.style.fontWeight = 'bold';
  label.style.display = 'block';
  label.style.marginBottom = '5px';
  chatBlock.appendChild(label);

  var textarea = document.createElement('textarea');
  textarea.id = 'ai-meddelande';
  textarea.placeholder = 'Fråga Claude om ditt PlantUML-diagram...';
  textarea.style.width = '100%';
  textarea.style.height = '60px';
  textarea.style.marginBottom = '5px';
  chatBlock.appendChild(textarea);

  var checkboxRow = document.createElement('div');
  checkboxRow.style.marginBottom = '5px';
  checkboxRow.style.display = 'flex';
  checkboxRow.style.alignItems = 'center';
  checkboxRow.style.gap = '5px';

  var checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.id = 'ai-inkludera-kod';
  checkbox.checked = false;

  var checkboxLabel = document.createElement('label');
  checkboxLabel.textContent = 'Inkludera diagramkod i meddelandet';
  checkboxLabel.setAttribute('for', 'ai-inkludera-kod');

  var warning = document.createElement('span');
  warning.textContent = 'Skickar hela diagramkoden till Anthropic. Aktivera bara om du litar på källan till koden.';
  warning.style.fontSize = '0.8em';
  warning.style.color = '#cc0000';

  checkboxRow.appendChild(checkbox);
  checkboxRow.appendChild(checkboxLabel);
  checkboxRow.appendChild(warning);
  chatBlock.appendChild(checkboxRow);

  var sendBtn = document.createElement('button');
  sendBtn.id = 'ai-skicka';
  sendBtn.textContent = 'Skicka till Claude';
  sendBtn.style.marginBottom = '5px';
  chatBlock.appendChild(sendBtn);

  var svarDiv = document.createElement('div');
  svarDiv.id = 'ai-svar';
  svarDiv.style.padding = '5px';
  svarDiv.style.border = '1px solid #eee';
  svarDiv.style.minHeight = '30px';
  svarDiv.style.whiteSpace = 'pre-wrap';
  chatBlock.appendChild(svarDiv);

  editorPanel.appendChild(chatBlock);

  textarea.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && e.ctrlKey) {
      e.preventDefault();
      kodaAIChatt();
    }
  });

  sendBtn.addEventListener('click', function() {
    kodaAIChatt();
  });

  function kodaAIChatt() {
    var message = textarea.value.trim();
    if (!message) return;
    var includeKod = checkbox.checked;
    var code = document.getElementById('puml-input') ? document.getElementById('puml-input').value : '';
    svarDiv.textContent = 'Kontrollerar API-nyckel...';
    aceAPI.hamtaNyckelStatus().then(function(status) {
      if (!status.sparad) {
        svarDiv.textContent = 'Fel: Ingen API-nyckel sparad. Gå till Inställningar och konfigurera din Anthropic-nyckel.';
        return;
      }
      svarDiv.textContent = 'Skickar till Claude...';
      return aceAPI.skickaAiMeddelande(message, includeKod, includeKod ? code : null);
    }).then(function(resultat) {
      if (resultat === undefined) {
        return;
      } else if (resultat && resultat.fel) {
        svarDiv.textContent = 'Fel: ' + resultat.fel;
      } else if (resultat && resultat.svar) {
        svarDiv.textContent = resultat.svar;
      } else {
        svarDiv.textContent = 'Inget svar från Claude.';
      }
    }).catch(function(err) {
      svarDiv.textContent = 'Fel: ' + err.message;
    });
  }
};