const Pedido = require('../models/pedido.js');


const PedidoCtrl = {}

PedidoCtrl.getPedidos = async (req, res) => {
    var pedidos = await Pedido.find();
    res.json(pedidos);
}

PedidoCtrl.createPedido = async (req, res) => {
    var pedido = new Pedido(req.body);
    try {
        await pedido.save();
        res.status(201).json({
            'status': '1',
            'msg': 'Pedido guardado.'
        })
    } catch (error) {
        console.error(error); 
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando operacion.'
        })
    }
}
PedidoCtrl.getPedido = async (req, res) => {
    const pedido = await Pedido.findById(req.params.id);
    res.json(pedido);
}
PedidoCtrl.editPedido = async (req, res) => {
    try {
        await Pedido.updateOne({ _id: req.params.id }, req.body);
        res.json({
            'status': '1',
            'msg': 'Pedido updated'
        })
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando la operacion'
        })
    }
}
PedidoCtrl.deletePedido = async (req, res) => {
    try {
        await Pedido.deleteOne({ _id: req.params.id });
        res.json({
            status: '1',
            msg: 'Pedido removed'
        })
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando la operacion'
        })
    }
}
module.exports = PedidoCtrl;