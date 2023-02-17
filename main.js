import { Calculator } from './modules/calculator.js';

let calculator = new Calculator();

let displayError = false;

document.getElementById("initWarning").animation = "dropAndFade 30s ease forwards";

document.body.addEventListener('mouseup', function(e) {
  document.getElementById("initWarning").style.display = "none";
  if(document.getElementById("errorWarning").style.display == "block"){
    document.getElementById("errorWarning").style.display = "none";
  }
});

document.getElementById("linearM").checked = true;
resetFields();
drawCanvas();

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
  relativeError(res);
});

//Lastrange 1sd Order
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
  relativeError(res);
});

function checkOnlyNumbers(x0, fx0, x1, fx1, x2, fx2, x, hasX2){
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

function drawCanvas() {
  var canvas = document.getElementById("grid");
  var ctx = canvas.getContext("2d");
  const x = canvas.width;
  const y = canvas.height;
  let incX = x / 20;
  let incY = y / 20;
  ctx.clearRect(0,0, x, y);
  ctx.strokeStyle = "white";
  for (let i = 0; i <= x; i+= incX) {
    ctx.moveTo(i,0);
    ctx.lineTo(i,y);
    ctx.stroke();
  }
  for (let i = 0; i <= y; i+= incY) {
    ctx.moveTo(0,i+0.2);
    ctx.lineTo(x,i+0.2);
    ctx.stroke();
  }
}
