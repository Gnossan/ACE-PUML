window.visaForhandsgranskning=async function(text){
  const result=await aceAPI.renderPuml(text);
  const output=document.getElementById('preview-output');
  if(result.svg){
    output.innerHTML=result.svg;
  }else{
    output.innerText='Fel: '+result.fel;
  }
};
