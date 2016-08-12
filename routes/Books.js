var express = require('express');
var router = express.Router();
var bookDao = require('../dao/BookDao');

router.get('/addBook', function(req, res, next) {
  bookDao.add(req, res, next);
});

module.exports = router;
