var express = require('express');
var router = express.Router();

var userDao = require('../dao/userDao');

router.get('/', function(req, res, next) {
    res.render('updateUser');
});

router.post('/regist', function(req, res, next) {
    userDao.add(req, res, next);
});

router.get('/queryAll', function(req, res, next) {
    userDao.queryAll(req, res, next);
});

router.post('/login', function(req, res, next) {
    userDao.queryByNameAddPass(req, res, next);
});

router.post('/loginOut', function(req, res, next) {
    res.cookie(req.body.uid, null, { maxAge: 0 });
    res.json({
        state: '1',
        info: '注销成功！',
        data: null
    });
});

router.post('/updateUser', function(req, res, next) {
    userDao.update(req, res, next);
});

module.exports = router;