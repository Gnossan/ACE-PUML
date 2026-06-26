function sekvensTillDrawio(kalla) {
  var data = window.sekvensParser(kalla);
  var noder = [];
  var kanter = [];
  var idCounter = 2;
  var deltagareTillId = {};

  for (var i = 0; i < data.deltagare.length; i++) {
    var nodId = String(idCounter++);
    deltagareTillId[data.deltagare[i]] = nodId;
    noder.push({
      id: nodId,
      etikett: data.deltagare[i],
      x: i * 200,
      y: 20,
      bredd: 120,
      hojd: 40,
      stil: "whiteSpace=wrap;html=1;perimeter=rectanglePerimeter"
    });
  }

  for (var j = 0; j < data.meddelanden.length; j++) {
    var m = data.meddelanden[j];
    var kallaId = deltagareTillId[m.kalla];
    var malId = deltagareTillId[m.mal];

    if (kallaId && malId) {
      kanter.push({
        id: String(idCounter++),
        kallaId: kallaId,
        malId: malId,
        etikett: m.etikett
      });
    }
  }

  return window.skapaMxGraphDokument(noder, kanter);
}

window.sekvensTillDrawio = sekvensTillDrawio;