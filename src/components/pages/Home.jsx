import React from 'react'
import { Link } from 'react-router-dom'

export const Home = () => {
    return (
        <div className='jumbo'>
            <h2> Bienvenido a MyBlog, una app hecha con React </h2>
            <p> Este blog fue desarrollado con el MERN Stack (Mongo, Express, React y Node) </p>
            <Link to='/list-articles' className='link-navigate'> Ver articulos </Link>
        </div>
    )
}
