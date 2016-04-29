var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var salesOrderItem = require('./salesOrderItem')

var SalesOrderSchema = new Schema({
    orderNo:        { type: Number },
    customerName:   { type: String },
    customerEmail:  { type : String },
    itemList:       [salesOrderItem.schema],
    organization: {type: mongoose.Schema.ObjectId, ref: 'Organization'},
    user:         {type: mongoose.Schema.ObjectId, ref: 'User'},
    createdDate:    { type: Date, default: Date.now }
});

// add required back into org n user

module.exports = mongoose.model('SalesOrder', SalesOrderSchema);
