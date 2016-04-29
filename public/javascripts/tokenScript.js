$(document).ready(function(){
  // click button
  // retrieve information from input webURL
  $('#webURLForm').submit(postWebURL)

  // getToken();
});

function postWebURL(e){
  e.preventDefault();
  $.ajax({
      type: 'POST',
      url: $('#webURLForm').attr('action'),
      data : $('#webURLForm').serialize(),
      success: function(){
        console.log('form submitted.');
      }
    })
    .done(function(data){
      console.log('server response received')
      displayToken(data.token);
    });
}

function displayToken(token) {
  console.log(token)
  // put in .attr("class","className") & then put className in the css stylesheets
  var generatedToken = $("<div>").html(token).css("word-wrap","break-word")
  $('#tokenDisplay').append(generatedToken)
}
