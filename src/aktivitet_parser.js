function aktivitetParser(kalla) {
  var rader = kalla.split('\n');
  var steg = [];
  for (var i = 0; i < rader.length; i++) {
    var rad = rader[i].trim();
    if (rad === '@startuml' || rad === '@enduml' || rad === '') continue;
    if (rad === 'start') {
      steg.push({typ: 'start'});
      continue;
    }
    if (rad === 'stop') {
      steg.push({typ: 'stop'});
      continue;
    }
    var match = rad.match(/^:(.+);$/);
    if (match) {
      steg.push({typ: 'aktivitet', etikett: match[1].trim()});
      continue;
    }
  }
  return {steg: steg};
}
window.aktivitetParser = aktivitetParser;