//defino controlador 
const itemCtrl = require('./../controllers/itemsExtra.controller.js');
const authCtrl = require('./../controllers/auth.controller.js');
//creamos el manejador de rutas
const express = require('express');
const router = express.Router();
//definimos las rutas para la gestion
router.get('/', itemCtrl.getItems);
router.post('/post', itemCtrl.createItem);
router.get('/:id', itemCtrl.getItem);
router.put('/:id', itemCtrl.editItem);
router.delete('/:id', itemCtrl.deleteItem);
//exportamos el modulo de rutas
module.exports = router;