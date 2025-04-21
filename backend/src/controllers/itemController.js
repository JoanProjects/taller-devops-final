// backend/src/controllers/itemController.js
const Item = require('../models/Item');

// @desc    Get all items
// @route   GET /api/items
exports.getItems = async (req, res, next) => {
  try {
    const items = await Item.find();
    res.status(200).json({ success: true, count: items.length, data: items });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @desc    Add item
// @route   POST /api/items
exports.addItem = async (req, res, next) => {
  try {
    const { name, quantity } = req.body;
    const item = await Item.create({ name, quantity });
    res.status(201).json({ success: true, data: item });
  } catch (err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.message);
      return res.status(400).json({ success: false, error: messages });
    } else {
      res.status(500).json({ success: false, error: 'Server Error' });
    }
  }
};

// @desc    Get single item
// @route   GET /api/items/:id
exports.getItem = async (req, res, next) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ success: false, error: 'Item not found' });
    }
    res.status(200).json({ success: true, data: item });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

 // @desc    Delete item
// @route   DELETE /api/items/:id
exports.deleteItem = async (req, res, next) => {
    try {
        const item = await Item.findById(req.params.id);
        if (!item) {
        return res.status(404).json({ success: false, error: 'Item not found' });
        }
        await item.deleteOne(); // Use deleteOne() Mongoose v6+
        res.status(200).json({ success: true, data: {} });
    } catch (err) {
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};