var mysql = require('mysql');
var $conf = require('../conf/dbConfig');
var $util = require('../util/util');
var $sql = require('./mapping/userSqlMapping');
var $md5 = require('../util/md5');

// 使用连接池，提升性能
var pool = mysql.createPool($util.extend({}, $conf.mysql));

module.exports = {
    add: function(req, res, next) {
        pool.getConnection(function(err, connection) {
            console.log(req.body);
            connection.beginTransaction(function(err) {
                var json = {
                    state: 0,
                    info: '用户已存在或邮箱已被注册！',
                    data: null
                };
                if (err) {
                    connection.rollback(function() {
                        json.info = '系统异常';
                    });
                }
                connection.query($sql.insert, [req.body.uname, req.body.uname, $md5.encrypt(req.body.pass), Math.random() * 10000, req.body.email], function(err, result) {
                    if (err) {
                        console.log(err);
                    }
                    connection.commit(function(err) { //提交事务
                        if (err) {
                            connection.rollback(function() {});
                        }
                        console.log('success!');
                        json.info = '注册成功！';
                        json.state = 1;
                        json.data = req.body;
                        json.data.uid = result.insertId;
                        connection.release();
                        res.cookie('uid', result.insertId, { maxAge: 60 * 30000 });
                        // if (req.cookie.uid) {
                        //     req.session.uid = result.insertId;
                        // }
                        console.log(json);
                        $util.jsonWrite(res, json);
                    });
                });
            });
        });
    },
    delete: function(req, res, next) {
        // delete by Id
        pool.getConnection(function(err, connection) {
            var id = +req.query.id;
            connection.query($sql.delete, id, function(err, result) {
                if (result.affectedRows > 0) {
                    result = {
                        state: 200,
                        info: '删除成功',
                        data: null
                    };
                } else {
                    result = void 0;
                }
                $util.jsonWrite(res, result);
                connection.release();
            });
        });
    },
    update: function(req, res, next) {
        // update by id
        // 为了简单，要求同时传name和age两个参数
        var param = req.body;
        if (param.name === null || param.age === null || param.id === null) {
            $util.jsonWrite(res, undefined);
            return;
        }

        pool.getConnection(function(err, connection) {
            connection.query($sql.update, [param.name, param.age, +param.id], function(err, result) {
                // 使用页面进行跳转提示
                if (result.affectedRows > 0) {
                    res.render('suc', {
                        result: result
                    }); // 第二个参数可以直接在jade中使用
                } else {
                    res.render('fail', {
                        result: result
                    });
                }
                console.log(result);

                connection.release();
            });
        });

    },
    queryByNameAddPass: function(req, res, next) {
        var json = {
            state: 0,
            info: '用户不存在！',
            data: null
        };
        pool.getConnection(function(err, connection) {
            connection.query($sql.queryByNameAddPass, [req.body.uname, $md5.encrypt(req.body.pass)], function(err, result) {
                json.data = result;
                json.state = 1;
                json.info = '登陆成功';
                res.cookie('uid', result.insertId, { maxAge: 60 * 30000 });
                if (req.cookie === undefined || req.cookie.uid === undefined) {
                    res.cookie.uid = result.insertId;
                }
                console.log(json);
                $util.jsonWrite(res, json);
                connection.release();
            });
        });
    },
    queryAll: function(req, res, next) {
        pool.getConnection(function(err, connection) {
            connection.query($sql.queryAll, function(err, result) {
                $util.jsonWrite(res, result);
                connection.release();
            });
        });
    }

};