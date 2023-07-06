const mongoose = require('mongoose');
const { Schema } = mongoose;
const ProductoSchema = new Schema({
    nombre: { type: String, required: true },
    categoria: { type: String, required: true },
    tipo: { type: String, required: true },
    costo: { type: Number, required: true },
    proveedor: { type: String, required: true },
    stock: { type:Number, required: true }
    
    
    
    
})
module.exports = mongoose.models.Producto || mongoose.model('Producto', ProductoSchema);
