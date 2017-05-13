var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index.ejs');
});

router.get('/main', function(req, res, next) {
    console.log(req.session.uid);
  res.render('main.ejs');
});

module.exports = router;
