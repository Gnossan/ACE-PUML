function klassTillDrawio(kalla) {
  var data = window.klassParser(kalla);
  var noder = [];
  var kanter = [];
  var idCounter = 2;
  var namnTillId = {};
  var x = 20, y = 20;
  for (var i = 0; i < data.noder.length; i++) {
    var nod = data.noder[i];
    var nodId = String(idCounter++);
    namnTillId[nod.namn] = nodId;
    noder.push({
      id: nodId,
      etikett: nod.namn,
      x: x,
      y: y,
      bredd: 200,
      hojd: 100,
      stil: "swimlane;whiteSpace=wrap;html=1;"
    });
    x += 250;
    if (x > 600) { x = 20; y += 150; }
  }
  for (var j = 0; j < data.kanter.length; j++) {
    var k = data.kanter[j];
    var kallaId = namnTillId[k.namn];
    var malId = namnTillId[k.mal];
    if (kallaId && malId) {
      kanter.push({
        id: String(idCounter++),
        kallaId: kallaId,
        malId: malId,
        etikett: '',
        stil: k.stil
      });
    }
  }
  return window.skapaMxGraphDokument(noder, kanter);
}
window.klassTillDrawio = klassTillDrawio;