const mongoose = require('mongoose');
const Producto = require('./producto.js');
const { Schema } = mongoose;
const RecetaSchema = new Schema({
    nombre: { type: String, required: true },
    costoTotal: { type: Number, required: true },
    precio: { type: Number, required: true },
    productos: [{ type: Schema.Types.ObjectId, ref: 'Producto', required: true }],
    alergenos: { type: String, required: true },
    impuestos: { type: Number, required: true },
    descripcion: { type: String, required: true }
});
module.exports = mongoose.models.Receta || mongoose.model('Receta', RecetaSchema);