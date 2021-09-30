var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('toon_information', { title: 'toon_information' });
});

module.exports = router;
