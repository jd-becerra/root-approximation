/** METODO DE BISECCIÓN*/

window.onload = () => {

  //Eliminar los diálogos de Inicio y de Error cuando el usuario haga click en la página
  document.addEventListener('mouseup', function(e) {
    document.getElementById("initWarning").style.display = "none";
    if(document.getElementById("errorWarning").style.display == "block"){
      document.getElementById("errorWarning").style.display = "none";
    }
  });


  document.getElementById("resultBisec").addEventListener('click', function(e) {
    let xL = document.getElementById('xl').value;
    let xu = document.getElementById('xu').value;
    let N_X = document.getElementById('N/X').value;X
    const type = document.getElementById('#criterio');
    let typevalor = type.value
    console.log(typevalor);
    let res = Bisection.bisection(+xL, +xu, +typevalor, +optionvalue, +x2, +x, +N_X);
    document.getElementById("fxL").value = res;
  });

}


//Clase con el método para calcular el resultado  (Oiga compañero Aldo que es esto xd)
class Bisection {
  bisection(xL, xU, typevalor, optionvalue, x2, x, N_X){
    let errorrelativo= []
    let resultado = 0;
    let xr = (xL + xU)/2;
    let valorant = xr;
    let error = (xU - valorant)/xU;
    errorrelativo.push(error);
    if (typevalor == 1) {
      for (let index = 1; index >= optionvalue; index++) {
        xr = (xL + xU)/2;
        error = (xr - valorant)/xr;
        errorrelativo.push(error);
        if((x2*xr)*(x2*xr) + (x*xr) + N_X < (x2*xL)(x2*xL) + (x*xL)) xL = xr 
        else xU = xr;
        valorant = xr;
        resultado = xr;
      }
      console.log(resultado);
    } else if (typevalor == 0){
      for (let index = 1; error < optionvalue; index++) {
        xr = (xL + xU)/2;
        error = (xr - valorant)/xr;
        errorrelativo.push(error);
        if('funcion'*xr < 'funcion'*xL) xL = xr 
        else xU = xr
      }
    }
  }
}