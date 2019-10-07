/*
 * Controlador
 */
var Controlador = function (modelo) {
  this.modelo = modelo;
};

Controlador.prototype = {
  agregarPregunta: function (pregunta, respuestas) {
    this.modelo.agregarPregunta(pregunta, respuestas);
  },

  quitarPregunta: function (id) {
    this.modelo.eliminarPregunta(id);
  },

  quitarTodo: function (preguntas) {
    this.modelo.eliminarTodo(preguntas);
  },

  editar: function (id, idPregunta, btAddPregunta) {
    this.modelo.editando(id, idPregunta, btAddPregunta);
  },

  agregarVoto: function (nombrePregunta, respuestaSeleccionada) {
    this.modelo.agregarVotos(nombrePregunta, respuestaSeleccionada);
  }
};
