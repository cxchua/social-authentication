var mongoose = require('mongoose');
// var Product = require('./product')
// why dont we need this

var StockAdjustmentItemSchema = new mongoose.Schema({
  product:      { type: mongoose.Schema.ObjectId, ref: 'Product', required: true },
  qtyChange: 	  { type: Number, required: true }
});

var StockAdjustmentItem = mongoose.model('StockAdjustmentItem', StockAdjustmentItemSchema);

module.exports = StockAdjustmentItem;
