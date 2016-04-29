var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var userSchema = mongoose.Schema({
  local : {
    name         : String,
    email        : String,
    password     : String,
    organization : {type: mongoose.Schema.ObjectId, ref: 'Organization', required: true},
    webURL       : String,
    role         : {type: String, enum: ['Supervisor', 'Sales', 'Store']}
  }
});


//userSchema.methods is to create a method that is accessible from instance.
// userSchema.statics is to  create a method that is accesible from the class.

userSchema.statics.encrypt = function(password){

  //synchronous version of the bcrypt hash and salt function
  //slower than the async version
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

userSchema.methods.validPassword = function(password){
    const user = this;
    return bcrypt.compareSync(password, user.local.password);
}

module.exports = mongoose.model('User', userSchema);
