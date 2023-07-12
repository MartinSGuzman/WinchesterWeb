//defino controlador 
const UsuarioCtrl = require('./../controllers/usuario.controller.js');
const authCtrl = require('./../controllers/auth.controller.js');
//creamos el manejador de rutas
const express = require('express');
const router = express.Router();
//definimos las rutas para la gestion
router.post('/login',authCtrl.verifyToken, UsuarioCtrl.loginUsuario);
router.get('/', authCtrl.verifyToken, UsuarioCtrl.getUsuarios);
router.post('/post', authCtrl.verifyToken, UsuarioCtrl.createUsuario);
router.get('/:id', authCtrl.verifyToken, UsuarioCtrl.getUsuario);
router.put('/:id', authCtrl.verifyToken, UsuarioCtrl.editUsuario);
router.delete('/:id', authCtrl.verifyToken, UsuarioCtrl.deleteUsuario);
//exportamos el modulo de rutas
module.exports = router;