var express        = require('express');
var app            = express();
var mongoose       = require('mongoose');
var expressJWT     = require('express-jwt');
var jwt            = require('jsonwebtoken');
var passport       = require('passport');
var flash          = require('connect-flash');
var ejsLayouts     = require("express-ejs-layouts");
var morgan         = require('morgan');
var cookieParser   = require('cookie-parser');
var bodyParser     = require('body-parser');
var session        = require('express-session');
var methodOverride = require('method-override');

// Setup database
var databaseURL = process.env.MONGODB_URI || 'mongodb://localhost/hakimchi-v1';
mongoose.connect(databaseURL);

// Configure Passport to use Auth0
var strategy = require('./setup-passport');

// Setup middleware
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

//Used for encrypting our json web token
//unique for each webb application
var secretValue = "hakimchiiiiii";
// Middleware for API routes JWT Token
app.use('/api/products', expressJWT({secret: secretValue}));

app.use(function(error, request, response, next) {
  // Check type of error
  if ( error.name === "UnauthorizedError" ) {
    // response.json({message: "Some token error"})
    response.status(401).json( {message: "You do not have access to that classified information." });
  } else {
    response.json({message: "Some other error"})
  }
})

app.use(ejsLayouts);
app.use(express.static(__dirname + '/public'));
app.use(methodOverride('_method'));

// Tell express to use sessions
app.use(session({ secret: 'hakimchi', resave: false,  saveUninitialized: false }));

//Initialze the passport
app.use(passport.initialize());

//Tell passport to use sessions
app.use(passport.session());

app.use(flash());
app.use(methodOverride(function(request, response) {
  if(request.body && typeof request.body === 'object' && '_method' in request.body) {
    var method = request.body._method;
    delete request.body._method;
    return method;
  }
}));

// Express settings
app.set('view engine', 'ejs');
app.set("views", __dirname + "/views");

//pass the passport to the configurator for configuring it to the local strategy
require('./config/passport')(passport);

//Set the currentUser to the req.user so that it is accessable from all the views
//alternative way is to pass req.user to all views to access the current user
app.use(function(req, res, next){
    global.currentUser = req.user;
    next();
});

// Auth0 callback handler
app.get('/callback',
  passport.authenticate('auth0', { failureRedirect: '/url-if-something-fails' }),
  function(req, res) {
    if (!req.user) {
      throw new Error('user null');
    }
    res.redirect("/user");
  });

  app.get('/user', function (req, res) {
    res.render('user', {
      user: req.user
    });
  });

var routes = require(__dirname + "/config/routes");
var apiRoutes = require(__dirname + "/config/apiRoutes");
app.use(routes)
app.use(apiRoutes);

app.listen(process.env.PORT || 3000);
