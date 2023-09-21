import React from 'react'
import logo from '/sharp-person.svg'

export const Header = () => {
    return (
        <header className="header">
            <div className="logo-and-title">
                <img src={logo} alt='logo' />
                <h1 className="title-app"> My Blog </h1>
            </div>
        </header>
    )
}
