/** METODO DE BISECCIÓN*/

//Eliminar los diálogos de Inicio y de Error cuando el usuario haga click en la página
document.body.addEventListener('mouseup', function(e) {
  document.getElementById("initWarning").style.display = "none";
  if(document.getElementById("errorWarning").style.display == "block"){
    document.getElementById("errorWarning").style.display = "none";
  }
});
