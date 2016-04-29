var Product = require('../models/product');


//GET /api/products
function getAll(request, response) {
  console.log("test")
  Product.find({'organization': currentUser.local.organization }, (error, products) => {

    if (error) {
      var res = {
        message: 'Product Not Found'
      }
      response.json(res)
      return
    }
    console.log(products);
    response.render('products/products', {products: products})
  })
}

//POST /api/products
function create(request, response) {
  var product = new Product(request.body.product);
  //add in the organization id and user id
  product.user = currentUser;
  console.log(currentUser);
  product.organization = currentUser.local.organization;
  product.save(err => {
    if(err) return response.json({message: 'could not create product'})
    response.redirect('/products')
  })
}

//GET /new
function newProduct(req, res) {
    res.render('products/new')
}

//GET /api/products/:id
function getById(req, res) {
    //var result = candy.show(req.params.id);
    //res.status(200).json(result.value);
    res.send('Get Product by id')
}

function editProduct(req, res) {
  var id = req.params.id;
  Product.findById({_id: id}, function(error, product) {

    if(error) res.json({message: 'Could not find product b/c:' + error});
    console.log(id);
    console.log(product);
    res.render('products/edit', {product: product});
  });

}

// ***************************************************
//PUT /api/products/:id
function updateProduct(req, res) {
  var id = req.params.id;

  Product.findByIdAndUpdate(id, { $set: req.body.product }, function (err, product) {
   if(err) res.json({messsage: 'Could not update product b/c:' + err});

   res.redirect('/products')
  });

}

// ***********************************************
//DELETE /api/products/:id
function deleteProduct(req, res) {
 var id = req.params.id;

 Product.remove({_id: id}, function(err) {
   if(err) res.json({message: 'Could not delete product b/c: ' + err});

   res.redirect('/products')
 });
}


module.exports = {
  getAll:       getAll,
  create:       create,
  newProduct:   newProduct,
  editProduct:  editProduct,
  getById:      getById,
  updateProduct:   updateProduct,
  deleteProduct:    deleteProduct
}
