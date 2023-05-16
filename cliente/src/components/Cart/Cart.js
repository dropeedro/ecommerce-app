import React, { useEffect, useState } from 'react'
import "./Cart.scss";
import { MdClose } from 'react-icons/md';
import { BsCartX } from 'react-icons/bs';
import CartItem from './CartItem/CartItem'
import { useCart } from '../../context/cart';
import { useNavigate } from 'react-router-dom';

const Cart = ({setShowCart}) => {

    const [cart, setCart] = useCart([]);
    const [cartSubTotal, setCartSubTotal] = useState(0);
    const navigate = useNavigate()

    const totalPrice = () => {
        try {
            let total = 0
            cart?.map((item) =>{total = total + item.price})
            return total.toLocaleString('es-CL', {
                style : 'currency',
                currency : "CLP",
            })
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        let subTotal = 0
        cart?.map(item => subTotal += item.price * item.quantityItem)
        setCartSubTotal(subTotal)
    }, [cart])

    const convertToCLP = (total) => {
        total = total.toLocaleString('es-CL', {
             style : 'currency',
             currency : "CLP",
         })
         return total
     }

  return (
    // <div className='cart-panel'>
    <div className={`cart-panel ${cart.length ? 'has-items' : ''}`}>
        <div className='opac-layer' onClick={() => setShowCart(false)}></div>
        <div className='cart-content'>
            <div className='cart-header'>
                <span className='heading'>Tú carrito</span>
                <span className='close-btn' onClick={() => setShowCart(false)}>
                    <MdClose/>
                    <span className='text'>Cerrar</span>
                </span>
            </div>

            {!cart?.length && <div className='empty-cart'>
                <BsCartX/>
                <span>No hay productos en tu carrito</span>
                <button className='return-btn' onClick={() => {navigate('/catalogo'); setShowCart(false)}}>Volver al catalogo</button>
            </div>}

            {!!cart?.length && <>
                <CartItem/>
                <div className='cart-footer'>
                    <div className='subtotal'>
                        <span className='text'>Subtotal : </span>
                        <span className='text total'>{convertToCLP(cartSubTotal)} </span>
                    </div>
                    <div className='button'>
                        <button className='checkout-btn' onClick={() => navigate('/checkout')}>Ir al checkout</button>
                    </div>
                </div>
            </>}

        </div>
    </div>
  )
}

export default Cart