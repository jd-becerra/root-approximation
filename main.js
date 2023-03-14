import { Calculator } from './modules/calculator.js';

let calculator = new Calculator();

document.getElementById("initWarning").animation = "dropAndFade 30s ease forwards";

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
window.onload = function() { applet.inject('grid'); } 

document.body.addEventListener('mouseup', function(e) {
  document.getElementById("initWarning").style.display = "none";
  if(document.getElementById("errorWarning").style.display == "block"){
    document.getElementById("errorWarning").style.display = "none";
  }
});

document.getElementById("linearM").checked = true;
resetFields();

const radioButtons = document.querySelectorAll('input[name="methodSelector"]');
for (const radioButton of radioButtons) {
  radioButton.addEventListener('change', function(e) {
    if (this.checked) {
	selectMethod(this.value);
    }
  });
}

document.getElementById("reset").addEventListener('click', function(e) {
  resetFields();
});

function selectMethod(methodName) {
  let methods = document.getElementsByClassName("method");
  for (let method of methods) {
    method.style.display = "none";
  }
  let selectedMethod = document.getElementById(methodName);
  selectedMethod.style.display = "block";
  document.getElementById("trueVal").value = 0;
  document.getElementById("errRel").value = "";  
  document.getElementById("calculateError").style.display = "none";
  return;
}

function drawPoints(x0, y0, x1, y1, x2, y2, x, y, hasX2) {
  ggbApplet.reset();
  let scaleFactorX = (hasX2) ? (x0+x1+x2+x) : (x0+x1+x);
  let scaleFactorY = (hasX2) ? (y0+y1+y2+y) : (y0+y1+y);
  if (scaleFactorY==0) { scaleFactorY = 1;}
  let maxX = (hasX2) ? Math.max(...[x0, x1, x2, x]) : Math.max(...[x0, x1, x]);
  let minX = (hasX2) ? Math.min(...[x0, x1, x2, x]) : Math.min(...[x0, x1, x]);
  let maxY = (hasX2) ? Math.max(...[y0, y1, y2, y]) : Math.max(...[y0, y1, y]);
  let minY = (hasX2) ? Math.min(...[y0, y1, y2, y]) : Math.min(...[y0, y1, y]);
  let maxFactor = Math.max(scaleFactorX, scaleFactorY);
  ggbApplet.evalCommand(`ZoomIn(-${minX+scaleFactorX}, -${minY+scaleFactorY}, ${maxX+scaleFactorX}, ${maxY+scaleFactorY})`);
  ggbApplet.evalCommand(`P0=(${x0},${y0})`);
  ggbApplet.evalCommand(`P1=(${x1},${y1})`);
  ggbApplet.evalCommand(`P=(${x},${y})`);
  let points = [[x, 'P'],[x0, 'P0'],[x1, 'P1'] ];
  if(!hasX2){
    let sortedPoints = points.sort(function(a,b) { return a[0]-b[0]});
    ggbApplet.evalCommand(`s0 = Segment(${sortedPoints[0][1]}, ${sortedPoints[1][1]})`);
    ggbApplet.setLabelVisible('s0', false);
    ggbApplet.evalCommand(`s1 = Segment(${sortedPoints[1][1]}, ${sortedPoints[2][1]})`);
    ggbApplet.setLabelVisible('s1', false);
  } else {
    ggbApplet.evalCommand(`P2=(${x2},${y2})`); 
    points.push([x2, 'P2']);
    let sortedPoints = points.sort(function(a,b) { return a[0]-b[0]});
    ggbApplet.evalCommand(`s0 = Segment(${sortedPoints[0][1]}, ${sortedPoints[1][1]})`);
    ggbApplet.setLabelVisible('s0', false); 
    ggbApplet.evalCommand(`s1 = Segment(${sortedPoints[1][1]}, ${sortedPoints[2][1]})`);
    ggbApplet.setLabelVisible('s1', false);
    ggbApplet.evalCommand(`s2 = Segment(${sortedPoints[2][1]}, ${sortedPoints[3][1]})`);
    ggbApplet.setLabelVisible('s2', false); 
  }
  ggbApplet.evalCommand('SetColor(P, Red)');
  ggbApplet.evalCommand('SetCaption(P, "Interpolación")');
  let usedMethod =  (x == minX || x == maxX) ? "Extrapolación" : "Interpolación";
  ggbApplet.evalCommand(`SetCaption(P, "${usedMethod}")`);
  return;
}

window.drawPoints=drawPoints;

//Linear Interpolation Method
document.getElementById("resultLinear").addEventListener('click', function(e) {
  let x0L = document.getElementById('x0L').value;
  let fx0L = document.getElementById('fx0L').value;
  let x1L = document.getElementById('x1L').value;
  let fx1L = document.getElementById('fx1L').value;
  let xL = document.getElementById('xL').value;
  let onlyNum = checkOnlyNumbers(x0L,fx0L, x1L, fx1L,"0", "0", xL, false);
  if (!onlyNum) {
    raiseUserError();
    return;
  }
  let res = calculator.linearInterpolation(+x0L,+fx0L,+x1L,+fx1L,+xL);
  document.getElementById("fxL").value = res;
  drawPoints(+x0L,+fx0L,+x1L,+fx1L,0, 0, +xL, +res, false);
  relativeError(res);
});

