const {contextBridge,ipcRenderer}=require('electron');
contextBridge.exposeInMainWorld('aceAPI',{
  renderPuml:(code)=>ipcRenderer.invoke('render-puml',code),
  sparaFil:(innehall,foreslagetNamn,filter)=>ipcRenderer.invoke('visa-spara-dialog',innehall,foreslagetNamn,filter)
});
