import React from 'react'
import { NavLink } from 'react-router-dom'

export const Navbar = () => {
    return (
        <nav className="nav">
          <ul>
            <li><NavLink to='/home'> Inicio </NavLink></li>
            <span className='div-nav-items'> | </span>
            <li><NavLink to='/list-articles'> Mis articulos </NavLink></li>
            <span className='div-nav-items'> | </span>
            <li><NavLink to='/create-article'> Agregar articulo </NavLink></li>
          </ul>
      </nav>
    )
}
