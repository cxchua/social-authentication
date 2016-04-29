// jQuery
$(document).ready(function(){
    //Create product listing table
    getProducts();
});

// For testing (Development)
var serverUrl= "http://localhost:4000"
// For Production
// var serverUrl = "https://agile-shore-23356.herokuapp.com"

function sendOurDataViaAJAX(e){
    //stay on page
    e.preventDefault();
    let submittedForm = e.target;
    console.log(submittedForm)

   //Create a json object for posting to the create sale API
    var salesOrder = {};
    $.each($(submittedForm).serializeArray(), function(i, field) {
        salesOrder[field.name] = field.value;
    });

    salesOrder['customerName'] = $('#customerName').val();
    salesOrder['customerEmail'] = $('#customerEmail').val();
    console.log(salesOrder)

  // create a new AJAX request
  $.post(serverUrl + "/api/sales", salesOrder)
    .done(function(){
        //Do this after successful post
        //Get the stock quantity of the row which the buy button was clicked
        var stockQty = $(submittedForm).parent().children().eq(5);
        stockQty.text(Number(stockQty.text()) - salesOrder['qty']);
        console.log(stockQty);
    });

  // clear customer name, email text fields, and the order qty input boxes
    $('input[type="number"]').val(null)
    $(':text').val(null)
}

//Pull the product list from the api server. and loop through each product to create the row
//Required to pass the token in the post request header
function getProducts(){
  $.ajax({
    // insert your token here
    headers: {'Authorization': "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjU3MGZkYTFkYjBlZTFiMDMwMDNhYTE1MyIsIndlYlVSTCI6ImFnaWxlLXNob3JlLTIzMzU2Lmhlcm9rdWFwcC5jb20iLCJpYXQiOjE0NjA2NTcwNTd9.Dypn3JjHhT8e3f4RX-vTBI7uBE_h4bcnbz155avdxhg"},
    type: 'GET',
    url: serverUrl+'/api/products'
  })
    .done(function(data){
      $.each(data, function(index, product){
        addProduct(product);
      });
    });
}

//Generate the the table row for each product and append to the table
function addProduct(product) {
    var image = $("<img>").attr("src", product.imageUrl).attr("height", "70");
    var imageUrl = $("<td>").html(image);
    var sku = $("<td>").html(product.sku);
    var name = $("<td>").html(product.name);
    var productType = $("<td>").html(product.productType);
    var brand = $("<td>").html(product.brand);
    var quantity = $("<td>").html(product.quantity);
    var sellingPrice = $("<td>").html(product.sellingPrice);
    var active = $("<td>").html(product.active);

    //Create the submit form for the buy button
    var skuHidden = $('<input>').attr({ type: 'hidden', name: 'sku', value: product.sku});
    var orderQty = $("<input type='number' name='qty' min='1' max='10'>");
    var orderBtn = $("<button type='submit' class='btn btn-danger col-md-12'>Buy</button>");
    var form = $("<form class='item-form'>").append(skuHidden).append(orderQty).append(orderBtn)

    //Populate the whole row and append the row to the table
    var row = $("<tr></tr>").append(imageUrl).append(sku).append(name).append(productType)
        .append(brand).append(quantity).append(sellingPrice).append(active).append(form);
    $("table#products").append(row)

    //Add listeners to the buy form created in that row. This can be done only after it is generated above
    form.on('submit', sendOurDataViaAJAX)

}
