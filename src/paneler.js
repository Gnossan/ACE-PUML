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

  var previewOutput = document.createElement('div');
  previewOutput.id = 'preview-output';
  previewPanel.appendChild(previewOutput);

  container.appendChild(editorPanel);
  container.appendChild(previewPanel);
  document.body.appendChild(container);
};