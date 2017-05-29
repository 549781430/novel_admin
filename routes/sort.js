var express = require('express');
var router = express.Router();

var sortDao = require('../dao/sortDao');

router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.get('/getSort', function(req, res, next) {
    sortDao.queryById(req, res, next);
});

router.get('/getAllSortCount', function(req, res, next) {
    sortDao.queryAllCount(req, res, next);
});

router.get('/getAllSortCountByArticleState', function(req, res, next) {
    sortDao.getAllSortCountByArticleState(req, res, next);
});

module.exports = router;