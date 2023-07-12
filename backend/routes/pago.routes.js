//defino controlador 
const PagoCtrl = require('./../controllers/pago.controller.js');
const authCtrl = require('./../controllers/auth.controller.js');
//creamos el manejador de rutas
const express = require('express');
const router = express.Router();
//definimos las rutas para la gestion
router.get('/', PagoCtrl.getPagos);
router.post('/post', PagoCtrl.createPago);
router.get('/:id', PagoCtrl.getPago);
router.put('/:id', PagoCtrl.editPago);
router.delete('/:id', PagoCtrl.deletePago);
router.get('/filtro/:metodo', PagoCtrl.getPagoXmetodo);
//exportamos el modulo de rutas
module.exports = router;