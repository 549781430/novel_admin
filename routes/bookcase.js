var express = require('express');
var router = express.Router();

var bookcaseDao = require('../dao/bookcaseDao');

router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.get('/queryByUserIdAndArticleId', function(req, res, next) {
    bookcaseDao.queryByUserIdAndArticleId(req, res, next);
});

router.get('/queryByUserId', function(req, res, next) {
    bookcaseDao.queryByUserId(req, res, next);
});

router.get('/getAllSortCount', function(req, res, next) {
    bookcaseDao.queryByUserIdAndArticleId(req, res, next);
});

router.get('/getSort', function(req, res, next) {
    bookcaseDao.queryByUserIdAndArticleId(req, res, next);
});

router.get('/getAllSortCount', function(req, res, next) {
    bookcaseDao.queryByUserIdAndArticleId(req, res, next);
});
module.exports = router;