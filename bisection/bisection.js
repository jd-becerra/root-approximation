/** METODO DE BISECCIÓN*/

//Eliminar los diálogos de Inicio y de Error cuando el usuario haga click en la página
document.body.addEventListener('mouseup', function(e) {
  document.getElementById("initWarning").style.display = "none";
  if(document.getElementById("errorWarning").style.display == "block"){
    document.getElementById("errorWarning").style.display = "none";
  }
});

document.getElementById("resultBisecc").addEventListener('click', function(e) {
  let xL = document.getElementById('xl').value;
  let xu = document.getElementById('xu').value;
  let x2 = document.getElementById("x'2").value;
  let x = document.getElementById('X').value;
  let N_X = document.getElementById('N/X').value;X
  const type = document.querySelector('#criterio');
  let typevalor = type.value
  console.log(typevalor);
  let optionvalue = document.getElementById('option').value;
  let res = calculator.biseccion(+xL, +xu, +typevalor, +optionvalue, +x2, +x, +N_X);
  document.getElementById("fxL").value = res;
  drawPoints(+x0L,+fx0L,+x1L,+fx1L,0, 0, +xL, +res, false);
  relativeError(res);
});

export class biseccion {
  biseccion(xL, xu, typevalor, optionvalue, x2, x, N_X){
    let errorrelativo= []
    let resultado = 0;
    let xr = (xL + xu)/2;
    let valorant = xr;
    let error = (xu - valorant)/xu;
    errorrelativo.push(error);
    if (typevalor == 1) {
    for (let index = 1; index >= optionvalue; index++) {
      xr = (xL + xu)/2;
      error = (xr - valorant)/xr;
      errorrelativo.push(error);
      if((x2*xr)*(x2*xr) + (x*xr) + N_X < (x2*xL)(x2*xL) + (x*xL)) xL = xr 
      else xu = xr;
      valorant = xr;
      resultado = xr;
    }
    console.log(resultado);
  } else if (typevalor == 0){
    for (let index = 1; error < optionvalue; index++) {
      xr = (xL + xu)/2;
      error = (xr - valorant)/xr;
      errorrelativo.push(error);
      if('funcion'*xr < 'funcion'*xL) xL = xr 
      else xu = xr
    }
  }
}
}