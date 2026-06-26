const {app,BrowserWindow,ipcMain}=require('electron');
const path=require('path'),{spawn}=require('child_process'),{dialog,shell}=require('electron'),fs=require('fs');
let win;
function createWindow(){
  win=new BrowserWindow({
    width:1200,height:800,
    webPreferences:{
      contextIsolation:true,nodeIntegration:false,sandbox:true,
      preload:path.join(__dirname,'preload.js')
    }
  });
  win.loadFile(path.join(__dirname,'src','index.html'));
}
ipcMain.handle('render-puml',async(event,code)=>{
  const jre=path.join(__dirname,'resources','jre','bin','java');
  const puml=path.join(__dirname,'resources','plantuml.jar');
  const proc=spawn(jre,['-DPLANTUML_SECURITY_PROFILE=SANDBOX','-jar',puml,'-tsvg','-pipe'],{stdio:['pipe','pipe','pipe']});
  let svg='';let stderr='';
  proc.stdout.on('data',(d)=>{svg+=d.toString();});
  proc.stderr.on('data',(d)=>{stderr+=d.toString();});
  return new Promise((resolve)=>{
    proc.on('close',(c)=>{
      if(c!==0||!svg){
        resolve({fel:stderr||'Plantuml returned error code '+c});
      }else{
        resolve({svg});
      }
    });
  });
});
ipcMain.handle('visa-spara-dialog',async(event,innehall,foreslagetNamn,filter)=>{
  const resultat=await dialog.showSaveDialog(win,{
    defaultPath:foreslagetNamn,
    filters:filter
  });
  if(!resultat.canceled&&resultat.filePath){
    fs.writeFileSync(resultat.filePath,innehall);
    return {ok:true,svartTill:resultat.filePath};
  }
  return {ok:false};
});
app.whenReady().then(createWindow);
app.on('window-all-closed',()=>{if(process.platform!=='darwin')app.quit();});
app.on('activate',()=>{if(BrowserWindow.getAllWindows().length===0)createWindow();});
