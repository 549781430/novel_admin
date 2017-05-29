var article_article = {
    queryById: 'select a.*,s.shortname from jieqi_article_article a,jieqi_article_sort s where a.articleId=? and a.sortId=s.sortId',
    searchPage: 'select * from jieqi_article_article where articlename like ? or keywords like ? or author like ? limit ?,?',
    queryPage: 'select * from jieqi_article_article where ? limit ?,?',
    queryBang: 'select * from jieqi_article_article ? order by ? DESC limit ?,?'
};

module.exports = article_article;