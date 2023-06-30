const Usuario = require('../models/usuario.js');
const jwt = require('jsonwebtoken');


const UsuarioCtrl = {}

UsuarioCtrl.getUsuarios = async (req, res) => {
  var usuario = await Usuario.find();
  res.json(usuario);
}

UsuarioCtrl.createUsuario = async (req, res) => {
  var usuario = new Usuario(req.body);
  try {
    await usuario.save();
    res.status(201).json({
      'status': '1',
      'msg': 'Usuario guardado.'
    })
  } catch (error) {
    res.status(400).json({
      'status': '0',
      'msg': 'Error procesando operacion.'
    })
  }
}

UsuarioCtrl.loginUsuario = async (req, res) => {
  //en req.body se espera que vengan las credenciales de login
  //defino los criterios de busqueda en base al username y password recibidos
  const criteria = {
    username: req.body.username,
    password: req.body.password
  }
  try {
    //el método findOne retorna un objeto que cumpla con los criterios de busqueda
    const user = await Usuario.findOne(criteria);
    if (!user) {
      res.json({
        status: 0,
        msg: "not found"
      })
    } else {
      res.json({
        status: 1,
        msg: "success",
        username: user.username, //retorno información útil para el frontend
        rol: user.rol, //retorno información útil para el frontend
        userid: user._id //retorno información útil para el frontend
      })
    }
  } catch (error) {
    res.json({
      status: 0,
      msg: 'error'
    })
  }
}









UsuarioCtrl.getUsuario = async (req, res) => {
  const usuario = await Usuario.findById(req.params.id);
  res.json(usuario);
}
UsuarioCtrl.editUsuario = async (req, res) => {
  try {
    await Usuario.updateOne({ _id: req.params.id }, req.body);
    res.json({
      status: '1',
      msg: 'Usuario actualizado'
    });
  } catch (error) {
    res.status(400).json({
      status: '0',
      msg: 'Error procesando la operación'
    });
  }
};
UsuarioCtrl.deleteUsuario = async (req, res) => {
  try {
    await Usuario.deleteOne({ _id: req.params.id });
    res.json({
      status: '1',
      msg: 'Usuario removed'
    })
  } catch (error) {
    res.status(400).json({
      'status': '0',
      'msg': 'Error procesando la operacion'
    })
  }
}
module.exports = UsuarioCtrl;