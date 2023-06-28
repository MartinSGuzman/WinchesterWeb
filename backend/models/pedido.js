const mongoose = require('mongoose');
const moment = require('moment');
const { Schema } = mongoose;
const { Receta } = require('./Receta'); 
const { Items } = require('./itemsExtra'); 

const PedidoSchema = new Schema({
    receta: [{ type: Schema.Types.ObjectId, ref: 'Receta', required: true }],
    items: [{ type: Schema.Types.ObjectId, ref: 'Items', required: true }],
    nota: { type: String, required: true },
    estado: { type: String, required: true },
    horario: { type: String, required: true},
    fecha: { type: String, required: true }
});

module.exports = mongoose.models.Pedido || mongoose.model('Pedido', PedidoSchema);