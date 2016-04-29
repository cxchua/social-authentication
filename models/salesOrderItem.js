var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SalesOrderItemSchema = new Schema({
  product:      {
     type: mongoose.Schema.ObjectId,
     ref: 'Product',
     required: true
 },
  qty: 	  { type: Number, required: true },
  salesTotal:     { type: Number },
});

var salesOrderItem = mongoose.model('SalesOrderItem', SalesOrderItemSchema);

module.exports = salesOrderItem;
