/** METODO DE BISECCIÓN*/

window.onload = () => {

  //Eliminar los diálogos de Inicio y de Error cuando el usuario haga click en la página
  document.addEventListener('mouseup', function(e) {
    document.getElementById("initWarning").style.display = "none";
    if(document.getElementById("errorWarning").style.display == "block"){
      document.getElementById("errorWarning").style.display = "none";
    }
  });

  //Mostrar el critero de paro elegido
  let stopMethods = document.getElementById("stopMethods");
  stopMethods.value = '0';
  stopMethods.addEventListener('change', function(e){
    switch(this.value) {
      case '0':
        document.getElementById("criteriaMethod").style.display = "block";
        break;
      case '1':
        document.getElementById("criteriaMethod").style.display = "none";
        break;
      case '2':
        document.getElementById("criteriaMethod").style.display = "none";
        break;
    }
  });

  //Tomar valores si se presiona el botón de "resultado"
  document.getElementById('resultBisec').addEventListener('click', function(e) {
    let xL = document.getElementById('xL').value;
    let xU = document.getElementById('xU').value;
    let squareVal = document.getElementById('xSqr').value;
    let linVal = document.getElementById('xLnl').value;
    let independentVal = document.getElementById('indVal').value;
    let criteriaOption = document.getElementById('stopMethods').value;

    let calculator = new Bisection();
    let res = calculator.bisection(+xL, +xU, +squareVal, +linVal, +independentVal, +criteriaOption);

    document.getElementById("root").value = res;
  });

}


//Clase con el método para calcular el resultado  (Oiga compañero Aldo que es esto xd)
class Bisection {
  bisection(xL, xU, squareVal, linVal, independentVal, criteriaOption) {
    const negMapY = new Map();
    const posMapY = new Map();
    let fXL = this.functionX(xL,squareVal,linVal,independentVal);
    let fXU = this.functionX(xU,squareVal,linVal,independentVal);

    if(fXL < 0) { negMapY.set(fXL, xL); posMapY.set(fXU, xU); }
    else { posMapY.set(fXL, xL); negMapY.set(fXU, xU); }

    //Calcular primera X
    let xR = (xL+xU)/2;
    let funcXR = this.functionX(xR,squareVal,linVal,independentVal);
    if (funcXR >= 0) {
      posMapY.set(funcXR, xR);
    } else {
      negMapY.set(funcXR, xR);
    }
    let newX = negMapY.get(Math.max(...negMapY.keys()));  //Obtener mayor numero de numeros negativos
    let prevX = posMapY.get(Math.min(...posMapY.keys())); //Obtener menor numero de numeros positivos

    let criteria = 0;

    if( criteriaOption == 1 ) { let i = 0; }
    //Iniciar iteraciones
    do {
      //Calcular nueva xR
      let prevXR = xR;
      xR = (newX + prevX)/2;
      funcXR = this.functionX(xR,squareVal,linVal,independentVal);
      if (funcXR >= 0) {
        posMapY.set(funcXR, xR);
      } else {
        negMapY.set(funcXR, xR);
      }
      newX = negMapY.get(Math.max(...negMapY.keys()));  //Obtener mayor numero de numeros negativos
      prevX = posMapY.get(Math.min(...posMapY.keys())); //Obtener menor numero de numeros positivos

      //Utilizar un metodo para evaluar si parar o no
      if(criteriaOption == 0 || criteriaOption == 2) {
        criteria = this.relativeError(xR, prevXR);
      } else if(criteriaOption == 1) {
        criteria = i;
        i++;
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
        return criteria > +(document.getElementById('iteration').value);
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
}
