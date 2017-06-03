var express = require('express');
var fstream = require('fstream');
var tar = require('tar');
var zlib = require('zlib');
var router = express.Router();
var path = require('path');
var fs = require("fs");
var iconv = require('iconv-lite');

var articleDao = require('../dao/articleDao');

var json = {
    state: 1,
    info: '查询成功！',
    data: null
};

router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});
router.get('/queryById', function(req, res, next) {
    articleDao.queryById(req, res, next);
});

router.get('/searchPage', function(req, res, next) {
    articleDao.searchPage(req, res, next);
});

router.get('/queryPage', function(req, res, next) {
    articleDao.queryPage(req, res, next);
});

router.get('/download', function(req, res, next) {
    //var articleId = req.query.articleId;
    var filePath = path.join(__dirname, '../files/article/txt/0/' + 1);
    var targetPath = path.join(__dirname, '../files/article/txt/0/' + 1 + '.tar.gz');
    var fileName = 1 + '.tar.gz';
    try {
        // fstream.Reader({ 'path': 'files/article/txt/0/' + 1, 'type': 'Directory' })
        //     .pipe(new tar.Pack())
        //     .pipe(zlib.Gzip())
        //     .pipe(fstream.Writer({ 'path': 'files/article/txt/0/' + 1 + '.tar.gz', 'type': 'File' }));
        //.pipe(res);
        fstream.Reader('files/article/txt/0/' + 1)
            .pipe(new tar.Pack())
            .pipe(zlib.Gzip())
            .pipe(fstream.Writer('files/article/txt/0/' + 2 + '.tar.gz'));
    } catch (error) {
        console.log(error);
        res.end(500);
    }
});

router.get('/queryBang', function(req, res, next) {
    articleDao.queryBang(req, res, next);
});

router.get('/getData', function(req, res, next) {
    var articleId = req.query.articleId;
    var chapterOrder = req.query.chapterOrder;
    var start = req.query.start;
    var length = parseInt(req.query.length);
    var filePath = path.join(__dirname, '../files/article/txt/0/' + articleId + '/' + chapterOrder + '.txt');
    console.log(filePath);
    // 异步读取
    fs.open(filePath, 'r', function(err, fd) {
        if (err) {
            json.state = 0;
            res.json(json);
            return;
        }
        var buf = new Buffer(length);
        //读取fd文件内容到buf缓存区
        fs.read(fd, buf, 0, length, start, function(err, bytesRead, buffer) {
            var str = iconv.decode(buf, 'utf8');
            json.data = str;
            res.json(json);
        });
    });
});

module.exports = router;