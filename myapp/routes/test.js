// var express = require('express');
// var router = express.Router();
var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');
var qs = require('querystring');
var db = require('../public/javascripts/db.js')
var sanitizeHtml = require('sanitize-html');
var template = require('../public/javascripts/template.js');

// test.js에서의 /는 /test 와 같다.
router.get('/', function(req, res,){
  res.send('test respond with a resource');
})

// url == /test/create
router.get('/test1', function(req, res,){
  res.send('create page');
})

// url == /test/update
router.get('/test2', function(req, res,){
  res.send('update page');
})

// module.exports = router;



router.get('/create', function(request, response) {
  db.query(`SELECT * FROM topic`, function(error, topics) { //리스트 표출
      db.query(`SELECT * FROM author`, function(error2, authors){
        var title = 'Create';
        var list = template.List(topics);
        var html = template.HTML(sanitizeHtml(title), list,
            `
            <form action="/create_process" method="post">
              <p><input type="text" name="title" placeholder="title"></p>
              <p>
                  <textarea name="description" placeholder="description"></textarea>
              </p>
              <p>
                ${template.authorSelect(authors)}
              </p>
              <p>
                  <input type="submit">
              </p>
            </form>
            `,
            `<a href="/create">create</a>`
        );
        response.send(html);
      });
    });
});
router.post('/create_process', function(request, response) {
    console.log(request.list);
    var post = request.body;
    var title = post.title;
    var description = post.description;
    fs.writeFile(`data/${title}`, description, 'utf8', function(err) {
        response.redirect(`/topic/${title}`);
    });
});
router.get('/update/:pageId', function(request, response) {
    var filteredId = path.parse(request.params.pageId).base;
    fs.readFile(`data/${filteredId}`, 'utf8', function(err, description) {
        var title = request.params.pageId;
        var list = template.list(request.list);
        var html = template.HTML(title, list,
            `
            <form action="/topic/update_process" method="post">
                <input type="hidden" name="id" value="${title}">
                <p><input type="text" name="title" placeholder="title" value="${title}"></p>
                <p>
                    <textarea name="description"
                        placeholder="description">${description}</textarea>
                </p>
                <p>
                    <input type="submit">
                </p>
            </form>
            `,
            `<a href="/topic/create">create</a> <a href="/topic/update/${title}">update</a>`
        );
        response.send(html);
    });
});
router.post('/update_process', function(request, response) {
    var post = request.body;
    var id = post.id;
    var title = post.title;
    var description = post.description;
    fs.rename(`data/${id}`, `data/${title}`, function(error) {
        fs.writeFile(`data/${title}`, description, 'utf8', function(err) {
            response.redirect(`/topic/${title}`);
            response.end();
        });
    });
});
router.post('/delete_process', function(request, response) {
    var post = request.body;
    var id = post.id;
    var filteredId = path.parse(id).base;
    fs.unlink(`data/${filteredId}`, function(error) {
        response.redirect('/');
    });
});
router.get('/:pageId', function(request, response, next) {
    var filteredId = path.parse(request.params.pageId).base;
    fs.readFile(`data/${filteredId}`, 'utf8', function(err, description) {
        if(err) {
            next(err);
        } else {
            var title = request.params.pageId;
            var sanitizedTitle = sanitizeHtml(title);
            var sanitizedDescription = sanitizeHtml(description, {
                allowedTags:['h1']
            });
            var list = template.list(request.list);
            var html = template.HTML(sanitizedTitle, list,
                `<h2>${sanitizedTitle}</h2>${sanitizedDescription}`,
                ` <a href="/topic/create">create</a>
                    <a href="/topic/update/${sanitizedTitle}">update</a>
                    <form action="/topic/delete_process" method="post">
                        <input type="hidden" name="id" value="${sanitizedTitle}">
                        <input type="submit" value="delete">
                    </form>`
            );
            response.send(html);
        }
    });
});
module.exports = router;
