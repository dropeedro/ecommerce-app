import React, { useContext, useEffect, useState } from 'react'
import { MdClose } from 'react-icons/md'
import "./CartItem.scss"
import { useCart } from '../../../context/cart'

const CartItem = () => {
    const [cart, setCart] = useCart([])

    const removeCartItem = (pid) => {
        try {
            let myCart = [...cart]
            let index = myCart.findIndex(item => item._id === pid)
            myCart.splice(index, 1)
            setCart(myCart)
            localStorage.setItem('cart', JSON.stringify(myCart))
        } catch (error) {
            console.log(error);
        }
    }

    const transformPriceToCLP = (total) => {
       total = total.toLocaleString('es-CL', {
            style : 'currency',
            currency : "CLP",
        })
        return total
    }

    const handleCartProductQuantity = (type, product) => {
        let items = [...cart];
        let index = items?.findIndex((p) => p._id === product?._id);
        if (type === "inc") {
            items[index].quantityItem += 1;
        } else if (type === "dec") {
            if (items[index].quantityItem === 1) return;
            items[index].quantityItem -= 1;
        }
        setCart(items);
    };

  return (
    <div className='cart-products'>
        {cart.map(c => (
        <div className='cart-product' key={c._id}>
            <div className='img-container'>
                <img src={`/api/v1/products/product-photo/${c._id}`} className="card-img-top" alt={c.name}/>
            </div>
            <div className='product-details'>
                <span className='name'>{c.name}</span>
                <MdClose className='close-btn' onClick={() => removeCartItem(c._id)}/>
                <div className='quantity-buttons'>
                    <span onClick={() => handleCartProductQuantity('dec', c)}>-</span>
                    <span>{c.quantityItem}</span>
                    <span onClick={() => handleCartProductQuantity('inc', c)}>+</span>
                </div>
                <div className='text'>
                    <span>{c.quantityItem}</span>
                    <span>x</span>
                    <span className='highlight'>{transformPriceToCLP(c.price * c.quantityItem)}</span>
                </div>
            </div>
        </div>
        ))}
    </div>
  )
}

export default CartItem