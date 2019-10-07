/*
 * Vista administrador
 */
var VistaAdministrador = function (modelo, controlador, elementos) {
  debugger;
  this.modelo = modelo;
  this.controlador = controlador;
  this.elementos = elementos;
  var contexto = this;

  // suscripción de observadores
  this.modelo.preguntaAgregada.suscribir(function () {
    console.log("Me ejecuto preguntaAgregada");
    contexto.reconstruirLista();
    //debugger;
  }),
    this.modelo.preguntaEliminada.suscribir(function () {
      contexto.reconstruirLista();
    }),
    this.modelo.totalPreguntasEliminadas.suscribir(function () {
      contexto.reconstruirLista();
    }),
    this.modelo.preguntasEditadas.suscribir(function () {
      contexto.reconstruirLista();
    })
};


VistaAdministrador.prototype = {
  //lista
  inicializar: function () {
    //llamar a los metodos para reconstruir la lista, configurar botones y validar formularios
    validacionDeFormulario();
    this.reconstruirLista();
    this.configuracionDeBotones();
  },

  construirElementoPregunta: function (pregunta) {
    var contexto = this;
    var nuevoItem;
    //completar
    //asignar a nuevoitem un elemento li con clase "list-group-item", id "pregunta.id" y texto "pregunta.textoPregunta"
    nuevoItem = $('<li/>', { 'class': 'list-group-item', id: pregunta.id, 'texto': pregunta.textoPregunta });
    var interiorItem = $('.d-flex');
    var titulo = interiorItem.find('h5');
    titulo.text(pregunta.textoPregunta);
    interiorItem.find('small').text(pregunta.cantidadPorRespuesta.map(function (resp) {
      return " " + resp.textoRespuesta;
    }));
    nuevoItem.html($('.d-flex').html());
    return nuevoItem;
  },

  reconstruirLista: function () {
    //debugger;
    var lista = this.elementos.lista;
    lista.html('');
    var preguntas = this.modelo.preguntas;
    for (var i = 0; i < preguntas.length; ++i) {
      lista.append(this.construirElementoPregunta(preguntas[i]));
    }
  },

  configuracionDeBotones: function () {
    var e = this.elementos;
    var contexto = this;

    //asociación de eventos
    e.botonAgregarPregunta.click(function () {
      var value = e.pregunta.val();
      var respuestas = [];

      $('[name="option[]"]').each(function () {
        //completar
        var respuesta = $(this).val();

        if (respuesta) {
          respuestas.push({ 'textoRespuesta': respuesta, 'cantidad': 0 });
        };
      })
      contexto.limpiarFormulario();
      contexto.controlador.agregarPregunta(value, respuestas);
    });
    //asociar el resto de los botones a eventos
    $('#borrarPregunta').click(function () {
      var id = parseInt($('.list-group-item.active').attr('id'));
      contexto.controlador.quitarPregunta(id);
    });

    $('#borrarTodo').click(function () {
      var preguntas = contexto.modelo.preguntas;
      contexto.controlador.quitarTodo(preguntas);
    });

    $('#editarPregunta').click(function () {
      var id = parseInt($('.list-group-item.active').attr('id'));
      var idPregunta = $('#pregunta');
      var btAddPregunta = $('#agregarPregunta');

      contexto.controlador.editar(id, idPregunta, btAddPregunta);
    });
  },

  limpiarFormulario: function () {
    $('.form-group.answer.has-feedback.has-success').remove();
  },
};