const {app,BrowserWindow,ipcMain}=require('electron');
const path=require('path'),{spawn}=require('child_process');
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
ipcMain.on('render-puml',(event,code)=>{
  const jre=path.join(__dirname,'resources','jre','bin','java');
  const puml=path.join(__dirname,'resources','plantuml.jar');
  const proc=spawn(jre,['-DPLANTUML_SECURITY_PROFILE=SANDBOX','-jar',puml,'-tsvg','-pipe'],{stdio:['pipe','pipe','pipe']});
  let svg='';
  proc.stdout.on('data',(d)=>{svg+=d.toString();});
  proc.stderr.on('data',(d)=>{console.error(d.toString());});
  proc.on('close',(c)=>{if(c===0&&win)win.webContents.send('render-result',svg);});
  proc.stdin.write(code);proc.stdin.end();
});
app.whenReady().then(createWindow);
app.on('window-all-closed',()=>{if(process.platform!=='darwin')app.quit();});
app.on('activate',()=>{if(BrowserWindow.getAllWindows().length===0)createWindow();});
