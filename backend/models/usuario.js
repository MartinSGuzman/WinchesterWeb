const mongoose = require('mongoose');
const { Schema } = mongoose;
const UsuarioSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    NombreApellido: { type: String, required: true },
    rol: { type: String, required: true },
    dni: { type: String, required: true },
})
module.exports = mongoose.models.Usuario || mongoose.model('Usuario', UsuarioSchema);