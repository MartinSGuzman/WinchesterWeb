//defino controlador 
const UsuarioCtrl = require('./../controllers/usuario.controller.js');
//creamos el manejador de rutas
const express = require('express');
const router = express.Router();
//definimos las rutas para la gestion
router.get('/', UsuarioCtrl.getUsuarios);
router.post('/post', UsuarioCtrl.createUsuario);
router.get('/:id', UsuarioCtrl.getUsuario);
router.put('/:id', UsuarioCtrl.editUsuario);
router.delete('/:id', UsuarioCtrl.deleteUsuario);
//exportamos el modulo de rutas
module.exports = router;