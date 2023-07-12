//defino controlador 
const PedidoCtrl = require('./../controllers/pedido.controller.js');
const authCtrl = require('./../controllers/auth.controller.js');
//creamos el manejador de rutas
const express = require('express');
const router = express.Router();
//definimos las rutas para la gestion
router.get('/', PedidoCtrl.getPedidos);
router.post('/post', PedidoCtrl.createPedido);
router.get('/:id', PedidoCtrl.getPedido);
router.put('/:id', PedidoCtrl.editPedido);
router.delete('/:id', PedidoCtrl.deletePedido);
//exportamos el modulo de rutas
module.exports = router;