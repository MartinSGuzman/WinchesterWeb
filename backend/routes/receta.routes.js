//defino controlador 
const RecetaCtrl = require('./../controllers/receta.controller.js');
const authCtrl = require('./../controllers/auth.controller.js');
//creamos el manejador de rutas
const express = require('express');
const router = express.Router();
//definimos las rutas para la gestion
router.get('/', RecetaCtrl.getRecetas);
router.post('/post', RecetaCtrl.createReceta);
router.get('/:id', RecetaCtrl.getReceta);
router.put('/:id', RecetaCtrl.editReceta);
router.delete('/:id', RecetaCtrl.deleteReceta);
//exportamos el modulo de rutas
module.exports = router;