/*
 * Modelo
 */
var Modelo = function () {
  this.preguntas = localStorage.getItem('preguntas') ? JSON.parse(localStorage.getItem('preguntas')) : [];
  this.ultimoId = 0;

  //inicializacion de eventos
  this.preguntaAgregada = new Evento(this);
  this.preguntaEliminada = new Evento(this);
  this.totalPreguntasEliminadas = new Evento(this);
  this.preguntasEditadas = new Evento(this);
  this.votoAgregado = new Evento(this);
};

Modelo.prototype = {
  //se obtiene el id más grande asignado a una pregunta
  obtenerUltimoId: function () {
    return this.preguntas.length - 1;
  },

  //se agrega una pregunta dado un nombre y sus respuestas
  agregarPregunta: function (nombre, respuestas) {
    var id = this.obtenerUltimoId();
    id++;
    var nuevaPregunta = { 'textoPregunta': nombre, 'id': id, 'cantidadPorRespuesta': respuestas };
    this.preguntas.push(nuevaPregunta);
    this.guardar();
    this.preguntaAgregada.notificar();
  },

  //se guardan las preguntas
  guardar: function () {
    localStorage.setItem('preguntas', JSON.stringify(this.preguntas));
  },

  eliminarPregunta: function (id) {
    this.preguntas.splice(id, 1);
    this.guardar();
    this.preguntaEliminada.notificar();
  },

  eliminarTodo: function (preguntas) {
    preguntas.splice(0, this.preguntas.length);// desde 0 hasta el final del array
    localStorage.clear();
    this.totalPreguntasEliminadas.notificar();
  },

  editando: function (id, idPregunta, btAddPregunta) {
    var btAdd = btAddPregunta.html();

    this.preguntas.find(function (preg) {
      if (preg.id === id) {
        idPregunta.val(preg.textoPregunta);
      };
    });

    btAddPregunta.text('Confirmar edición');

    btAddPregunta.click(function () {
      btAddPregunta.text(btAdd);
    })
    this.eliminarPregunta(id);
    this.preguntasEditadas.notificar();
  },

  agregarVotos: function (nombrePregunta, respuestaSeleccionada) {

    this.preguntas.forEach(elemento => {
      if (elemento.textoPregunta === nombrePregunta) {
        elemento.cantidadPorRespuesta.forEach(i => {
          if (respuestaSeleccionada === i.textoRespuesta) {
            i.cantidad += 1;
          };
        });
      }
    });

    this.votoAgregado.notificar();
  },
};