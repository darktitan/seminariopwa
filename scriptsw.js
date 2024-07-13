if('serviceWorker' in navigator){
    navigator.serviceWorker.register('sw.js')
    .then(reg=>console.log("El registro del sw fue exitoso",reg))
    .catch(err=>console.warn("Error en el registro del sw",err))
  }