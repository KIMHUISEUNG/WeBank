var express = require('express');
var router = express.Router();

var app = express();  // express 별칭 부여

// ---------- 추가 require 모음 -----------
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'WeBank' });
});

app.get('/', (req, res) => {
  fs.readFile('k_양말도깨비.png', function(error, data){
    res.writeHead(200, {'Content-Type': 'text/html' });
    res.end(data);
  }
});

module.exports = app;
module.exports = router;
