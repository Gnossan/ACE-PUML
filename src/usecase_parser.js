function usecaseParser(kalla) {
  var deltagare = [];
  var relationer = [];
  var rader = kalla.split('\n');
  for (var i = 0; i < rader.length; i++) {
    var rad = rader[i].trim();
    if (rad === '' || rad === '@startuml' || rad === '@enduml') continue;

    var akt = rad.match(/^actor\s+(\w+)$/);
    if (akt) {
      var redan = false;
      for (var ai = 0; ai < deltagare.length; ai++) {
        if (deltagare[ai].namn === akt[1]) { redan = true; break; }
      }
      if (!redan) {
        deltagare.push({namn: akt[1], typ: 'aktor'});
      }
    }

    var uca = rad.match(/^usecase\s+"([^"]+)"\s+as\s+(\w+)$/);
    if (uca) {
      var redanU = false;
      for (var ui = 0; ui < deltagare.length; ui++) {
        if (deltagare[ui].namn === uca[2]) { redanU = true; break; }
      }
      if (!redanU) {
        deltagare.push({namn: uca[2], etikett: uca[1], typ: 'usecase'});
      }
    }

    var rel = rad.match(/^(\w+)\s*-+>\s*(\w+)\s*(?::\s*(.+))?$/);
    if (rel) {
      relationer.push({kalla: rel[1], mal: rel[2], etikett: (rel[3] ? rel[3].trim() : '')});
    }
  }
  return {deltagare: deltagare, relationer: relationer};
}

function usecaseTillDrawio(kalla) {
  var data = window.usecaseParser(kalla);
  var deltagareXml = '';
  var kanterXml = '';
  var idCounter = 2;
  var namnTillId = {};
  var bredd = 140;
  for (var i = 0; i < data.deltagare.length; i++) {
    var d = data.deltagare[i];
    var nodId = String(idCounter++);
    namnTillId[d.namn] = nodId;
    var stil = d.typ === 'aktor' ? 'shape=actor;whiteSpace=wrap;html=1;' : 'ellipse;whiteSpace=wrap;html=1;';
    var etikett = window.xmlEscape(d.etikett || d.namn);
    var x = (i % 4) * (bredd + 60) + 40;
    var y = Math.floor(i / 4) * 120 + 40;
    deltagareXml += '    <mxCell id="' + nodId + '" value="' + etikett + '" style="' + stil + '" parent="1" vertex="1">\n';
    deltagareXml += '      <mxGeometry x="' + x + '" y="' + y + '" width="' + bredd + '" height="50" as="geometry"/>\n';
    deltagareXml += '    </mxCell>\n';
  }
  for (var j = 0; j < data.relationer.length; j++) {
    var r = data.relationer[j];
    var kallaId = namnTillId[r.kalla];
    var malId = namnTillId[r.mal];
    if (kallaId && malId) {
      var etikett = r.etikett ? (' value="' + window.xmlEscape(r.etikett) + '"') : '';
      kanterXml += '    <mxCell id="' + String(idCounter++) + '" edge="1" parent="1" source="' + kallaId + '" target="' + malId + '"' + etikett + ' style="endArrow=block;endFill=0;html=1;"><mxGeometry relative="1" as="geometry"/></mxCell>\n';
    }
  }
  var xml = '<mxGraphModel dx="1359" dy="768" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="827" pageHeight="1169" math="0" shadow="0">\n';
  xml += '  <root>\n';
  xml += '    <mxCell id="0"/>\n';
  xml += '    <mxCell id="1" parent="0"/>\n';
  xml += deltagareXml;
  xml += kanterXml;
  xml += '  </root>\n';
  xml += '</mxGraphModel>';
  return xml;
}

window.usecaseParser = usecaseParser;
window.usecaseTillDrawio = usecaseTillDrawio;
