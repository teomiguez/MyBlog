import React, { useState, useEffect, useRef } from 'react'
import { Link, useParams } from 'react-router-dom';
import { Request } from '../../helpers/Request';
import { Global } from '../../helpers/Global';
import { ValidateData } from '../../helpers/ValidateData';
import { ValidateFile } from '../../helpers/ValidateFile';

export const Update = () => {
    const url_update_article = Global.api_endpoints.update_article;
    const url_upload_img = Global.api_endpoints.upload_img;
    const url_delete_img = Global.api_endpoints.delete_img;
    
    const [article, setArticle] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const params = useParams();

    const fileLabel = useRef();
    const titleLabel = useRef();
    const contentLabel = useRef();

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

    useEffect(() => {
        getArticle()
    }, [])


    const processForm = (e) => {
        e.preventDefault();
        let file = e.target.file.value;
        let title = e.target.title.value;
        let content = e.target.content.value;
        if (validateForm(file, title, content)) {
            let objForm = {
                file: file,
                title: title,
                content: content
            }            
            updateArticle(objForm);
            window.location.reload();
        } else {
            setError(true);
        }
    }
    
    const validateForm = (file, title, content) => {
        let validated = false;
        if (ValidateData(file, title, content) && ValidateFile(file)) {
            validated = true;
        }

        return validated;
    }

    const updateArticle = async (objForm) => {
        const { data } = await Request("PUT", url_update_article + article._id, objForm);
        if (data.status === 'success') {
            const fileInput = document.getElementById('fileInput');
            let article_img = article.img;
            let index = article_img.indexOf('_');
            let img = article_img.slice(index + 1);
            let upload_img = fileInput.files[0].name;
            if (img !== upload_img) {
                const { data: delete_data } = await Request("DELETE", url_delete_img + article._id);
                if (delete_data.status == 'success') {
                    const formData = new FormData();
                    formData.append('file', fileInput.files[0]);
                    const upload = await Request("POST", url_upload_img + article._id, formData, true);
                } else {
                    setError(true);
                }
            }
        } else {
            setError(true);
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
                    {error ? <strong className='status-error'> Ocurrio un error durante la modificación! </strong> : ""}
                    <h2>
                        Editar:
                        <span className='span-color'> {article.title} </span>
                    </h2>
                        <form className='update-form' onSubmit={processForm}>
                        <div className='form-group'>
                            <label ref={fileLabel} htmlFor='file'> Imagen </label>
                            <div className='mask mt-5'>
                                <img src={Global.api_endpoints.get_img + article.img} alt='img-article' />    
                            </div>  
                            <input id='fileInput' type='file' name='file' />
                        </div>
                        <div className='form-group'>
                            <label ref={titleLabel} htmlFor='title'> Titulo </label>
                            <input type='text' name='title' defaultValue={article.title} />
                        </div>
                        <div className='form-group'>
                            <label ref={contentLabel} htmlFor='content'> Contenido </label>
                            <textarea name='content' defaultValue={article.content} />
                        </div>
                        {params.since == 'list' ?
                            <Link to={"/list-articles"} className='btn-edit'> Volver </Link>
                            :
                            <Link to={"/article/" + article._id} className='btn-edit'> Volver </Link>
                        }
                        <input type='submit' className='btn-add' value="Modificar" />
                    </form>
                </div>
                )
            }
        </>
    )
}
