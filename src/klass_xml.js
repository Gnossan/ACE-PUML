function klassTillDrawio(kalla) {
  var data = window.klassParser(kalla);
  var noder = [];
  var kanter = [];
  var idCounter = 2;
  var namnTillId = {};
  for (var i = 0; i < data.klasser.length; i++) {
    var k = data.klasser[i];
    var nodId = String(idCounter++);
    namnTillId[k.namn] = nodId;
    var etikett = k.namn;
    if (k.medlemmar.length > 0) {
      etikett += ': ' + k.medlemmar.join('; ');
    }
    noder.push({
      id: nodId,
      etikett: etikett,
      x: i * 220,
      y: 20,
      bredd: 180,
      hojd: 30 + k.medlemmar.length * 20,
      stil: "rounded=0;whiteSpace=wrap;html=1;align=left;verticalAlign=top;"
    });
  }
  for (var j = 0; j < data.relationer.length; j++) {
    var r = data.relationer[j];
    var kallaId = namnTillId[r.kalla];
    var malId = namnTillId[r.mal];
    if (kallaId && malId) {
      kanter.push({
        id: String(idCounter++),
        kallaId: kallaId,
        malId: malId,
        etikett: r.etikett,
        stil: r.typ === 'arv' ? "endArrow=block;endFill=0;html=1;" : "endArrow=open;html=1;"
      });
    }
  }
  return window.skapaMxGraphDokument(noder, kanter);
}
window.klassTillDrawio = klassTillDrawio;
