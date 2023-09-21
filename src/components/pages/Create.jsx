import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { Request } from '../../helpers/Request';
import { Global } from '../../helpers/Global';
import { ValidateData } from '../../helpers/ValidateData';
import { ValidateFile } from '../../helpers/ValidateFile';

export const Create = () => {
    const url_add_article = Global.api_endpoints.add_article;
    const url_upload_img = Global.api_endpoints.upload_img;

    const [error, setError] = useState(false);
    const { form, save, update } = useForm({});
    const nav = useNavigate();
    const fileLabel = useRef();
    const titleLabel = useRef();
    const contentLabel = useRef();
    
    const validateForm = (e) => {
        e.preventDefault();
        let file = e.target.file.value;
        let title = e.target.title.value;
        let content = e.target.content.value;

        if (ValidateData(file, title, content) && ValidateFile(file))
        {
            saveArticle(e.target);
        } else {
            setError(true);
        }
    }

    const saveArticle = async (target) => {
        const { data } = await Request("POST", url_add_article, form)
        if (data.status === 'success') {
            const fileInput = document.querySelector('#fileInput');
            const formData = new FormData();
            formData.append('file', fileInput.files[0]);
            const upload = await Request("POST", url_upload_img + data.article._id, formData, true);
            
            nav('/list-articles');
        } else {
            setError(true);
        }
    }

    return (
        <div className='jumbo'>
            {error ? <strong className='status-error'> Ocurrio un error durante el guardado! </strong> : ""}
            <h2> Nuevo Articulo </h2>
            <form className='add-form' onSubmit={validateForm}>
                <div className='form-group'>
                    <label ref={fileLabel} htmlFor='file'> Imagen </label>
                    <input id='fileInput' type='file' name='file' />
                </div>
                <div className='form-group'>
                    <label ref={titleLabel} htmlFor='title'> Titulo </label>
                    <input type='text' name='title' onChange={update} />
                </div>
                <div className='form-group'>
                    <label ref={contentLabel} htmlFor='content'> Contenido </label>
                    <textarea name='content' onChange={update} />
                </div>
                <button type='reset' className='btn-edit'> Limpiar </button>
                <input type='submit' className='btn-add' value="Agregar" />
            </form>
        </div>
    )
}
