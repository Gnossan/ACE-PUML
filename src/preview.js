window.visaForhandsgranskning=function(text){
  aceAPI.renderPuml(text);
  aceAPI.onRenderResult((svg)=>{
    document.getElementById('preview-output').innerHTML=svg;
  });
};