//Cuadratic Interpolation Method
document.getElementById("resultCuadratic").addEventListener('click', function(e) {
  let x0C = document.getElementById('x0C').value;
  let fx0C = document.getElementById('fx0C').value;
  let x1C = document.getElementById('x1C').value;
  let fx1C = document.getElementById('fx1C').value;
  let x2C = document.getElementById('x2C').value;
  let fx2C = document.getElementById('fx2C').value;
  let xC = document.getElementById('xC').value;
  let onlyNum = checkOnlyNumbers(x0C,fx0C, x1C, fx1C, x2C,fx2C, xC, true);
  if (!onlyNum) {
    raiseUserError();
    return;
  }
  let res = calculator.cuadraticInterpolation(+x0C,+fx0C,+x1C,+fx1C,+x2C,+fx2C,+xC);
  document.getElementById("fxC").value = res;
  drawPoints(+x0C,+fx0C,+x1C,+fx1C,+x2C,+fx2C,+xC,+res,true);
  relativeError(res);
});

//Lagrange 1sd Order
document.getElementById("resultLagrange1").addEventListener('click', function(e) {
  let x0L1 = document.getElementById('x0L1').value;
  let fx0L1 = document.getElementById('fx0L1').value;
  let x1L1 = document.getElementById('x1L1').value;
  let fx1L1 = document.getElementById('fx1L1').value;
  let xL1 = document.getElementById('xL1').value;
  let onlyNum = checkOnlyNumbers(x0L1,fx0L1, x1L1, fx1L1,"0", "0", xL1, false);
  if (!onlyNum) {
    raiseUserError();
    return;
  }
  let res = calculator.lagrange1stInterpolation(+x0L1,+fx0L1,+x1L1,+fx1L1,+xL1);
  document.getElementById("fxL1").value = res;
  drawPoints(+x0L1,+fx0L1,+x1L1,+fx1L1,0,0,xL1, +res, false);
  relativeError(res);
});

//Lagrange 2nd Order Interpolation Method
document.getElementById("resultLagrange2").addEventListener('click', function(e) {
  let x0L2 = document.getElementById('x0L2').value;
  let fx0L2 = document.getElementById('fx0L2').value;
  let x1L2 = document.getElementById('x1L2').value;
  let fx1L2 = document.getElementById('fx1L2').value;
  let x2L2 = document.getElementById('x2L2').value;
  let fx2L2 = document.getElementById('fx2L2').value;
  let xL2 = document.getElementById('xL2').value;
  let onlyNum = checkOnlyNumbers(x0L2,fx0L2, x1L2, fx1L2, x2L2,fx2L2, xL2, true);
  if (!onlyNum) {
    raiseUserError();
    return;
  }
  let res = calculator.lagrange2ndInterpolation(+x0L2,+fx0L2,+x1L2,+fx1L2,+x2L2,+fx2L2,+xL2);
  document.getElementById("fxL2").value = res;
  drawPoints(+x0L2,+fx0L2,+x1L2,+fx1L2,+x2L2,+fx2L2,+xL2,+res,true);
  relativeError(res);
});

export function checkOnlyNumbers(x0, fx0, x1, fx1, x2, fx2, x, hasX2){
  if (x0 == x1 || x == x0 ||x == x1 || ((x == x2 || x1==x2 || x2==x0) && hasX2)) { return false;}
  let checkNumbers = [x0, fx0, x1, fx1, x2, fx2, x];
  for(let i = 0; i < 7; i++){
    if (isNumberValid(checkNumbers[i])) {return false;}
  }
  return true;
}

function isNumberValid(val) {
  if (val == "0") { return false;}
  return (isNaN(val) && isNaN(parseFloat(val)) || val.trim() == "" || !val);
}

function raiseUserError(message) {
  document.getElementById("errorWarning").style.display = "block";
  return;
}

function resetFields() {
  let xArr = document.querySelectorAll('input[name^="x"]');
  xArr.forEach(function (x) { x.value = 0;});
  let fxArr = document.querySelectorAll('input[name^="fx"]');
  fxArr.forEach(function (fx) { if (fx.name == "fx") {fx.value = "";} else {fx.value = 0;} });
  document.getElementById("trueVal").value = 0;
  document.getElementById("errRel").value = "";
  document.getElementById("calculateError").style.display = "none";
  return;
}
window.resetFields=resetFields;

function relativeError(aproxVal) {
  document.getElementById("trueVal").value = 0;
  document.getElementById("errRel").value = "";
  document.getElementById("calculateError").style.display = "block";
  document.getElementById("errorRes").addEventListener("click", function(e) {
    let trueVal = document.getElementById("trueVal").valueAsNumber;
    let onlyNum = isNumberValid(trueVal.toString());
    if (onlyNum) {
      raiseUserError();
      return;
    }
    let res = calculator.relativeError(+trueVal, +aproxVal);
    if (!res) {res = 0;}
    document.getElementById("errRel").value = res;
  });
}

