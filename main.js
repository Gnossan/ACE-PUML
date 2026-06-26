const {app,BrowserWindow,ipcMain,safeStorage}=require('electron');
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
ipcMain.handle('render-puml-png',async(event,code)=>{
  const jre=path.join(__dirname,'resources','jre','bin','java');
  const puml=path.join(__dirname,'resources','plantuml.jar');
  const proc=spawn(jre,['-DPLANTUML_SECURITY_PROFILE=SANDBOX','-jar',puml,'-tpng','-pipe'],{stdio:['pipe','pipe','pipe']});
  let chunks=[];let stderr='';
  proc.stdout.on('data',(d)=>{chunks.push(d);});
  proc.stderr.on('data',(d)=>{stderr+=d.toString();});
  return new Promise((resolve)=>{
    proc.on('close',(c)=>{
      if(c!==0||chunks.length===0){
        resolve({fel:stderr||'Plantuml returned error code '+c});
      }else{
        var buffer=Buffer.concat(chunks);
        resolve({png:buffer.toString('base64')});
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
const apiKeyFil=path.join(app.getPath('userData'),'api-nyckel.json');
function losaNyckel(){
  try{
    if(!fs.existsSync(apiKeyFil)) return null;
    const data=JSON.parse(fs.readFileSync(apiKeyFil,'utf8'));
    const krypterad=data.krypterad;
    if(!krypterad) return null;
    const buffer=Buffer.from(krypterad,'base64');
    return safeStorage.decryptString(buffer);
  }catch(e){return null;}
}
ipcMain.handle('ai-spara-nyckel',async(event,krypteradNyckel)=>{
  fs.writeFileSync(apiKeyFil,JSON.stringify({krypterad:krypteradNyckel}));
  return {ok:true};
});
ipcMain.handle('ai-ladda-inställningar',async()=>{
  return {finnsNyckel:fs.existsSync(apiKeyFil)};
});
ipcMain.handle('ai-chatt-meddelande',async(event,message,inkluderaKod,kod)=>{
  const nyckel=losaNyckel();
  if(!nyckel) return {fel:'API-nyckel saknas'};
  let text=message;
  if(inkluderaKod&&kod) text+='\n\n```plantuml\n'+kod+'\n```';
  const response=await fetch('https://api.anthropic.com/v1/messages',{
    method:'POST',
    headers:{
      'Content-Type':'application/json',
      'x-api-key':nyckel,
      'anthropic-version':'2023-06-01'
    },
    body:JSON.stringify({model:'claude-3-5-sonnet-20241022',max_tokens:4096,messages:[{role:'user',content:text}]})
  });
  if(!response.ok){
    const err=await response.json();
    return {fel:err.error?.message||'Anthropic API-fel'};
  }
  const data=await response.json();
  return {svar:data.content[0].text};
});
app.whenReady().then(createWindow);
app.on('window-all-closed',()=>{if(process.platform!=='darwin')app.quit();});
app.on('activate',()=>{if(BrowserWindow.getAllWindows().length===0)createWindow();});