var mysql = require('mysql');
var $conf = require('../conf/dbConfig');
var $util = require('../util/util');
var $redis = require('../service/redisService');
var $sql = require('./mapping/sortSqlMapping');

// 使用连接池，提升性能
var pool = mysql.createPool($util.extend({}, $conf.mysql));
var json = {
    state: 1,
    info: '查询成功！',
    data: []
};
module.exports = {
    queryById: function(req, response, next) {
        pool.getConnection(function(err, connection) {
            var json = {
                state: 1,
                info: '查询成功！',
                data: []
            };
            connection.query($sql.queryById, req.query.sortId, function(err, result) {
                json.data = result;
                connection.release();
                $util.jsonWrite(response, json);
            });
        });
    },
    queryAll: function(req, response, next) {
        pool.getConnection(function(err, connection) {
            var result = $redis.zrange('sort');
            if (result)
                return result;
            connection.query($sql.queryAll, function(err, result) {
                array.forEach(function(result) {

                    //$redis.zadd('sort', result.sortId, shortname);
                }, this);
                $util.jsonWrite(response, result);
                connection.release();
            });
        });
    },
    queryAllCount: function(req, response, next) {
        pool.getConnection(function(err, connection) {
            var json = {
                state: 1,
                info: '查询成功！',
                data: []
            };
            $redis.hgetall('sortCount', function(err, res) {
                console.log("来自redis:48" + res);
                if (res !== null) {
                    json.data = res;
                    $util.jsonWrite(response, json);
                } else {
                    connection.query($sql.queryAllCount, function(err, result) {
                        var string = JSON.stringify(result);
                        console.log("queryAllCount55:" + string);
                        var list = JSON.parse(string);
                        json.data = list;
                        for (var i = 0; i < list.length; i++) {
                            $redis.hmset('sortState', list[i], function(err, res) {
                                console.log("============hmset: 60" + res);
                            });
                        }
                        connection.release();
                        $util.jsonWrite(response, json);
                    });
                }
            });
        });
    },
    getAllSortCountByArticleState: function(req, response, next) {
        $redis.hgetall('sortCount' + req.query.state, function(err, res) {
            console.log("来自redis:80" + res);
            if (res !== null) {
                json.data = res;
                $util.jsonWrite(response, json);
            } else {
                pool.getConnection(function(err, connection) {
                    connection.query($sql.getAllSortCountByArticleState, req.query.state, function(err, result) {
                        //将RowDataPacket对象装化成json字符串  
                        var string = JSON.stringify(result);
                        console.log("==========getAllSortCountByArticleState:" + string);
                        //将json字符串转化成json数组  
                        var list = JSON.parse(string);
                        json.data = list;
                        //遍历json数组  
                        for (var i = 0; i < list.length; i++) {
                            $redis.hmset('sortState' + req.query.state, list[i], function(err, res) {
                                console.log("========hmset: 95" + res);
                                //$redis.quit();
                            });
                        }
                        connection.release();
                        console.log(json);
                        $util.jsonWrite(response, json);
                    });
                });
            }
        });
    }

};