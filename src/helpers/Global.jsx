export const Global = {
    api_url: 'http://localhost:3900/api',
    api_endpoints: {
        add_article: 'http://localhost:3900/api/newArticle',
        list_articles: 'http://localhost:3900/api/listArticles',
        list_articles_mostRecent: 'http://localhost:3900/api/listArticles_mostRecent',
        list_articles_cantDefined: 'http://localhost:3900/api/listArticles_cantDefined', /* /:cant? */
        get_article: 'http://localhost:3900/api/getArticle/', /* :id */
        delete_article: 'http://localhost:3900/api/deleteArticle/', /* :id */
        update_article: 'http://localhost:3900/api/updateArticle/', /* :id */
        upload_img: 'http://localhost:3900/api/uploadImage/', /* :id */
        delete_img: 'http://localhost:3900/api/deleteImage/', /* :fileName */
        get_img: 'http://localhost:3900/api/getImage/', /* :fileName */
        search_article: 'http://localhost:3900/api/searchArticle/' /* :search */
    }
}