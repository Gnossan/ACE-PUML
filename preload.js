const {contextBridge,ipcRenderer}=require('electron');
contextBridge.exposeInMainWorld('aceAPI',{
  renderPuml:(code)=>ipcRenderer.invoke('render-puml',code),
  renderPumlPng:(code)=>ipcRenderer.invoke('render-puml-png',code),
  sparaFil:(innehall,foreslagetNamn,filter)=>ipcRenderer.invoke('visa-spara-dialog',innehall,foreslagetNamn,filter)
});