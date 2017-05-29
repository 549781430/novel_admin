var article_bookcase = {
    queryById: 'select * from jieqi_article_bookcase where caseid=?',
    delete: 'delete from jieqi_article_bookcase where caseid=?',
    updateById: 'update jieqi_article_bookcase set chapterid=?,lastvisit=? where caseid=?',
    queryByUserId: 'select a.* from jieqi_article_article a where a.articleid in (select b.articleid from jieqi_article_bookcase b where b.userid=?)',
    queryByUserIdAndArticleId: 'select * from jieqi_article_bookcase where userid=? and articleid=?'
};

module.exports = article_bookcase;