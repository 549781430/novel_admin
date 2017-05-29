var article_sort = {
    queryById: 'select * from jieqi_article_sort where sortid=?',
    queryAll: 'select * from jieqi_article_sort',
    queryAllCount: 'SELECT s.sortId,s.shortname,r.amount FROM jieqi_article_sort s LEFT JOIN (SELECT a.sortid,COUNT(*) amount FROM jieqi_article_article a GROUP BY a.sortid) r ON s.sortid = r.sortid',
    getAllSortCountByArticleState: 'SELECT m.sortid,m.shortname,n.amount FROM (SELECT a.sortid,COUNT(*) amount FROM jieqi_article_article a  WHERE a.fullflag=? GROUP BY a.sortid) n LEFT JOIN (SELECT s.sortId,s.shortname FROM jieqi_article_sort s) m ON n.sortid = m.sortid'
};

module.exports = article_sort;