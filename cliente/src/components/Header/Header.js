import React, {useEffect, useState, useContext} from 'react'

import { TbGuitarPick, TbSearch } from 'react-icons/tb'
import {CgShoppingCart} from 'react-icons/cg'

import Search from '../Layout/Search/Search'
import Cart from '../Cart/Cart'

import { Context } from '../../context/context'

import './Header.scss'
import { useNavigate, NavLink } from 'react-router-dom';
import { useAuth } from '../../context/auth'
import { useCart } from '../../context/cart'
import useCategory from '../../hooks/useCategory'
import toast from 'react-hot-toast'

const Header = () => {

    const [showCart, setShowCart] = useState(false)
    const [showSearch, setShowSearch] = useState(false)
    const [auth, setAuth] = useAuth()
    const [cart] = useCart()
    const categories = useCategory()
    const navigate = useNavigate()

    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
      window.addEventListener("scroll", handleScroll)
    }, [])
    
    const handleScroll = () => {
        const offset = window.scrollY
        if(offset > 80){
            setScrolled(true)
        }else{
            setScrolled(false)
        }
    }

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
  <header className={`main-header ${scrolled ? 'sticky-header' : ''}`}>
    <div className='header-content'>
        <ul className='left'>
                <li onClick={() => navigate('/')}>Inicio</li>
            {
                !auth.user ? (
                <>
                  <li onClick={() => navigate('/register')}>Registrate</li>
                  <li onClick={() => navigate('/login')}>Inicia sesión</li>
                </>
                ) : (
                <>
                <li className="dropdown">
                  <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    {auth?.user?.name}
                  </a>
                  <ul className="dropdown-menu">
                    <li onClick={() => navigate(`dashboard/${auth?.user?.role === 1 ? 'admin' : auth?.user?.role === 2 ? 'contador' : 'user'}`)}>Dashboard</li>
                    <li onClick={() => {navigate('/login'); handleLogout()}}>Cerrar sesión</li>
                  </ul>
                </li>
                </>
                )
              }
            {/* <li onClick={() => navigate('/categories')}>Categorias</li> */}
        </ul>
        <div className='center' onClick={() => navigate("/")}><TbGuitarPick/>MUSICPRO</div>
        <div className='right'>
            <ul>
                <li onClick={() => navigate("/catalogo")}>Catalogo</li>
            </ul>
            <TbSearch onClick={() => setShowSearch(true)}/>
            <span className='cart-icon'>
                <CgShoppingCart onClick={() => setShowCart(true)}/>
                {cart.length > 0 ? <span>{cart.length}</span> : ''}
            </span>
        </div>
    </div>
  </header>
  {showCart && <Cart setShowCart = {setShowCart}/>}
  {showSearch && <Search setShowSearch = {setShowSearch}/>}
  </>
  )
}

export default Header