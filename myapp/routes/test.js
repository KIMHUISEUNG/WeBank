var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('test', { title: 'Test' ,home:'WeBank'});
});
router.get('/test2', (req,res) => {
  res.render('test', { title: 'Test2',home:'WeBank'})
})

module.exports = router;
