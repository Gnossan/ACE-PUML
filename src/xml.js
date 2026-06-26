const { xmlEscape } = require('./xml_escape');

function skapaMxGraphDokument(noder, kanter) {
  var xml = '<mxGraphModel dx="1359" dy="768" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="827" pageHeight="1169" math="0" shadow="0">\n';
  xml += '  <root>\n';
  xml += '    <mxCell id="0"/>\n';
  xml += '    <mxCell id="1" parent="0"/>\n';

  for (var i = 0; i < noder.length; i++) {
    var n = noder[i];
    xml += '    <mxCell id="' + n.id + '" value="' + xmlEscape(n.etikett) + '" style="ellipse;whiteSpace=wrap;html=1;" parent="1" vertex="1">\n';
    xml += '      <mxGeometry x="' + n.x + '" y="' + n.y + '" width="' + n.bredd + '" height="' + n.hojd + '" as="geometry"/>\n';
    xml += '    </mxCell>\n';
  }

  for (var j = 0; j < kanter.length; j++) {
    var k = kanter[j];
    var etikett = k.etikett ? (' value="' + xmlEscape(k.etikett) + '"') : '';
    xml += '    <mxCell id="' + k.id + '" edge="1" parent="1" source="' + k.kallaId + '" target="' + k.malId + '"' + etikett + '/>\n';
  }

  xml += '  </root>\n';
  xml += '</mxGraphModel>';
  return xml;
}

module.exports.skapaMxGraphDokument = skapaMxGraphDokument;
