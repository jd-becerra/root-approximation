/** METODO DE BISECCIÓN*/

window.onload = () => {

  //Eliminar los diálogos de Inicio y de Error cuando el usuario haga click en la página
  document.addEventListener('mouseup', function(e) {
    document.getElementById("initWarning").style.display = "none";
    if(document.getElementById("errorWarning").style.display == "block"){
      document.getElementById("errorWarning").style.display = "none";
    }
  });

  resetValues(); 

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
    let xL = document.getElementById('xL').value;
    let xU = document.getElementById('xU').value;
    let squareVal = document.getElementById('xSqr').value;
    let linVal = document.getElementById('xLnl').value;
    let independentVal = document.getElementById('indVal').value;
    let criteriaOption = document.getElementById('stopMethods').value;

    //Validar que los campos no estén vacíos ni incorrectos
    values = [xL, xU, squareVal, linVal, independentVal];
    if (checkValues(values, +criteriaOption)) {
      document.getElementById('iterationTable').style.border = "1px solid white";
      document.getElementById('iterationTable').innerHTML = `<tr><th>x</th><th>f(x)</th></tr>`;
      let calculator = new FalsePosition();
      let res = calculator.falsePosition(+xL, +xU, +squareVal, +linVal, +independentVal, +criteriaOption);
      document.getElementById("root").value = res;
    } else {
      document.getElementById('errorWarning').style.display = "block";
    }
  });

  //Resetear valores a 0
  document.getElementById('reset').addEventListener('click', function(e) {
    resetValues();
  });
}

function resetValues() {
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

function checkValues(values, criteriaOption) {
  for (let val of values) {
    if (isNotNumberValid(val)) {
      return false;
    }
  }
  if (values[0] == values[1]) {
    return false; //if xL equal to xU
  }
  //check values for stopping iteration
  if (criteriaOption == 0){
    let percentage = document.getElementById('criteria').value;
    if (isNotNumberValid(percentage) || +percentage <= 0) {
      return false;
    }
  }
  if(criteriaOption == 1) {
    let iterations = document.getElementById('iteration').value;
    if (isNotNumberValid(iterations) || +iterations <= 0 || !(iterations%1==0)) {
      return false;
    }
  }
  return true; //only if all values are valid
}

function isNotNumberValid(val) {
  if (val == "0") {
    return false;
  }
  return (isNaN(val) && isNaN(parseFloat(val))) || val.trim() == "" || !val;
}

//Clase con el método para calcular el resultado  (Oiga compañero Aldo que es esto xd)
class FalsePosition {
  falsePosition(xL, xU, squareVal, linVal, independentVal, criteriaOption) {
    const negMapY = new Map();
    const posMapY = new Map();
    let fXL = this.functionX(xL,squareVal,linVal,independentVal);
    let fXU = this.functionX(xU,squareVal,linVal,independentVal);

    if(fXL < 0) { negMapY.set(fXL, xL); posMapY.set(fXU, xU); }
    else { posMapY.set(fXL, xL); negMapY.set(fXU, xU); }

    //Calcular primera X
    let xR = xU - ((fXU*(xL - xU)) / (fXL - fXU));
    console.log(xR);
    let funcXR = this.functionX(xR,squareVal,linVal,independentVal);
    if (funcXR >= 0) {
      posMapY.set(funcXR, xR);
    } else {
      negMapY.set(funcXR, xR);
    }
    
    this.updateIterationTable(xR, funcXR);

    let newX = negMapY.get(Math.max(...negMapY.keys()));  //Obtener mayor numero de numeros negativos
    let prevX = posMapY.get(Math.min(...posMapY.keys())); //Obtener menor numero de numeros positivos

    let criteria = 0;

    //Iniciar iteraciones
    do {
      console.log(newX, prevX, xR);
      //Calcular nueva xR
      let prevXR = xR;
      let fXU = this.functionX(prevX,squareVal,linVal,independentVal);
      let fXL = this.functionX(newX,squareVal,linVal,independentVal);
      xR = prevX - ((fXU*(newX - prevX)) / (fXL - fXU));
      funcXR = this.functionX(xR,squareVal,linVal,independentVal);
      if (funcXR >= 0) {
        posMapY.set(funcXR, xR);
      } else {
        negMapY.set(funcXR, xR);
      }
      newX = negMapY.get(Math.max(...negMapY.keys()));  //Obtener mayor numero de numeros negativos
      prevX = posMapY.get(Math.min(...posMapY.keys())); //Obtener menor numero de numeros positivos

     this.updateIterationTable(xR, funcXR);

      //Utilizar un metodo para evaluar si parar o no
      if(criteriaOption == 0 || criteriaOption == 2) {
        criteria = this.relativeError(xR, prevXR);
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

  relativeError(newVal, previousVal) {
    let error = (((newVal - previousVal)/newVal)*100);
    return (error >= 0) ? error : (error * -1);
  }

  updateIterationTable(x, fx) {
    let table = document.getElementById('iterationTable');
    table.innerHTML += `<tr><td>${x}</td><td>${fx}</td></tr>`;
  }
}