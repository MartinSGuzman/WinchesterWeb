const Item = require('../models/itemsExtra.js');


const itemCtrl = {}

itemCtrl.getItems = async (req, res) => {
    var item = await Item.find();
    res.json(item);
}

itemCtrl.createItem = async (req, res) => {
    
    var item = new Item(req.body);
    try {
        await item.save();
        res.status(201).json({
            'status': '1',
            'msg': 'item guardado.'
        })
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando operacion.'
        })
    }
}
itemCtrl.getItem = async (req, res) => {
    const item = await Item.findById(req.params.id);
    res.json(item);
}
itemCtrl.editItem = async (req, res) => {
    try {
      await Item.updateOne({ _id: req.params.id }, req.body);
      res.json({
        status: '1',
        msg: 'Item actualizado'
      });
    } catch (error) {
      res.status(400).json({
        status: '0',
        msg: 'Error procesando la operación'
      });
    }
  };
itemCtrl.deleteItem = async (req, res) => {
    try {
        await Item.deleteOne({ _id: req.params.id });
        res.json({
            status: '1',
            msg: 'item removed'
        })
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando la operacion'
        })
    }
}
module.exports = itemCtrl;