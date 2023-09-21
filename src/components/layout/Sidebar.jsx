import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const Sidebar = () => {
    const [search, setSearch] = useState("");
    const nav = useNavigate();

    const searchArticle = (e) => {
        e.preventDefault();
        let search = e.target.search.value;
        e.target.search.value = "";
        nav("/search-article/" + search, { replace: true });
    }

    return (
        <aside className="sidebar">
            {/* -- Formulario - buscador -- */}
            <div className='search-article'>
                <h3 className="title"> Buscar Articulo </h3>
                {/* {(notExist && search.length > 1) && (
                    <span className="not-exist"> No se han encontrado coincidencias </span>
                )} */}
                <form className='search-form' onSubmit={searchArticle}>
                    <input type="text"
                        name="search"
                        autoComplete="off"
                        placeholder="Titulo..."
                        required />
                    <input type='submit'
                        className="btn-search"
                        value="Buscar" />
                </form>
            </div>
        </aside>
    )
}
