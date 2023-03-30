/** PÁGINA PRINCIPAL DE LA CALCULADORA (MENÚ) */


//Eliminar "greeting" cuando el usuario de click a la página
document.body.addEventListener('mouseup', function(e) {
  document.getElementById("greeting").style.display = "none";
});


/** EN CASO DE NECESITAR GEOGEBRA
var parameters = {
  "id":"ggbApplet",
  "appName":"classic",
  "width":750,
  "height":745,
  "showToolBar":false,
  "borderColor":null,
  "showMenuBar":false,
  "allowStyleBar":false,
  "showAlgebraInput":false,
  "enableLabelDrags":false,
  "enableShiftDragZoom":true,
  "capturingThreshold":null,
  "showToolBarHelp":false,
  "errorDialogsActive":false,
  "showTutorialLink":false,
  "showLogging":false,
  "useBrowserForJS":false,
  "enableUndoRedo":false,
  "filename": "./grid.ggb"
}
let applet = new GGBApplet(parameters, '5.0', 'applet_container');
window.onload = function() { applet.inject('grid'); } */
