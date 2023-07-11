const mongoose = require('mongoose');
const { Receta } = require('./Receta');
const { Item } = require('./itemsExtra');
const { Schema } = mongoose;
const PagoSchema = new Schema({
    monto: { type: Number, required: true },
    receta: { type: String, required: true} , //[{ type: Schema.Types.ObjectId, ref: 'Receta', required: true }],
    items: { type: String, required: true }, //[{ type: Schema.Types.ObjectId, ref: 'Items', required: true }],
    metodo: { type: String, required: true },
    nota: { type: String, required: false },
    horario: { type: String, required: true},
    fecha: { type: String, required: true }
})
module.exports = mongoose.models.Pago|| mongoose.model('Pago', PagoSchema);