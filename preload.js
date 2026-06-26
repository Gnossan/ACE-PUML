const {contextBridge,ipcRenderer}=require('electron');
contextBridge.exposeInMainWorld('aceAPI',{
  renderPuml:(code)=>ipcRenderer.invoke('render-puml',code),
  renderPumlPng:(code)=>ipcRenderer.invoke('render-puml-png',code),
  sparaFil:(innehall,foreslagetNamn,filter)=>ipcRenderer.invoke('visa-spara-dialog',innehall,foreslagetNamn,filter),
  sparaApiNyckel:(nyckel)=>ipcRenderer.invoke('spara-api-nyckel',nyckel),
  hamtaNyckelStatus:()=>ipcRenderer.invoke('hamta-nyckel-status'),
  skickaAiMeddelande:(message,inkluderaKod,kod)=>ipcRenderer.invoke('skicka-ai-meddelande',message,inkluderaKod,kod)
});
