const express = require('express');
const cors = require('cors');
const { mongoose } = require('./database');
var app = express();
//middlewares
app.use(express.json());
app.use(cors({ origin: 'http://localhost:4200' }));

//Cargamos el modulo de direccionami/ento de rutas


app.use('/api/producto', require('./routes/producto.routes.js'));
app.use('/api/itemsExtra', require('./routes/itemsExtra.routes.js'));
app.use('/api/usuario', require('./routes/usuario.routes.js'));
app.use('/api/receta', require('./routes/receta.routes.js'));
app.use('/api/pedido', require('./routes/pedido.routes.js'));
app.use('/api/pago', require('./routes/pago.routes.js'));




//setting
app.set('port', process.env.PORT || 3000);
//starting the server
app.listen(app.get('port'), () => {
    console.log(`Server started on port`, app.get('port'));
});
