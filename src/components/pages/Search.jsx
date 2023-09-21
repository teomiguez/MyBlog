import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Global } from '../../helpers/Global';
import { Request } from '../../helpers/Request';
import { ListArticles } from './ListArticles';

export const Search = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const params = useParams();

    useEffect(() => {
        getArticles()
    }, [])

    useEffect(() => {
        setLoading(true);
        getArticles();
    }, [params])

    const getArticles = async () => {
        const url = Global.api_endpoints.search_article + params.search;
        const { data, loading } = await Request("GET", url);
        setTimeout(() => {
            if (data.status === 'success') {
                setArticles(data.articles);
            } else {
                setArticles([]);
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
                articles.length >= 1 ? <ListArticles articles={articles} setArticles={setArticles} /> : (
                    <div className='jumbo'>
                        <h2> No hay articulos </h2>
                            <p> En este blog no hay artículos creados que coincidan con:
                               <span className='span-color'> {params.search} </span>
                            </p>
                    </div>
                )
            )
            }
        </>
    )
}
