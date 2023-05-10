import React, { useEffect, useState } from 'react'
import { useCart } from '../../context/cart';
import { useAuth } from '../../context/auth';
import './Checkout.scss'
import Layout from '../Layout/Layout';

const Checkout = () => {

    const [cart, setCart] = useCart()
    const [cartSubTotal, setCartSubTotal] = useState(0)
    const [quantityItem, setQuantityItem] = useState(1)
    const [auth, setAuth] = useAuth()
    const [products,setProducts] = useState([]);
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [city,setCity] = useState('');
    const [postalCode,setPostalCode] = useState('');
    const [streetAddress,setStreetAddress] = useState('');
    const [country,setCountry] = useState('');
    const [isSuccess,setIsSuccess] = useState(false);

    useEffect(() => {
        let subTotal = 0
        cart?.map(item => subTotal += item.price * item.quantityItem)
        setCartSubTotal(subTotal)
    }, [cart]);

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
    <Layout>
        <div className="container-cart">
            <div className="content-cart">
        <div className="center">
        <div className="column-wrapper">
        <div className='box'>
            <h2>Tú carrito</h2>
            {!cart?.length && (
              <div>Tú carro está vacío</div>
            )}
            {cart?.length > 0 && (
              <table>
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th>Cantidad</th>
                    <th>Precio</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map(c => (
                    <tr key={c._id}>
                      <td className='productInfoCell'>
                        <div className='productImageBox'>
                          <img src={`/api/v1/products/product-photo/${c._id}`} className="card-img-top" alt={c.name}/>
                        </div>
                        {c.name}
                      </td>
                      <td>
                      <div className='quantity-buttons'>
                            <span onClick={() => handleCartProductQuantity('dec', c)}>-</span>
                            <span>{c.quantityItem}</span>
                            <span onClick={() => handleCartProductQuantity('inc', c)}>+</span>
                        </div>
                       
                      </td>
                      <td>{parseInt(c.price * c.quantityItem).toLocaleString('es-CL', {style : 'currency',currency : "CLP"})}</td>
                    </tr>
                  ))}
                  <tr>
                    <td></td>
                    <td className='sub-total'>Subtotal : </td>
                    <td className='sub-total v2'>{parseInt(cartSubTotal).toLocaleString('es-CL', {style : 'currency',currency : "CLP"})}</td>
                  </tr>
                </tbody>
              </table>
            )}
            <div className="bar">

            </div>
          </div>
          {!!cart?.length && (
            <div className='box'>
              <h2>Información de envío</h2>
              <input type="text"
                     placeholder="Nombre Completo"
                    //  value={name}
                     name="name"
                     onChange={console.log('name')} />
              <input type="text"
                     placeholder="Email"
                    //  value={email}
                     name="email"
                     onChange={console.log('email')}/>
            <div className='city-holder'>
                <input type="text"
                       placeholder="Ciudad"
                       value={city}
                       name="city"
                       onChange={console.log('city')}/>
                <input type="text"
                       placeholder="Codigo Postal"
                       value={postalCode}
                       name="postalCode"
                       onChange={console.log('city')}/>
              </div>
              <input type="text"
                     placeholder="Dirección"
                    //  value={streetAddress}
                     name="streetAddress"
                     onChange={console.log('street')}/>

                <div className='discount-code'>
                    <span><b>Código de descuento</b></span>
                    <input type="text" placeholder='Ingrese un código de descuento'/>
                </div>
                    

              <div className='banner-cta'>Ir a pagar</div>
              <div className='banner-cta v2'>Comprar como Invitado</div>
            </div>
          )}
        </div>
        </div>
        </div>
        </div>
    </Layout>
  )
}

export default Checkout