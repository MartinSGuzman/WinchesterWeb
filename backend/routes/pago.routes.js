//defino controlador 
const PagoCtrl = require('./../controllers/pago.controller.js');
const authCtrl = require('./../controllers/auth.controller.js');
//creamos el manejador de rutas
const express = require('express');
const router = express.Router();
//definimos las rutas para la gestion
router.get('/',authCtrl.verifyToken, PagoCtrl.getPagos);
router.post('/post',authCtrl.verifyToken, PagoCtrl.createPago);
router.get('/:id',authCtrl.verifyToken, PagoCtrl.getPago);
router.put('/:id',authCtrl.verifyToken, PagoCtrl.editPago);
router.delete('/:id',authCtrl.verifyToken, PagoCtrl.deletePago);
router.get('/filtro/:metodo',authCtrl.verifyToken, PagoCtrl.getPagoXmetodo);
//exportamos el modulo de rutas
module.exports = router;