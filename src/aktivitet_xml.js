function aktivitetTillDrawio(kalla) {
  var parsed = window.aktivitetParser(kalla);
  var steg = parsed.steg;
  var noder = [];
  for (var i = 0; i < steg.length; i++) {
    var s = steg[i];
    var id = 'n' + String(i + 1).padStart(3, '0');
    var x = 40;
    var y = i * 80 + 20;
    var bredd = 160;
    var hojd = 40;
    var stil;
    var etikett = '';
    if (s.typ === 'start') {
      stil = 'ellipse;whiteSpace=wrap;html=1;fillColor=#000000;fontColor=#FFFFFF;';
      etikett = 'Start';
    } else if (s.typ === 'stop') {
      stil = 'ellipse;whiteSpace=wrap;html=1;fillColor=#000000;fontColor=#FFFFFF;';
      etikett = 'Stop';
    } else if (s.typ === 'aktivitet') {
      stil = 'rounded=1;whiteSpace=wrap;html=1;';
      etikett = s.etikett;
    }
    noder.push({id: id, x: x, y: y, bredd: bredd, hojd: hojd, etikett: etikett, stil: stil});
  }
  var kanter = [];
  for (var j = 0; j < steg.length - 1; j++) {
    var eId = 'e' + String(j + 1).padStart(3, '0');
    kanter.push({id: eId, kallaId: noder[j].id, malId: noder[j + 1].id, stil: 'edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;'});
  }
  return window.skapaMxGraphDokument(noder, kanter);
}
window.aktivitetTillDrawio = aktivitetTillDrawio;