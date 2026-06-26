var SVG_FILTER = { name: 'SVG', extensions: ['svg'] };
var PNG_FILTER = { name: 'PNG', extensions: ['png'] };
var DRAWIO_FILTER = { name: 'draw.io', extensions: ['drawio'] };

window.exporteraSVG = function exporteraSVG(svgInnehall) {
  return window.aceAPI.sparaFil(svgInnehall, 'diagram.svg', [SVG_FILTER]);
};

window.exporteraPNG = function exporteraPNG(pngDataUrl) {
  return window.aceAPI.sparaFil(pngDataUrl, 'diagram.png', [PNG_FILTER]);
};

window.exporteraDrawio = function exporteraDrawio(drawioXml) {
  return window.aceAPI.sparaFil(drawioXml, 'diagram.drawio', [DRAWIO_FILTER]);
};