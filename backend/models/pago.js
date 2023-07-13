const mongoose = require('mongoose');
const { Pedido } = require('./pedido');
const { Item } = require('./itemsExtra');
const { Schema } = mongoose;
const PagoSchema = new Schema({

    total: { type: Number, required: true },
    //[{ type: Schema.Types.ObjectId, ref: 'Items', required: true }],
    metodo: { type: String, required: true },
    nota: { type: String, required: false },
    horario: { type: String, required: true},
    fecha: { type: String, required: true },
    pedido: { type: Schema.Types.ObjectId, ref: 'Pedido', required: false },
    nombreCliente: {type: String, required: true},
    mesa: {type: String, required: true},
})
module.exports = mongoose.models.Pago|| mongoose.model('Pago', PagoSchema);