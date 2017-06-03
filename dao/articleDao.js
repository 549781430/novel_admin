// 实现与MySQL交互
var mysql = require('mysql');
var $conf = require('../conf/dbConfig');
var $util = require('../util/util');
var $sql = require('./mapping/articleSqlMapping');

// 使用连接池，提升性能
var pool = mysql.createPool($util.extend({}, $conf.mysql));
var json = {
    state: 1,
    info: '查询成功！',
    data: []
};

module.exports = {

    queryById: function(req, res, next) {
        pool.getConnection(function(err, connection) {
            connection.query($sql.queryById, parseInt(req.query.articleId), function(err, result) {
                json.data = result[0];
                console.log("返回数据：" + JSON.stringify(json));
                $util.jsonWrite(res, json);
                connection.release();
            });
        });
    },
    searchPage: function(req, res, next) {
        console.log(req.query.text);
        pool.getConnection(function(err, connection) {
            connection.query($sql.searchPage, ['%' + req.query.text + '%', '%' + req.query.text + '%', '%' + req.query.text + '%', parseInt(req.query.start), parseInt(req.query.pageSize)], function(err, result) {
                json.data = result;
                $util.jsonWrite(res, json);
                connection.release();
            });
        });
    },
    queryPage: function(req, res, next) {
        pool.getConnection(function(err, connection) {
            var array = ['', parseInt(req.query.start), parseInt(req.query.pageSize)];
            if (req.query.fullflag)
                array[0] = 'fullflag=' + req.query.fullflag;
            connection.query($sql.queryPage, array, function(err, result) {
                json.data = result;
                $util.jsonWrite(res, json);
                connection.release();
            });
        });
    },
    queryBang: function(req, res, next) {
        pool.getConnection(function(err, connection) {
            if (req.query.tag == '周点击榜')
                req.query.tag = 'weekvisit';
            else if (req.query.tag == '月点击榜')
                req.query.tag = 'monthvisit';
            else if (req.query.tag == '总点击榜')
                req.query.tag = 'allvisit';
            else
                req.query.tag = 'postdate';
            console.log(req.query.tag + " fullflag:" + req.query.fullflag);
            var param = ['', req.query.tag, parseInt(req.query.start), parseInt(req.query.pageSize)]; // and a.sortid=' + req.query.sortId + '
            var sql = 'select a.*,s.shortname from jieqi_article_article a,jieqi_article_sort s where a.sortId=s.sortId order by ' + req.query.tag + ' DESC limit ' + req.query.start + ',' + req.query.pageSize;
            if (req.query.fullflag) {
                if (req.query.sortId)
                    sql = 'select a.*,s.shortname from jieqi_article_article a,jieqi_article_sort s where a.sortId=s.sortId and a.sortid=' + req.query.sortId + ' and fullflag=' + req.query.fullflag + ' order by ' + req.query.tag + ' DESC limit ' + req.query.start + ',' + req.query.pageSize;
                else
                    sql = 'select a.*,s.shortname from jieqi_article_article a,jieqi_article_sort s where a.sortId=s.sortId and fullflag=' + req.query.fullflag + ' order by ' + req.query.tag + ' DESC limit ' + req.query.start + ',' + req.query.pageSize;
            } else {
                if (req.query.sortId)
                    sql = 'select a.*,s.shortname from jieqi_article_article a,jieqi_article_sort s where a.sortId=s.sortId and a.sortid=' + req.query.sortId + ' order by ' + req.query.tag + ' DESC limit ' + req.query.start + ',' + req.query.pageSize;
                else
                    sql = 'select a.*,s.shortname from jieqi_article_article a,jieqi_article_sort s where a.sortId=s.sortId order by ' + req.query.tag + ' DESC limit ' + req.query.start + ',' + req.query.pageSize;
            }
            //'select * from jieqi_article_article ? order by ? DESC limit ?,?'
            //connection.query($sql.queryBang, param, function(err, result) {
            connection.query(sql, function(err, result) {
                json.data = result;
                $util.jsonWrite(res, json);
                connection.release();
            });
        });
    }

};