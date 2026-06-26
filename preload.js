const {contextBridge,ipcRenderer}=require('electron');
contextBridge.exposeInMainWorld('aceAPI',{
  renderPuml:(code)=>ipcRenderer.invoke('render-puml',code)
});
