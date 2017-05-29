// 实现与MySQL交互
var mysql = require('mysql');
var $conf = require('../conf/dbConfig');
var $util = require('../util/util');
var $sql = require('./mapping/bookcaseSqlMapping');

// 使用连接池，提升性能
var pool = mysql.createPool($util.extend({}, $conf.mysql));
var json = {
    state: 1,
    info: '查询成功！',
    data: null
};

module.exports = {
    queryByUserIdAndArticleId: function(req, res, next) {
        pool.getConnection(function(err, connection) {
            connection.query($sql.queryByUserIdAndArticleId, [parseInt(req.query.uid), parseInt(req.query.articleId)], function(err, result) {
                console.log(result);
                json.data = result;
                $util.jsonWrite(res, json);
                connection.release();
            });
        });
    },
    queryByUserId: function(req, res, next) {
        pool.getConnection(function(err, connection) {
            connection.query($sql.queryByUserId, req.query.uid, function(err, result) {
                console.log(result);
                json.data = result;
                $util.jsonWrite(res, json);
                connection.release();
            });
        });
    },
    queryById: function(req, res, next) {
        pool.getConnection(function(err, connection) {
            connection.query($sql.queryById, req.query.caseid, function(err, result) {
                $util.jsonWrite(res, result);
                connection.release();

            });
        });
    }

};