// backend/src/routes/items.js
const express = require('express');
const {
  getItems,
  addItem,
  getItem,
  deleteItem
} = require('../controllers/itemController');

const router = express.Router();

router
  .route('/')
  .get(getItems)
  .post(addItem);

router
  .route('/:id')
  .get(getItem)
  .delete(deleteItem);

module.exports = router;