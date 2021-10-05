var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('toon_information', { title: 'Toon_information' }, express.static('public'));
});

module.exports = router;
