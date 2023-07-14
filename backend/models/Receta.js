const mongoose = require('mongoose');
const Producto = require('./producto');
const { Schema } = mongoose;
const RecetaSchema = new Schema({
    nombre: { type: String, required: true },
    precio: { type: Number, required: true },
    //impuestos: { type: Number, required: true },
    descripcion: { type: String, required: true },
    producs: [
        {
            produ: { type: Schema.Types.ObjectId, ref: 'Producto', required: false },
            cantidad: { type: Number, required: false }
        }
    ],
    //productos: { type: Schema.Types.ObjectId, ref: Producto, required: true },
});
module.exports = mongoose.models.Receta || mongoose.model('Receta', RecetaSchema);