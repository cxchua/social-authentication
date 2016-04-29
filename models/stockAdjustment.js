var mongoose = require('mongoose');
// Using Line 3 instead of line 4 gives your codes more resilience (cos it to not break if you get the listing order in app.js wrong)
var StockAdjustmentItem = require('./stockAdjustmentItem')
// var StockAdjustmentItem = mongoose.model('StockAdjustmentItem');

// We don't need to require user model because we are simply referencing a string and mongoose does that for us
// var User = require('./models/user')


var StockAdjustmentSchema = new mongoose.Schema({
  reason:           { type: String, required: true},
  adjustmentList:   [StockAdjustmentItem.schema],
  notes: 		  	    String,
  organization:     {type: mongoose.Schema.ObjectId, ref: 'Organization', required: true},
  user:             {type: mongoose.Schema.ObjectId, ref: 'User', required: true},
  createdDate:      { type: Date, default: Date.now },
  updatedDate:      { type: Date, default: Date.now }
});

var StockAdjustment = mongoose.model('StockAdjustment', StockAdjustmentSchema);

module.exports = StockAdjustment;
