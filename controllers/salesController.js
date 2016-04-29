'use strict'

var Product = require('../models/product');
var SalesOrderItem = require('../models/salesOrderItem')
var SalesOrder = require('../models/salesOrder');
var User = require('../models/user');

// GET
function getAll(req, res) {
    // SalesOrder.find((error, sales) => {
    //     console.log(sales);
    //
    //     if (error) {
    //         var res = {
    //             message: 'Sale not found'
    //         };
    //         response.json(res);
    //         return;
    //     }
    //     // response.json(sales);
    //     response.render('sales/index', {
    //         sales: sales
    //     });
    //
    // });
    SalesOrder.find().populate('itemList.product').exec(function(err, sales) {
      res.render('sales/index', {sales: sales})
})

}

function getNew(req, res) {
    // we may need to pass in the user object
    res.render('sales/new');
}

// POST
function createSale(req, res) {
    var sale = new SalesOrder();
    sale.customerName = req.body.customerName;
    sale.customerEmail = req.body.customerEmail;
    if (Array.isArray(req.body.sku)) {
        for (let i = 0; i < req.body.sku.length; i++) {
            console.log("start of array:" + i)
            let qty = req.body.qty[i]
            Product.findOne(
            {
                'sku': req.body.sku[i]
            }, function(err, product) {
              console.log("found product:" + i)
                var salesOrderItem = new SalesOrderItem({
                    product: product,
                    qty: qty
                });
                salesOrderItem.save(function(err, item) {
                  console.log("saved product:" + i)

                    sale.itemList.push(item)
                    if (i === (req.body.sku.length - 1)) {
                      
                      console.log("Saved all the entire list of products:" + i)
                        sale.save( function(err,x) {
                          // reminds us its a fkin callback
                        });
                    }
                })
                product.quantity = product.quantity - parseInt(qty)
                console.log("Products have been saved")
                product.save()
            })
        }
    } else {
        var qty = req.body.qty
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
    }
    sale.save(function(err) {
        if (err) return res.json({
            message: err.message
        });
        // putting a return is equivalent to an else
        res.redirect('/sales')
    })
}
// GET
function getSale(req, res) {
    var id = req.params.id;

    // SalesOrder.findById({
    //     _id: id
    // }, function(error, salesOrder) {
    //     if (error) response.json({
    //         message: 'Could not find sale b/c:' + error
    //     });
    //     response.render('sales/show', {
    //         salesOrder: salesOrder
    //     });
    // });

      SalesOrder.findById({_id: id}).populate('itemList.product').exec(function(error, salesOrder) {
        if(error) res.json({message: 'Could not find product b/c:' + error});
        res.render('sales/show', {salesOrder: salesOrder});
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
