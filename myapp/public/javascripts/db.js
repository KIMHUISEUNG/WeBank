var mysql = require('mysql');
var db = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '111111',
  database : 'opentutorials'
});

db.connect(); //접속
module.exprots = db;
