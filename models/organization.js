var mongoose = require('mongoose');
// var StockAdjustmentItem = require('./stockAdjustmentItem')

var OrganizationSchema = new mongoose.Schema({
  name:             { type: String, required: true, unique: true},
  address: 		  	  String,
  number:           String,
  createdDate:      { type: Date, default: Date.now },
  updatedDate:      { type: Date, default: Date.now }
});

var Organization = mongoose.model('Organization', OrganizationSchema);

module.exports = Organization;
