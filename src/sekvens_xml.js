function sekvensTillDrawio(kalla) {
  var data = window.sekvensParser(kalla);
  var noder = [];
  var kanter = [];
  var idCounter = 2;

  for (var i = 0; i < data.deltagare.length; i++) {
    noder.push({
      id: String(idCounter++),
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
    var kallaIndex = data.deltagare.indexOf(m.kalla);
    var malIndex = data.deltagare.indexOf(m.mal);

    if (kallaIndex >= 0 && malIndex >= 0) {
      kanter.push({
        id: String(idCounter++),
        kallaId: String(kallaIndex + 1),
        malId: String(malIndex + 1),
        etikett: m.etikett
      });
    }
  }

  return window.skapaMxGraphDokument(noder, kanter);
}

window.sekvensTillDrawio = sekvensTillDrawio;