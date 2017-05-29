// 实现与MySQL交互
var mysql = require('mysql');
var $conf = require('../conf/dbConfig');
var $util = require('../util/util');
var $redis = require('../service/redisService');
var $sql = require('./mapping/chapterSqlMapping');

// 使用连接池，提升性能
var pool = mysql.createPool($util.extend({}, $conf.mysql));
var json = {
    state: 1,
    info: '查询成功！',
    data: []
};

module.exports = {

    getChapterByArticleId: function(req, response, next) {
        var articleId = req.query.articleId;
        $redis.zrange('chapter-' + articleId, 0, -1, function(err, result) {
            if (result !== undefined && result !== null && result.length > 0) {
                var str = '[' + result.join(',') + ']';
                json.data = JSON.parse(str);
                $util.jsonWrite(response, json);
            } else {
                pool.getConnection(function(err, connection) {
                    connection.query($sql.getChapterByArticleId, parseInt(articleId), function(err, result) {
                        var string = JSON.stringify(result);
                        var list = JSON.parse(string);
                        json.data = list;
                        var length = list.length;
                        for (var i = 0; i < length; i++) {
                            $redis.zadd("chapter-" + articleId, parseInt(list[i].chapterorder), JSON.stringify(list[i]));
                        }
                        json.data = result;
                        $util.jsonWrite(response, json);
                        connection.release();
                    });
                });
            }
        });
    },
    getChapterById: function(req, res, next) {
        pool.getConnection(function(err, connection) {
            connection.query($sql.getChapterById, parseInt(req.query.chapterId), function(err, result) {
                json.data = result;
                $util.jsonWrite(res, json);
                connection.release();
            });
        });
    }

};