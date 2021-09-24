var mysql = require('mysql');
var template = require('./template.js');

var db = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '111111',
  database : 'opentutorials'
});

// console.log(db);

db.connect(); //접속

// db.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
//   if (err) throw err;
//   console.log('The solution is: ', rows[0].solution);
// });

exports.home = function(request, response){
  db.query(`SELECT * FROM topic`, function(error, topics) { //리스트 표출
      var title = 'Welcome';
      var description = 'Hello, Node.js';
      var list = template.List(topics);
      var html = template.HTML(title, list,
          `<h2>${title}</h2>${description}`,
          `<a href="/create">create</a>`
      );
      res.send(html);
  });
}


db.end();



// db.query(`SELECT * FROM topic`, function(error, topics) { //리스트 표출
//   });
//
 // module.exprots = db;
