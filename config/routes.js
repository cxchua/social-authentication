'use strict'

var express     = require('express');
var router      = express.Router();
var bodyParser = require('body-parser'); //parses information from POST
var passport    = require("passport");
var methodOverride = require('method-override'); //used to manipulate POST

//Reference to individual controller files
var staticsController   = require('../controllers/staticsController');
var usersController     = require('../controllers/usersController');
var productsController  = require('../controllers/productsController');
var salesController     = require('../controllers/salesController');
var stocksController    = require('../controllers/stocksController');


function authenticatedUser(req, res, next){
    if (req.isAuthenticated()) return next();
    req.flash('errorMessage', "Login to access");
    res.redirect('/login');
}

/*
 * Note: Please place the routes for a particular controller
 * under its corresponding section below
 */

//=============== Routes to Statics Controller ==========================
router.route('/')
    .get(staticsController.home)

router.route('/testing')
    .get(staticsController.test)

//=============== Routes to Users Controller ========================
router.route('/secret')
    .get(authenticatedUser, usersController.getSecret)

router.route('/signup')
  .get(usersController.getSignup)
  .post(usersController.postSignup)

router.route('/login')
  .get(usersController.getLogin)
  .post(usersController.postLogin)

router.route('/logout')
  .get(usersController.getLogout)

//=============== Routes to Products Controller ==========================
router.route('/products')
    .get(authenticatedUser, productsController.getAll)
    .post(authenticatedUser, productsController.create)


router.route('/products/new')
    .get(authenticatedUser, productsController.newProduct)

router.route('/products/:id')
    .get(authenticatedUser, productsController.editProduct)
    .patch(authenticatedUser, productsController.updateProduct)
    .delete(authenticatedUser, productsController.deleteProduct)

//=============== Routes to Sales Controller ===========================

router.route('/sales')
  .get(authenticatedUser, salesController.getAll)
  .post(authenticatedUser, salesController.createSale)

router.route('/sales/new')
  .get(authenticatedUser, salesController.getNew)

router.route('/sales/:id')
  .get(authenticatedUser, salesController.getSale)
  .patch(authenticatedUser, salesController.updateSale)
  .delete(authenticatedUser, salesController.removeSale)

//=============== Routes to Stocks Controller ==========================
router.route('/stock_adjustment')
    .get(authenticatedUser, stocksController.getAll)
    .post(authenticatedUser, stocksController.create)

router.route('/stock_adjustment/new')
    .get(authenticatedUser, stocksController.getNew)

router.route('/stock_adjustment/:id')
    // only get request and no patch or delete request for inventory security
    // can consider allowing it later for certain users (supervisor)
    .get(authenticatedUser, stocksController.getById)

//=============== Routes to User =======================================
router.route('/token')
  .get(authenticatedUser, usersController.getToken)
  .post(authenticatedUser, usersController.getTokenWithEmail)
//================ End of Routes =======================================



module.exports = router
