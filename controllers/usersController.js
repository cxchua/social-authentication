var passport  = require("passport")
var jwt       = require('jsonwebtoken')
var User      = require('../models/user')

// GET /signup
function getSignup(req, res) {
    res.render('login', { message: req.flash('errorMessage') });;
}

// POST /signup
function postSignup(req, res) {
  var signupStrategy = passport.authenticate('local-signup', {
    successRedirect: '/',
    failureRedirect: '/signup',
    failureFlash: true
  });

  return signupStrategy(req,res);
}

// GET /login
function getLogin(req, res) {
    res.render('login', {message: req.flash('errorMessage') });
}

// POST /login
function postLogin(req, res) {
    var loginStrategy = passport.authenticate('local-login', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    });

    return loginStrategy(req,res);
}

// GET /logout
function getLogout(req, res) {
    req.logout();
    res.redirect('/');
}

// Restricted page
function getSecret(req, res){
    res.render('secret');
}

// User Settings
// Receive Token

//Used for encrypting our json web token
//unique for each webb application
var secretValue = "onhermajestyssecretservice";
// ** An alternative way to do this is to generate a token when the user signs up and save the token value in a variable or in the database and show it to the user when he comes to this page (instead of regenerating a new one each time)
function getToken(req, res) {
  // as long as we provide some tokenInfo that is unique to the user, no other user will get a same token right
  // var tokenInfo = {
  //   name: 'James Bond',
  //   codename: "007",
  //   id: '5705cff86671ce8d479edd76',
  //   url: 'http://localhost:3000'
  // }
  // // able to decode tokenInfo in future to get the object we save it as
  // // we would want to save this tokenInfo with info from the user who first signs up for the account
  //
  // // Add this into jwt.sign if you want to have an expiry { expiresIn: '24h' }
  // var token = jwt.sign(tokenInfo, secretValue);
  // console.log(token)
  // res.render('user/token', {tokenInfo: tokenInfo, token: token });
    res.render('user/token');
}

// ** An alternative way to do this is to generate a token when the user signs up and save the token value in a variable or in the database and show it to the user when he comes to this page (instead of regenerating a new one each time)
function getTokenWithEmail(req, res) {
  // User.findByIdAndUpdate( currentUser._id, { $set: { local: {webURL: req.body.webURL} } }, function(){
  //   console.log('hi angeline')
  // })
  User.findById(currentUser._id, function (err, user) {
  console.log(user)
  if (err) return handleError(err);

  user.local.webURL = req.body.webURL;
  user.save(function (err) {
    if (err) return handleError(err);

    var tokenInfo = {
      id: user._id,
      webURL: user.local.webURL
    };

    var token = jwt.sign(tokenInfo, secretValue);
    console.log(token)
    res.json({token: token });
  });
});

// end of controller function
}


module.exports = {
  getLogin:   getLogin,
  postLogin:  postLogin,
  getSignup:  getSignup,
  postSignup: postSignup,
  getLogout:  getLogout,
  getSecret:  getSecret,
  getToken: getToken,
  getTokenWithEmail: getTokenWithEmail
}
