import React from 'react'
import {Link, NavLink} from 'react-router-dom'
import {TbGuitarPick, TbSearch} from 'react-icons/tb'
import { useAuth } from '../../context/auth'
import toast from 'react-hot-toast'
import SearchInput from '../Form/SearchInput'
import useCategory from '../../hooks/useCategory'
import { useCart } from '../../context/cart'
import { Badge } from 'antd'
import Cart from '../Cart/Cart'
import { useState } from 'react';
import Search from './Search/Search'
const Header = () => {

  const [auth, setAuth] = useAuth()
  const [showCart, setShowCart] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const [cart] = useCart()
  const categories = useCategory()
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: ""
    })
    localStorage.removeItem('auth')
    toast.success('Sesión cerrada correctamente')
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            <TbGuitarPick/> MusicPro
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {/* <SearchInput/> */}
              <TbSearch onClick={() => setShowSearch(true)}/>
              <li className="nav-item">
                <NavLink to="/" className="nav-link">Inicio</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/catalogo" className="nav-link">Catalogo</NavLink>
              </li>
              <li className="nav-item dropdown">
                <Link to={'/catalogo'} className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Categorias
                </Link>
                <ul className="dropdown-menu">
                  <li>
                  <NavLink to={`/categories`} className="dropdown-item">Todas las categorias</NavLink>
                  </li>
                  {categories.map(c => (
                      <li>
                        <NavLink to={`/category/${c.slug}`} className="dropdown-item">{c.name}</NavLink>
                      </li>
                  ))}
                </ul>
              </li>

              {
                !auth.user ? (
                <>
                  <li className="nav-item">
                  <NavLink to="/register" className="nav-link">Registrate</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/login" className="nav-link">Inicia sesión</NavLink>
                  </li>
                </>
                ) : (
                <>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    {auth?.user?.name}
                  </a>
                  <ul className="dropdown-menu">
                    <li className="nav-item">
                      <NavLink to= {`dashboard/${auth?.user?.role === 1 ? 'admin' : auth?.user?.role === 2 ? 'contador' : 'user'}`} 
                    className="nav-link">Dashboard</NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink to="/login" onClick={handleLogout} className="nav-link">Cerrar sesión</NavLink>
                    </li>
                  </ul>
                </li>
                </>
                )
              }
              <li className="nav-item">
                <Badge count={cart?.length} showZero>
                  {/* <NavLink to="/cart" className="nav-link">
                    Carrito
                  </NavLink> */}
                   <NavLink className='nav-link cart-icon' onClick={() => setShowCart(true)}>Carrito</NavLink>
                </Badge>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {showCart && <Cart setShowCart = {setShowCart}/>}
      {showSearch && <Search setShowSearch = {setShowSearch}/>}
    </>
  )
}

export default Header