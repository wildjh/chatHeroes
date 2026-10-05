// Routes.js - Módulo de rutas
var express = require('express');
var router = express.Router();
let messageIdCounter = 0;


const mensajes = [

  {
    _id: 'XXX',
    user: 'spiderman',
    mensaje: 'Hola Mundo'
  }

];


// Get mensajes
router.get('/', function (req, res) {
  // res.json('Obteniendo mensajes');
  res.json( mensajes );
});

// Post mensaje
router.post('/', function (req, res) {
  const { mensaje, user } = req.body;

  // Validación: verificar que 'user' y 'mensaje' existan, no sean nulos ni cadenas vacías
  if (!mensaje || !user || mensaje.trim() === '' || user.trim() === '') {
    return res.status(400).json({
      ok: false,
      error: 'Los campos "user" y "mensaje" son obligatorios y no pueden estar vacíos.'
    });
  }

  // Incrementa el ID único solo si los datos son válidos
  messageIdCounter++;

  const nuevoMensaje = {
    messageIdCounter: messageIdCounter,
    mensaje: mensaje,
    user: user
  };

  mensajes.push(nuevoMensaje);

  console.log(mensajes);

  res.status(201).json({
    ok: true,
    mensaje: nuevoMensaje
  });
});

router.delete("/:id", function (req, res) {
  const id = req.params.id;

  // Encuentra el índice del mensaje con el ID proporcionado
  const index = mensajes.findIndex(mensaje => mensaje.messageIdCounter == id);

  if (index !== -1) {
    // Elimina el mensaje del arrayy
    const deletedMessage = mensajes.splice(index, 1)[0];
    res.json({
      ok: true,
      mensaje: 'Mensaje eliminado',
      deletedMessage
    });
  }

});

module.exports = router;