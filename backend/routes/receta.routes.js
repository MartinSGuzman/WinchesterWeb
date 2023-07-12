//defino controlador 
const RecetaCtrl = require('./../controllers/receta.controller.js');
const authCtrl = require('./../controllers/auth.controller.js');
//creamos el manejador de rutas
const express = require('express');
const router = express.Router();
//definimos las rutas para la gestion
router.get('/',authCtrl.verifyToken, RecetaCtrl.getRecetas);
router.post('/post',authCtrl.verifyToken, RecetaCtrl.createReceta);
router.get('/:id',authCtrl.verifyToken, RecetaCtrl.getReceta);
router.put('/:id',authCtrl.verifyToken, RecetaCtrl.editReceta);
router.delete('/:id',authCtrl.verifyToken, RecetaCtrl.deleteReceta);
//exportamos el modulo de rutas
module.exports = router;