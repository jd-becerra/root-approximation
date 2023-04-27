/** METODO DE BISECCIÓN*/

window.onload = () => {

  //Eliminar los diálogos de Inicio y de Error cuando el usuario haga click en la página
  document.addEventListener('mouseup', function(e) {
    document.getElementById("initWarning").style.display = "none";
    let warnings = document.getElementsByClassName('warning');  
    for (let warning of warnings) {
      warning.style.display = "none";
    }
  });

  resetValues(); 
  
  //Mostrar criterio de inicio deseado
  let startMethods = document.getElementById("startMethods");
  startMethods.value = '0';
  startMethods.addEventListener('change', function(e) {
    if(this.value == '0') {
      document.getElementById("intervalStart").style.display = "none";
      document.getElementById("valStart").style.display = "inline-block";
    } else {
      document.getElementById("valStart").style.display = "none";
      document.getElementById("intervalStart").style.display = "inline-block";
    }
  });

  //Mostrar el critero de paro elegido
  let stopMethods = document.getElementById("stopMethods");
  stopMethods.value = '0';
  stopMethods.addEventListener('change', function(e){
    switch(this.value) {
      case '0':
        document.getElementById("iteration").value = 0;
        document.getElementById("iterationMethod").style.display = "none";
        document.getElementById("criteriaMethod").style.display = "block";
        break;
      case '1':
        document.getElementById("criteria").value = 0;
        document.getElementById("criteriaMethod").style.display = "none";
        document.getElementById("iterationMethod").style.display = "block";
        break;
      case '2':
        document.getElementById("iterationMethod").style.display = "none";
        document.getElementById("criteriaMethod").style.display = "none";
        break;
    }
  });

  //Tomar valores si se presiona el botón de "resultado"
  document.getElementById('result').addEventListener('click', function(e) {
    let squareVal = document.getElementById('xSqr').value;
    let linVal = document.getElementById('xLnl').value;
    let independentVal = document.getElementById('indVal').value;
    let criteriaOption = document.getElementById('stopMethods').value;
    
    let startOpt = document.getElementById("startMethods").value;
    //Validar que los campos no estén vacíos ni incorrectos
    let limits = [];
    if(startOpt == '0') {
      let xI = document.getElementById("xI").value;
      limits = [xI];
    } else {
      let xL = document.getElementById("xL").value;
      let xU = document.getElementById("xU").value;
      limits = [xL, xU];
    }
    values = [squareVal, linVal, independentVal];
    let xI = 0;

    if (checkValues(limits, values, +criteriaOption) == 4) {
      if(startOpt == '0') {
        xI = limits[0];
      } else {
        xI = (limits[0] + limits[1]) / 2;
      }
      document.getElementById('iterationTable').style.border = "1px solid white";
      document.getElementById('iterationTable').innerHTML = `<tr><th>x</th><th>f(x)</th></tr>`;
      let calculator = new NewtonRaphson();
      let res = calculator.newtonRaphson(+xI, +squareVal, +linVal, +independentVal, +criteriaOption);
      document.getElementById("root").value = res;
    } else if (checkValues(limits, values, +criteriaOption) == 3) {
      document.getElementById('Warningnumber').style.display = "block";
    } else if (checkValues(limits, values, +criteriaOption) == 1) {
      document.getElementById('Warningpercentaje').style.display = "block";
    } else if (checkValues(limits, values, +criteriaOption) == 2) {
      document.getElementById('Warningiterationin').style.display = "block";
    } else if (checkValues(limits, values, +criteriaOption) == 5) {
      document.getElementById('Warningsame').style.display = "block";
    }
  });

  //Resetear valores a 0
  document.getElementById('reset').addEventListener('click', function(e) {
    resetValues();
  });
}

function resetValues() {
  document.getElementById("xI").value = 0;
  document.getElementById('xL').value = 0;
  document.getElementById('xU').value = 0;
  document.getElementById('xSqr').value = 0;
  document.getElementById('xLnl').value = 0;
  document.getElementById('indVal').value = 0;
  document.getElementById('criteria').value = 0;
  document.getElementById('iteration').value = 0;
  document.getElementById('root').value = 0;
  document.getElementById('iterationTable').innerHTML = ""; 
  document.getElementById('iterationTable').style.border = "none"; 
}

function checkValues(limits, values, criteriaOption) {
  for (let val of limits) {
    if (isNotNumberValid(val)) { 
      return false;
    }
  }
  for (let val of values) {
    if (isNotNumberValid(val)) {
      return false;
    }
  }
  if (criteriaOption == 0){
    let percentage = document.getElementById('criteria').value;
    if (isNotNumberValid(percentage)) {
      return 3;
    } else if (percentage <= 0) {
      return 1; //if percentage is less than 0 or not a number
    }
  }
  if(criteriaOption == 1) {
    let iterations = document.getElementById('iteration').value;
    if (isNotNumberValid(iterations)) {
      return 3;
    } else if (iterations <= 0) {
      return 1; //if iterations is less than 0 or not a number
    } else if (!(iterations%1==0)){
      return 2; //if iterations is not an integer
    }
  }
  if (values[0] == values[1]) {
    return 5; //if xL equal to xU
  }
  return 4; //only if all values are valid
}

function isNotNumberValid(val) {
  if (val == "0") {
    return false;
  }
  return (isNaN(val) && isNaN(parseFloat(val))) || val.trim() == "" || !val;
}

//Clase con el método para calcular el resultado  (Oiga compañero Aldo que es esto xd)
class NewtonRaphson{
  newtonRaphson(xI, squareVal, linVal, independentVal, criteriaOption) {
    let fXI = this.functionX(xI,squareVal,linVal,independentVal);
    let dXI = this.derivativeX(xI, squareVal, linVal, independentVal);

    //Calcular primera X
    let xR = xI - (fXI / dXI);
    let funcXR = this.functionX(xR,squareVal,linVal, independentVal);
    
    this.updateIterationTable(xR, funcXR);

    let criteria = 0;

    //Iniciar iteraciones
    do {
      xI = xR;
      fXI = this.functionX(xI,squareVal,linVal,independentVal);
      dXI = this.derivativeX(xI,squareVal,linVal);
      xR = xI - (fXI / dXI);
      funcXR = this.functionX(xR,squareVal,linVal,independentVal);

      this.updateIterationTable(xR, funcXR);

      //Utilizar un metodo para evaluar si parar o no
      if(criteriaOption == 0 || criteriaOption == 2) {
        criteria = this.relativeError(xR, xI);
      } else if(criteriaOption == 1) {
        criteria++;
      }

    } while(this.evaluateStop(criteria, criteriaOption));
      
    return xR;
  }

  evaluateStop(criteria, option) {
    switch(option) {
      case 0:
        return criteria > +(document.getElementById('criteria').value);
        break;
      case 1:
        return criteria < (+(document.getElementById('iteration').value) - 1);
        break;
      case 2:
        return criteria >= 0.001;
        break;
    }
  }

  functionX(x, squareVal, linVal, independentVal) {
    return (squareVal*(x*x))+(linVal*x)+independentVal;
  }

  derivativeX(x, squareVal, linVal) {
    return (squareVal*2*x)+linVal;
  }

  relativeError(newVal, previousVal) {
    let error = (((newVal - previousVal)/newVal)*100);
    return (error >= 0) ? error : (error * -1);
  }

  updateIterationTable(x, fx) {
    let table = document.getElementById('iterationTable');
    table.innerHTML += `<tr><td>${x}</td><td>${fx}</td></tr>`;
  }
}
