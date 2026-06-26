window.skapaPaneler = function() {
  var container = document.createElement('div');
  container.id = 'ace-container';
  container.style.display = 'flex';
  container.style.height = '100vh';

  var editorPanel = document.createElement('div');
  editorPanel.id = 'editor-panel';
  editorPanel.style.width = '50%';
  editorPanel.style.height = '100%';

  var textarea = document.createElement('textarea');
  textarea.id = 'puml-input';
  textarea.placeholder = 'Skriv PlantUML-kod här...';
  textarea.style.width = '100%';
  textarea.style.height = '100%';
  editorPanel.appendChild(textarea);

  var previewPanel = document.createElement('div');
  previewPanel.id = 'preview-panel';
  previewPanel.style.width = '50%';
  previewPanel.style.height = '100%';
  previewPanel.style.display = 'flex';
  previewPanel.style.flexDirection = 'column';

  var exportBtnRow = document.createElement('div');
  exportBtnRow.style.padding = '5px';
  exportBtnRow.style.display = 'flex';
  exportBtnRow.style.gap = '5px';

  var btnSvg = document.createElement('button');
  btnSvg.id = 'btn-export-svg';
  btnSvg.textContent = 'Exportera SVG';
  exportBtnRow.appendChild(btnSvg);

  var btnPng = document.createElement('button');
  btnPng.id = 'btn-export-png';
  btnPng.textContent = 'Exportera PNG';
  exportBtnRow.appendChild(btnPng);

  var btnDrawio = document.createElement('button');
  btnDrawio.id = 'btn-export-drawio';
  btnDrawio.textContent = 'Exportera draw.io';
  exportBtnRow.appendChild(btnDrawio);

  var previewOutput = document.createElement('div');
  previewOutput.id = 'preview-output';
  previewOutput.style.flex = '1';
  previewPanel.appendChild(exportBtnRow);
  previewPanel.appendChild(previewOutput);

  container.appendChild(editorPanel);
  container.appendChild(previewPanel);
  document.body.appendChild(container);
};