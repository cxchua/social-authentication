'use strict'

var express     = require('express');
var router      = express.Router();
var passport    = require("passport");


//Reference to individual controller files
var productsAPIController  = require('../controllers/productsAPIController');
var salesAPIController     = require('../controllers/salesAPIController');
var authAPIController      = require('../controllers/authAPIController')

function authenticatedUser(req, res, next){
    if (req.isAuthenticated()) return next();
    req.flash('errorMessage', "Login to access");
    res.redirect('/login');
}

/*
 * Note: Please place the routes for a particular controller
 * under its corresponding section below
 */

//=============== API Routes to Products Controller ========================

router.route('/api/products')
    .get(productsAPIController.getAll)

router.route('/api/products/:id')
    .get(productsAPIController.showProduct)

//=============== API Routes to Sales Controller ===========================

router.route('/api/sales')
    .get(salesAPIController.getAll)
    .post(salesAPIController.createSale)

router.route('/api/sales/:id')
  .get(salesAPIController.getSale)
  .put(salesAPIController.updateSale)
  .delete(salesAPIController.removeSale)

//=============== Routes for Json Web Token (To be implemented)=============

// Removing it temporarily because we want user to sign in through our cms to get a token
// router.route('/api/authorizations')
//   .post(authAPIController.getToken)

//================ End of Routes =======================================


module.exports = router
