// Creating a new row in the table
$( "#addNewAdjustmentItem" ).click(function() {
  $('#newAdjustmentTable').append('<tr><td><input type="text" name="sku"/></td><td><input type="text" name="qtyChange"/></td></tr>')
});
