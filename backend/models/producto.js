const mongoose = require('mongoose');
const { Schema } = mongoose;
const ProductoSchema = new Schema({
    costo: { type: Number, required: true },
    tipo: { type: String, required: true },
    categoria: { type: String, required: true },
    nombre: { type: String, required: true },
    proveedor: { type: String, required: true },
    stock: { type:Number, required: true }
})
module.exports = mongoose.models.Producto || mongoose.model('Producto', ProductoSchema);
