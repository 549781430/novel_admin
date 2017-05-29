var article_chapter = {
    getChapterById: 'select * from jieqi_article_chapter where chapterid=?',
    getChapterByArticleId: 'select * from jieqi_article_chapter where articleid=?'
};

module.exports = article_chapter;