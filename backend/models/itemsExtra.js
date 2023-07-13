const mongoose = require('mongoose');
const { Schema } = mongoose;
const ItemSchema = new Schema({
    nombre: { type: String, required: true },
    precio: { type: Number, required: true },
    categoria: { type: String, required: true },
    descripcion: { type: String, required: true },
    proveedor: { type: String, required: true },
    stock: { type: Number, required: true }
})
module.exports = mongoose.models.Item || mongoose.model('Item', ItemSchema);