//defino controlador 
const PedidoCtrl = require('./../controllers/pedido.controller.js');
const authCtrl = require('./../controllers/auth.controller.js');
//creamos el manejador de rutas
const express = require('express');
const router = express.Router();
//definimos las rutas para la gestion
router.get('/',authCtrl.verifyToken, PedidoCtrl.getPedidos);
router.post('/post',authCtrl.verifyToken, PedidoCtrl.createPedido);
router.get('/:id',authCtrl.verifyToken, PedidoCtrl.getPedido);
router.put('/:id',authCtrl.verifyToken, PedidoCtrl.editPedido);
router.delete('/:id',authCtrl.verifyToken, PedidoCtrl.deletePedido);
//exportamos el modulo de rutas
module.exports = router;