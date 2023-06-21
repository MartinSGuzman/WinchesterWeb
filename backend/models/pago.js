const mongoose = require('mongoose');
const { Receta } = require('./Receta');
const { Item } = require('./itemsExtra');
const { Schema } = mongoose;
const PagoSchema = new Schema({
    monto: { type: Number, required: true },
    receta: [{ type: Schema.Types.ObjectId, ref: 'Receta', required: true }],
    items: [{ type: Schema.Types.ObjectId, ref: 'Items', required: true }],
    metodo: { type: String, required: true },
    nota: { type: String, required: true },
    horario: { type: String, required: true},
    fecha: { type: Date, required: true }
})
module.exports = mongoose.models.Pago|| mongoose.model('Pago', PagoSchema);