import React from 'react'
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom'
import { Header } from '../components/layout/Header'
import { Navbar } from '../components/layout/Navbar'
import { Sidebar } from '../components/layout/Sidebar'
import { Footer } from '../components/layout/Footer'
import { Home } from '../components/pages/Home'
import { Article } from '../components/pages/Article'
import { Articles } from '../components/pages/Articles'
import { Search } from '../components/pages/Search'
import { Create } from '../components/pages/Create'
import { Update } from '../components/pages/Update'
import { Error404 } from '../components/pages/Error404'

export const BlogRoutes = () => {
    return (
        <BrowserRouter>
            {/* Layout - part 1 */}
            <Header />
            <Navbar />

            {/* Central content and paths */}
            <main className='content'>
                <Routes>
                    <Route path='/'
                        element={<Navigate to="/home" />} />
                    <Route path='/home'
                        className={({ isActive }) => isActive ? "active" : ""}
                        element={<Home />} />
                    <Route path='/article/:id'
                        element={<Article />} />
                    <Route path='/list-articles'
                        className={({ isActive }) => isActive ? "active" : ""}
                        element={<Articles />} />
                    <Route path='/create-article'
                        className={({ isActive }) => isActive ? "active" : ""}
                        element={<Create />} />
                    <Route path='/search-article/:search'
                        element={<Search />} />
                    <Route path='/update-article/:id/:since'
                        element={<Update />} />
                    
                    {/* If the path does not exist */}
                    <Route path='/*' element={<Error404/>} /> 
                </Routes>
            </main>

            {/* Layout - part 2 */}
            <Sidebar />
            <Footer />
        </BrowserRouter>
    )
}
