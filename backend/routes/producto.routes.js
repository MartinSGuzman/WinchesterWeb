//defino controlador 
const productoCtrl = require('./../controllers/producto.controller.js');
const authCtrl = require('./../controllers/auth.controller.js');
//creamos el manejador de rutas
const express = require('express');
const router = express.Router();
//definimos las rutas para la gestion
router.get('/',authCtrl.verifyToken, productoCtrl.getProductos);
router.post('/post',authCtrl.verifyToken, productoCtrl.createProducto);
router.get('/:id',authCtrl.verifyToken, productoCtrl.getProducto);
router.put('/:id',authCtrl.verifyToken, productoCtrl.editProducto);
router.delete('/:id',authCtrl.verifyToken, productoCtrl.deleteProducto);
//exportamos el modulo de rutas
module.exports = router;