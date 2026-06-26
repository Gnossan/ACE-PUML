function klassParser(kalla) {
  var rader = kalla.split('\n');
  var noder = [];
  var kanter = [];
  var nuvarandeKlass = null;
  for (var i = 0; i < rader.length; i++) {
    var rad = rader[i].trim();
    if (rad === '@startuml' || rad === '@enduml' || rad === '') continue;
    var openMatch = rad.match(/^class\s+(\w+)\s*\{$/);
    if (openMatch) {
      nuvarandeKlass = openMatch[1];
      noder.push({ namn: nuvarandeKlass });
      continue;
    }
    var closeMatch = rad === '}';
    if (closeMatch) {
      nuvarandeKlass = null;
      continue;
    }
    if (nuvarandeKlass) {
      var attMatch = rad.match(/^(\+|-|#)?(\w+)\s*:\s*(.*)$/);
      if (attMatch) continue;
      var metMatch = rad.match(/^(\+|-|#)?(\w+)\s*\((.*)\)\s*(:\s*\w+)?$/);
      if (metMatch) continue;
      var extendsMatch = rad.match(/^(.+)\s*-->\s*(.+)$/);
      if (extendsMatch) {
        kanter.push({ namn: extendsMatch[1].trim(), mal: extendsMatch[2].trim(), stil: 'edgeStyle=orthogonalEdgeStyle;endArrow=block;endFill=1;' });
        continue;
      }
      var assocMatch = rad.match(/^(.+)\s*-->\s*(.+)$/);
      if (assocMatch && !extendsMatch) {
        kanter.push({ namn: assocMatch[1].trim(), mal: assocMatch[2].trim(), stil: '' });
        continue;
      }
    }
  }
  return { noder: noder, kanter: kanter };
}
window.klassParser = klassParser;