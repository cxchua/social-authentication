var path  = require('path');


// GET /
function home(req, res) {
  res.render('index.ejs');
}

function test(req, res) {
  res.render('test.ejs');
}

module.exports = {
  home: home,
  test: test
}
