var Product = require('../models/product');

//GET /api/products
function getAll(request, response) {

// fun fact: if you console.log a string and concatenate it with the user -> you wont be able to inspect the full object
// JWT middleware decodes the token and adds the token info into request as user property
// console.log("THIS CONSOLE LOG: " + request.user)
  console.log("LOOK HERE")
  console.log(request.user)
  console.log(request.hostname)
  // ============================== JWT MiddleWare if else insert ==============
  // if request of website url is not equal to what user saved it as do not allow.
  if (request.user.webURL === request.hostname ) {
    //TODO: Please filter away all inactive products before return json

    Product.find( (error, products) => {
      if (error) {
        var res = {
          message: 'Product Not Found'
        }
        return response.json(res)

      }
      response.json(products);
    })

  }
  else {
    // not suppose to send data if the user is hacking someone's token
  }

}

function showProduct(req, res) {
  var id = req.params.id;
  Product.findById({_id: id}, function(error, product) {

    if(error) res.json({message: 'Could not find product b/c:' + error});
    console.log(id);
    console.log(product);
    res.render('products/edit', {product: product});
  });

}

module.exports = {
  getAll:       getAll,
  showProduct:  showProduct
}
