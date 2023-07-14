const mongoose = require('mongoose');
const moment = require('moment');
const { Schema } = mongoose;
const { Receta } = require('./Receta'); 
const { Items } = require('./itemsExtra'); 

const PedidoSchema = new Schema({
    recetas: [
      {
        receta: { type: Schema.Types.ObjectId, ref: 'Receta', required: false },
        cantidad: { type: Number, required: false }
      }
    ],
    items: [
      {
        item: { type: Schema.Types.ObjectId, ref: 'Item', required: false },
        cantidad: { type: Number, required: false }
      }
    ],
    nota: { type: String, required: true },
    alergenos: { type: String, required: true },
    estado: { type: String, required: true },
    horario: { type: String, required: true },
    fecha: { type: Date, required: true },
    total:{type: Number, required:true},
    nombreCliente: {type: String, required:true},
    mesa: {type: String, required:true}
  });

module.exports = mongoose.models.Pedido || mongoose.model('Pedido', PedidoSchema);