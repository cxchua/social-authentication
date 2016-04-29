
//Configure the strategy for using passport for authentication in this app

//import package for authentication
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');
var Organization = require('../models/organization');

module.exports = function(passport){

    //Reason for doing this way is for seperation of responsibility.
    //passport does not care how user is stored, it passes an id and lets the model handle getting the user
    //passport gives us a user and expects us to return an id
    passport.serializeUser(function(user, done){
        done(null, user.id);
    })

    //Passport gives us an id and expects us to return it a user
    passport.deserializeUser(function(id, done){
        User.findById(id, function(err, user){
            done(err, user);
        })
    })


    passport.use('local-signup', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, function(req, email, password, done) {
        //put logic to authenticate user here

        //Use mongoose to find the use with the local email
        User.findOne({'local.email': email}, function(err,user){
            if (err) return done(err);

            //first parameter to done() is err so in the event there is no failure return null for the error parameter
            if (user) return done(null, false, req.flash('errorMessage', "this email is already taken!"));

            Organization.findOne({'name': req.body.organization_name}, function(err,organization){
              if (err) return done(err);
              if (organization) return done(null, false, req.flash('errorMessage', "this organization is already taken!"))

              var organization = new Organization();
              organization.name = req.body.organization_name
              organization.save(function(err, organization){
                // error message for existing organization

                var newUser = new User();
                newUser.local.name = req.body.name;
                newUser.local.email  = email;
                newUser.local.password = User.encrypt(password);
                newUser.local.organization = organization._id;

                newUser.save(function(err, user){
                    if(err) return done(err);
                    return done(null, user);
                })

              })

            })

        })
    }));

    passport.use('local-login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, function(req, email, password, done) {

        User.findOne({'local.email': email}, function(err,user){
            if(err) return done(err);

            //No User therfore cannot login
            if (!user) return done(null, false, req.flash('errorMessage', "No user found!"));

            //If no valid password
            if(!user.validPassword(password)) {
                return done(null, false, req.flash('errorMessage', "Password is wrong"));
            }

            done(null, user);
        });

    }));
}
