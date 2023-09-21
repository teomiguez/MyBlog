import React from 'react'
import { Global } from '../../helpers/Global'
import { Request } from '../../helpers/Request'
import { Link } from 'react-router-dom'

export const ListArticles = ({ articles, setArticles }) => {
    
    const deleteArticle = async (id) => {
        let { data: data2 } = await Request("DELETE", Global.api_endpoints.delete_img + id);
        let { data } = await Request("DELETE", Global.api_endpoints.delete_article + id);

        if ((data.status == 'success') && (data2.status == 'success')) {
            let updatedArticles = articles.filter(article => article._id !== id);
            setArticles(updatedArticles);
        }
    }

    return (
        articles.map(article => {
            return (
                <article key={article._id} className='article-item'>
                    <div className='mask'>
                        <img src={Global.api_endpoints.get_img + article.img} alt='img-article'/>
                    </div>
                    <div className='data'>
                        <h3 className='article-title'>
                            <Link to={"/article/" + article._id} className='link-article-title'>
                                {article.title}
                            </Link>
                        </h3>
                        <p className='article-description'> {article.content} </p>
                        <Link to={"/update-article/" + article._id + "/list"} className='btn-edit'> Editar </Link>
                        <button className='btn-delete' onClick={() => { deleteArticle(article._id) }}> Borrar </button>
                        <div className='article-date'>
                            <span className='color mr-5'> Fecha: </span>
                            <span> {article.date} </span>
                        </div>  
                    </div>
                </article>
            )
        })
    )
}
