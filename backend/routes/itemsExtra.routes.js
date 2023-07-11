//defino controlador 
const itemCtrl = require('./../controllers/itemsExtra.controller.js');
const authCtrl = require('./../controllers/auth.controller.js');
//creamos el manejador de rutas
const express = require('express');
const router = express.Router();
//definimos las rutas para la gestion
router.get('/',authCtrl.verifyToken, itemCtrl.getItems);
router.post('/post',authCtrl.verifyToken, itemCtrl.createItem);
router.get('/:id',authCtrl.verifyToken, itemCtrl.getItem);
router.put('/:id',authCtrl.verifyToken, itemCtrl.editItem);
router.delete('/:id',authCtrl.verifyToken, itemCtrl.deleteItem);
//exportamos el modulo de rutas
module.exports = router;