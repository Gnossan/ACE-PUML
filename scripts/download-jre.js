const fs=require('fs'),https=require('https'),{execSync}=require('child_process'),path=require('path');
const JRE_URL='https://github.com/Gnossan/ACE-PUML/releases/download/v1.0.0-jre/jre-macos-arm64.tar.gz';
const PLANTUML_URL='https://github.com/Gnossan/ACE-PUML/releases/download/v1.0.0-jre/plantuml.jar';
const RES=path.join(__dirname,'..','resources'),JRE=path.join(RES,'jre');
if(fs.existsSync(JRE)){console.log('JRE finns redan.');process.exit(0);}
fs.mkdirSync(RES,{recursive:true});
function dl(u,d,maxRedirects=5){return new Promise((ok,no)=>{if(maxRedirects<0){no(new Error('För många omdirigeringar'));return;}https.get(u,r=>{if(r.statusCode===301||r.statusCode===302){const redirectUrl=r.headers.location;dl(redirectUrl,d,maxRedirects-1).then(ok).catch(no);return;}if(r.statusCode!==200){no(new Error('HTTP '+r.statusCode));return;}const f=fs.createWriteStream(d);r.pipe(f);f.on('finish',()=>{f.close();ok();});}).on('error',no);});}
async function main(){const jp=path.join(RES,'jre.tar.gz');await dl(JRE_URL,jp);execSync('tar -xzf '+jp+' -C '+RES);fs.unlinkSync(jp);console.log('JRE installerad.');const pp=path.join(RES,'plantuml.jar');await dl(PLANTUML_URL,pp);console.log('plantuml.jar installerad.');}
main().catch(e=>{console.error('Fel:',e.message);process.exit(1);});