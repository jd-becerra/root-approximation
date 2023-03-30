export class Calculator {
 //Falta valores para pedir la funcion al usuario que se tranformaran en lo marcado por funcion//
 biseccion(xL, xu, typevalor, optionvalue){
  let errorrelativo= []
  xr = (xL + xu)/2;
  error = (xr - valorant)/xr;
  errorrelativo.push(error);
  valorant = xr;
  if (typevalor == 1) {
  for (let index = 1; index >= optionvalue; index++) {
    xr = (xL + xu)/2;
    error = (xr - valorant)/xr;
    errorrelativo.push(error);
    if('funcion'*xr < 'funcion'*xL) xL = xr 
    else xu = xr
  }
} else if (typevalor == 2){
  for (let index = 1; error < optionvalue; index++) {
    xr = (xL + xu)/2;
    error = (xr - valorant)/xr;
    errorrelativo.push(error);
    if('funcion'*xr < 'funcion'*xL) xL = xr 
    else xu = xr
  }
}
else {
 return 'Ingresar valor'
}
 }
  cuadraticInterpolation(x0, fx0, x1, fx1, x2, fx2, x) {
    let b0 = fx0;
    let b1 = (fx1 - b0) / (x1 - x0);
    let b2 = (((fx2 - b0) / (x2 - x0)) - b1) / (x2 - x1);
    let f2x = b0 + (b1*(x - x0)) + ((b2*(x - x0)) * (x - x1));
    if (f2x==0) return 0;
    return (Number.isInteger(f2x)) ? f2x : this.roundFloat(f2x, this.countDecimals(fx2)+ 1);
  }

  lagrange1stInterpolation(x0, fx0, x1, fx1, x) {
    let op1 = ((x-x1)/(x0-x1)) * fx0;
    let op2 = ((x-x0)/(x1-x0)) * fx1;
    let fx = op1 + op2;
    if (fx==0) return 0;
    return (Number.isInteger(fx)) ? fx : this.roundFloat(fx, this.countDecimals(fx1)+1);
  }

  lagrange2ndInterpolation(x0, fx0, x1, fx1, x2, fx2, x)  {
    let op1 = (((x-x1)*(x-x2)) / ((x0-x1)*(x0-x2))) * fx0;
    let op2 = (((x-x0)*(x-x2)) / ((x1-x0)*(x1-x2))) * fx1;
    let op3 = (((x-x0)*(x-x1)) / ((x2-x0)*(x2-x1))) * fx2;
    let fx = op1 + op2 + op3;
    console.log(fx);
    if (fx==0) return 0;
    return (Number.isInteger(fx)) ? fx : this.roundFloat(fx, this.countDecimals(fx1)+1);
  }

  relativeError(trueVal, aproxVal) {
    if(trueVal == 0 && aproxVal == 0) { return 0;}
    let et = ((trueVal - aproxVal) / trueVal) * 100;
    if (!(Number.isInteger(et)) || et == 0) {
      et = this.roundPercentage(et);
    }
    return et;
  }

  roundPercentage(floatVal) {
    let floatStr = floatVal.toString();
    let pointIndex = floatStr.indexOf('.');
    let extraDecimals = (floatStr[pointIndex+5] == 0) ? 2 : 3;
    if (floatStr[pointIndex + 1] == '0') {
      for(let i = pointIndex; i < floatStr.length; i++)
        {if(floatStr[i] == '0') {extraDecimals++;}}
    }
    let floatStrFixed = floatStr.slice(0, floatStr.indexOf('.') + extraDecimals);
    return +(floatStrFixed); 
  }

  roundFloat(floatVal, extraDecimals) {
    extraDecimals = (extraDecimals === 0) ?  3 : extraDecimals;
    extraDecimals = (extraDecimals == 1) ? 3 : extraDecimals;
    let floatStr = floatVal.toString();
    let pointIndex = floatStr.indexOf('.');
    if (floatStr[pointIndex + 1] == '0') {
      for(let i = pointIndex; i < floatStr.length; i++)
        {if(floatStr[i] == '0') {extraDecimals++;}}
    }
    let floatStrFixed = floatStr.slice(0, floatStr.indexOf('.') + extraDecimals);
    return +(floatStrFixed);
  }

  countDecimals(floatVal) {
    if(floatVal == 0 || Math.floor(floatVal.valueOf()) === floatVal.valueOf()) return 0;
    let floatStr = floatVal.toString();
    let decimals = floatStr.split(".")[1].length || 0;
    return (decimals != 0) ? decimals : 2;
  }
}

//let test = new Calculator();
//console.log(test.cuadraticInterpolation(94,929,205,902,371, 860, 251));
