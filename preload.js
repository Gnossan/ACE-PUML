const {contextBridge,ipcRenderer}=require('electron');
contextBridge.exposeInMainWorld('aceAPI',{
  renderPuml:(code)=>ipcRenderer.send('render-puml',code),
  onRenderResult:(cb)=>ipcRenderer.on('render-result',(e,svg)=>cb(svg))
});
