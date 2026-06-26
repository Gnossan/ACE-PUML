function klassParser(kalla) {
  var rader = kalla.split('\n');
  var klasser = [];
  var relationer = [];
  var nuvarandeKlass = null;
  for (var i = 0; i < rader.length; i++) {
    var rad = rader[i].trim();
    if (rad === '@startuml' || rad === '@enduml' || rad === '') continue;
    var openMatch = rad.match(/^class\s+(\w+)\s*\{$/);
    if (openMatch) {
      nuvarandeKlass = { namn: openMatch[1], medlemmar: [] };
      klasser.push(nuvarandeKlass);
      continue;
    }
    if (rad === '}') {
      nuvarandeKlass = null;
      continue;
    }
    if (nuvarandeKlass) {
      nuvarandeKlass.medlemmar.push(rad);
      continue;
    }
    var noBodyMatch = rad.match(/^class\s+(\w+)\s*$/);
    if (noBodyMatch) {
      klasser.push({ namn: noBodyMatch[1], medlemmar: [] });
      continue;
    }
    var relMatch = rad.match(/^(\w+)\s+(--\|>|\.\.>|-+>)\s+(\w+)\s*(?::\s*(.*))?$/);
    if (relMatch) {
      var typ = relMatch[2] === '--|>' ? 'arv' : 'association';
      relationer.push({ kalla: relMatch[1], mal: relMatch[3], typ: typ, etikett: relMatch[4] || '' });
      continue;
    }
  }
  return { klasser: klasser, relationer: relationer };
}
window.klassParser = klassParser;
