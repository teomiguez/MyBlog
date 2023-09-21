import React from 'react'
import { Link } from 'react-router-dom'

export const Error404 = () => {
    return (
        <div className='jumbo'>
            <h2> Error 404 </h2>
            <p> La ruta a la que intenta acceder no existe, por favor regrese a la página de inicio </p>
            <Link to='/home' className='link-navigate'> Inicio </Link>
        </div>
    )
}
