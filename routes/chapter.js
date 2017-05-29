var express = require('express');
var router = express.Router();

var chapterDao = require('../dao/chapterDao');

/* GET chapter listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.get('/getChapterByArticleId', function(req, res, next) {
    chapterDao.getChapterByArticleId(req, res, next);
});

router.get('/getChapterById', function(req, res, next) {
    chapterDao.getChapterById(req, res, next);
});

module.exports = router;