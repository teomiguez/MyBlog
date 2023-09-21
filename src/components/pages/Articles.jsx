import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Global } from '../../helpers/Global';
import { Request } from '../../helpers/Request';
import { ListArticles } from './ListArticles';

export const Articles = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getArticles()
    }, [])

    const getArticles = async () => {
        const url = Global.api_endpoints.list_articles;
        const url_mostRecent = Global.api_endpoints.list_articles_mostRecent;
        const { data, loading } = await Request("GET", url_mostRecent);
        setTimeout(() => { 
            if (data.status === 'success')
            {
                setArticles(data.articles);
            }
            setLoading(loading);
        }, 1500);
    }

    return (
        <>
            {loading ? (
                <div className='loader'>
                    <span className='loader-text'> cargando... </span>
                    <div className='ring' />
                </div>
            ) : (
                articles.length >= 1 ? <ListArticles articles={articles} setArticles={setArticles}/> : (
                    <div className='jumbo'>
                        <h2> No hay articulos creados </h2>
                        <p> En este blog no hay artículos creados. Por favor, haz clic en el siguiente botón para crear tu primer artículo </p>
                        <Link to='/create-article' className='link-articles'> Crear articulo </Link>
                    </div>
                )
            )    
            }
        </>
    )
}
