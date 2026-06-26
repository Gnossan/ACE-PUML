var senasteForfraganId = 0;

window.visaForhandsgranskning=async function(text){
  var dennaForfraganId = ++senasteForfraganId;
  const result=await aceAPI.renderPuml(text);
  if(dennaForfraganId !== senasteForfraganId){
    return;
  }
  const output=document.getElementById('preview-output');
  if(result.svg){
    output.innerHTML=result.svg;
  }else{
    output.innerText='Fel: '+result.fel;
  }
};
