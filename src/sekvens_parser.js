function sekvensParser(kalla) {
  var rader = kalla.split('\n');
  var deltagareMap = {};
  var deltagareLista = [];
  var meddelanden = [];

  var reg = /^(\w+)\s*(-+>>?)\s*(\w+)\s*:\s*(.*)$/;

  for (var i = 0; i < rader.length; i++) {
    var rad = rader[i].trim();

    if (/^\s*@enduml\s*$/.test(rad)) continue;
    if (/^\s*@startuml\s*$/.test(rad)) continue;

    if (!rad) continue;

    var match = rad.match(reg);
    if (match) {
      var kalla = match[1];
      var mal = match[3];
      var etikett = match[4];

      if (!deltagareMap[kalla]) {
        deltagareMap[kalla] = true;
        deltagareLista.push(kalla);
      }
      if (!deltagareMap[mal]) {
        deltagareMap[mal] = true;
        deltagareLista.push(mal);
      }

      meddelanden.push({kalla: kalla, mal: mal, etikett: etikett});
    }
  }

  return {deltagare: deltagareLista, meddelanden: meddelanden};
}

window.sekvensParser = sekvensParser;