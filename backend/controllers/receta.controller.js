const Receta = require('../models/Receta');
const Producto = require ('../models/producto')


const RecetaCtrl = {}

RecetaCtrl.getRecetas = async (req, res) => {
    var recetas = await Receta.find();
    res.json(recetas);
}

RecetaCtrl.createReceta = async (req, res) => {
    var receta = new Receta(req.body);
    try {
        await receta.save();
        res.status(200).json({
            'status': '1',
            'msg': 'Receta guardada.'
        });
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando operacion.'
        });
    }
};
RecetaCtrl.getReceta = async (req, res) => {
    const receta = await Receta.findById(req.params.id);
    res.json(receta);
}
RecetaCtrl.editReceta = async (req, res) => {
    try {
        await Receta.updateOne({ _id: req.params.id }, req.body);
        res.json({
            status: '1',
            msg: 'Receta Actualizada'
        });
    } catch (error) {
        res.status(400).json({
            status: '0',
            msg: 'Error procesando la operacion'
        });
    }
};
RecetaCtrl.deleteReceta = async (req, res) => {
    try {
        await Receta.deleteOne({ _id: req.params.id });
        res.json({
            status: '1',
            msg: 'Receta removed'
        })
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando la operacion'
        })
    }
}
module.exports = RecetaCtrl;