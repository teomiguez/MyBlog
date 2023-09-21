import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Global } from '../../helpers/Global';
import { Request } from '../../helpers/Request';

export const Article = () => {
    const [loading, setLoading] = useState(true);
    const [article, setArticle] = useState({});
    const params = useParams();
    const nav = useNavigate();

    useEffect(() => {
        getArticle()
    }, [])

    const getArticle = async () => {
        const url = Global.api_endpoints.get_article + params.id;
        const { data, loading } = await Request("GET", url);
        setTimeout(() => { 
            if (data.status === 'success')
            {
                setArticle(data.article);
            }
            setLoading(loading);
        }, 1500);
    }

    const deleteArticle = async (id) => {
        let { data: delete_data } = await Request("DELETE", Global.api_endpoints.delete_img + id);
        let { data, loading } = await Request("DELETE", Global.api_endpoints.delete_article + id);

        if ((data.status == 'success' && delete_data.status == 'success')) {
            nav("/home", { replace: true });
        }
    }

    return (
        <>
            {loading ? (
                <div className='loader'>
                    <span className='loader-text'> cargando... </span>
                    <div className='ring' />
                </div>
            ) : (
                <div className='jumbo'>   
                    <div className='jumbo-mask'>
                        <img src={Global.api_endpoints.get_img + article.img} alt='img-article' />    
                    </div>    
                    <div className='jumbo-data'>    
                        <h3 className='article-title'> {article.title} </h3>
                        <p className='article-description'> {article.content} </p>
                        <Link to={"/update-article/" + article._id + "/unit"} className='btn-edit'> Editar </Link>
                        <button className='btn-delete' onClick={() => { deleteArticle(article._id) }}> Borrar </button>   
                        <div className='article-date'>
                            <span className='color mr-5'> Fecha: </span>
                            <span> {article.date} </span>
                        </div>  
                    </div>
                </div>
                )
            }
        </>
    )
}
