var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('Toon_information', { title: 'Toon_information' });
});

module.exports = router;
