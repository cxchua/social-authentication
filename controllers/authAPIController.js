// var jwt = require('jsonwebtoken');
//
// //Used for encrypting our json web token
// //unique for each webb application
// var secretValue = "onhermajestyssecretservice";
//
// function getToken(request, response) {
//   var tokenInfo = {
//     name: 'James Bond',
//     codename: "007",
//     id: "5705cff86671ce8d479edd76"
//   }
//
//   //make a token and send it as json
//   var token = jwt.sign(tokenInfo, secretValue);
//   console.log(token)
//   response.json( {agent: tokenInfo, token: token });
// }
//
// module.exports = {
//   getToken: getToken
// }
