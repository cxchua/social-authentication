'use strict'

var Product = require('../models/product');
var SalesOrderItem = require('../models/salesOrderItem')
var SalesOrder = require('../models/salesOrder');
var User = require('../models/user');

// GET
function getAll(request, response) {
    SalesOrder.find((error, sales) => {
        console.log(sales);

        if (error) {
            var res = {
                message: 'Sale not found'
            };
            response.json(res);
            return;
        }
        // response.json(sales);
        response.render('sales/index', {
            sales: sales
        });

    });
}

function getNew(req, res) {
    // we may need to pass in the user object
    res.render('sales/new');
}

// POST
function createSale(req, res) {
    var sale = new SalesOrder();

    //Get customerName and customerEmail from the body
    sale.customerName = req.body.customerName;
    sale.customerEmail = req.body.customerEmail;

    //Get the qty form the body
    var qty = req.body.qty

    //get sku from the body
    Product.findOne({
        'sku': req.body.sku
    }, function(err, product) {
        var salesOrderItem = new SalesOrderItem({
            product: product,
            qty: qty
        });
        salesOrderItem.save(function(err, item) {
            sale.itemList.push(item)
            sale.save();
        });
        product.quantity = product.quantity - parseInt(qty)
        product.save()
    })

    sale.save(function(err, sale) {
        if (err) return res.json({
            message: err.message
        });

        res.json(sale)
    })
}
// GET
function getSale(request, response) {
    var id = request.params.id;

    SalesOrder.findById({
        _id: id
    }, function(error, salesOrder) {
        if (error) response.json({
            message: 'Could not find sale b/c:' + error
        });
        response.render('sales/show', {
            salesOrder: salesOrder
        });
    });
}

function updateSale(request, response) {
    var id = request.params.id;

    SalesOrder.findById({
        _id: id
    }, function(error, sale) {
        if (error) response.json({
            message: 'Could not find sale b/c:' + error
        });

        sale.save(function(error) {
            if (error) response.json({
                messsage: 'Could not update sale b/c:' + error
            });

            // response.json({message: 'Sale successfully updated'});
            response.redirect('/sales');
        });
    });
}

function removeSale(request, response) {
    var id = request.params.id;

    SalesOrder.remove({
        _id: id
    }, function(error) {
        if (error) response.json({
            message: 'Could not delete sales order b/c:' + error
        });

        response.redirect('/sales');
    });
}

module.exports = {
    getAll: getAll,
    getNew: getNew,
    getSale: getSale,
    createSale: createSale,
    updateSale: updateSale,
    removeSale: removeSale
}
