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
  proc.stdin.write(code);
  proc.stdin.end();
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
  proc.stdin.write(code);
  proc.stdin.end();
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
    const krypterad=data.anthropic;
    if(!krypterad) return null;
    const buffer=Buffer.from(krypterad,'base64');
    return safeStorage.decryptString(buffer);
  }catch(e){return null;}
}
ipcMain.handle('spara-api-nyckel',async(event,nyckel)=>{
  const krypterad=safeStorage.encryptString(nyckel);
  fs.writeFileSync(apiKeyFil,JSON.stringify({anthropic:krypterad.toString('base64')}));
  return {ok:true};
});
ipcMain.handle('hamta-nyckel-status',async()=>{
  return {sparad:fs.existsSync(apiKeyFil)};
});
ipcMain.handle('skicka-ai-meddelande',async(event,message,inkluderaKod,kod)=>{
  const nyckel=losaNyckel();
  if(!nyckel) return {fel:'Ingen API-nyckel sparad.'};
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