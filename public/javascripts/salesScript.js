$("#addNewSalesItem").click(function() {
    $('#newSalesTable').append('<tr><td><input type="text" name="sku"/></td><td><input type="text" name="qty"/></td></tr>')
});

// $("#addNewSalesItem").click(function() {
//     $('.elements1').append("<div class="form-group col-md-2"><input type="text" class="form-control" name="sku" placeholder="SKU" /></div><div class="form-group col-md-2"><input type="text" class="form-control" name="qty" placeholder="Quantity" /></div>")
// });
