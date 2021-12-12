var express = require('express');
var router = express.Router();

/* GET /user_page */
router.get('/', function (req, res, next) {
  if (!req.session.userLoggedIn) {
    res.redirect('/login');
    return;
  }
  res.render('user_page');
});

module.exports = router;
