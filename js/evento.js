//Evento
var Evento = function (emisor) {
  this.sujeto = emisor;
  this.observadores = [];
};

Evento.prototype = {
  suscribir: function (observador) {
    this.observadores.push(observador);
  },
  notificar: function () {
    for (var i = 0; i < this.observadores.length; i++) {
      this.observadores[i](this.sujeto);
      //this.observadores[i] = es una funcion (contexto = VistaAdministrador { modelo: Modelo, etc...})
      //this.sujeto es lo que le paso como parametro, como paso solo 1, le estoy pasando el modelo
      //y cuando se notifica desde el evento generado por el modelo, va recibiendo el nuevo modelo actualizado
      //para asi ejecutar 
    }
  }
};