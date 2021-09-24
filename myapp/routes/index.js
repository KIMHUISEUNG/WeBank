// var http = require('http');
// var fs = require('fs');
// var url = require('url');
// var qs = require('querystring');
// var template = require('./public/javascripts/template.js');
// var db = require('./public/javascripts/db.js');
// var author = require('./public/javascripts/author.js');
// var mainRouter = require('./public/javascripts/topic.js');


var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'WeBank' });
});

module.exports = router;
