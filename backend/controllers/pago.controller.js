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
            'msg': 'Pago Actualizado'
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

PagoCtrl.getPagoXmetodo = async (req, res) => {
    try {
        const metodo = req.params.metodo;
        if (metodo != 'Contado' && metodo != 'Debito' && metodo != 'Credito' && metodo != 'contado' && metodo != 'debito' && metodo != 'credito')
            throw new Error('Metodo de Pago invalida')
        metodo
        const pago = await Pago.find({ metodo: metodo });
        res.json(pago);

    } catch (error) {
        console.log(error)
        res.status(400).json({
            status: '0',
            msg: 'Error al filtrar los Metodo de Pago'
        })
    }
}
module.exports = PagoCtrl;