const Pago = require('../models/pago.js');


const PagoCtrl = {}

PagoCtrl.getPagos = async (req, res) => {
    var pago = await Pago.find();
    res.json(pago);
}

PagoCtrl.createPago = async (req, res) => {
    var pago = new Pago(req.body);
    try {
        await pago.save();
        res.status(201).json({
            'status': '1',
            'msg': 'Pago guardado.'
        })
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando operacion.'
        })
    }
}
PagoCtrl.getPago = async (req, res) => {
    const pago = await Pago.findById(req.params.id);
    res.json(pago);
}
PagoCtrl.editPago = async (req, res) => {
    try {
        await Pago.updateOne({ _id: req.params.id }, req.body);
        res.json({
            'status': '1',
            'msg': 'Pago updated'
        })
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando la operacion'
        })
    }
}
PagoCtrl.deletePago = async (req, res) => {
    try {
        await Pago.deleteOne({ _id: req.params.id });
        res.json({
            status: '1',
            msg: 'Pago removed'
        })
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando la operacion'
        })
    }
}
module.exports = PagoCtrl;