var mongoose = require('mongoose');

var invoiceSchema = new mongoose.Schema({
    //name:           String,
    //breed:          String,
    //dob:            { type: Date, default: Date.now },
    //gender:         { type: String },
    //family:         { type: String },
    //status:         { type: String, enum: ["adopted", "orphan"] }
});

module.exports = mongoose.model('Invoice', invoiceSchema);