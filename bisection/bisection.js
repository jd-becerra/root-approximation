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
  document.getElementById("resultBisec").addEventListener('click', function(e) {
    let xL = document.getElementById('xL').value;
    let xU = document.getElementById('xU').value;
    let squareVal = document.getElementById('xSqr').value;
    let linVal = document.getElementById('xLnl').value;
    let independentVal = document.getElementById('indVal').value;
    //Falta checar que opcion de criterio y como tomar el valor


    
    document.getElementById("root").value = res;
  });

}


//Clase con el método para calcular el resultado  (Oiga compañero Aldo que es esto xd)
class Bisection {
  bisection(xL, xU, squareVal, linVal, independentVal, criteriaOption){
    let criteriaOption = document.getElementById('criteria').value; 
  }

  functionX(x, squareVal, linVal, independentVal) {
    return (squareVal*(x*x))+(linVal*x)+independentVal;
  }

  relativeError(newVal, previousVal) {
    let error = (((newVal - previousVal)/newVal)*100);
    return (error >= 0) ? error : (error * -1);
  }
}