import React, { useEffect, useState } from 'react'
import { useCart } from '../../context/cart';
import { useAuth } from '../../context/auth';
import './Checkout.scss'
import Layout from '../Layout/Layout';
import LoadingSpinner from '../LoadingSpinner';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {

    const [cart, setCart] = useCart();
    const [cartSubTotal, setCartSubTotal] = useState(0)
    const [quantityItem, setQuantityItem] = useState(1)
    const [auth, setAuth] = useAuth();
    const [products,setProducts] = useState([]);
    const [name, setName] = useState("");
    const [lastname, setLastName] = useState("");
    const [email, setEmail] = useState("");  
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        let subTotal = 0
        cart?.map(item => subTotal += item.price * item.quantityItem)
        setCartSubTotal(subTotal)
    }, [cart]);

    useEffect(() => {
      if(auth?.user){
        const {name, lastname, email, phone, address} = auth?.user
        setName(name)
        setLastName(lastname)
        setEmail(email)
        setPhone(phone)
        setAddress(address)
      }
  },[auth?.user])
    
  

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
              <h2>Información de envío*</h2>
              {
                !auth.user ? (
                <>
                  <input readOnly type="text"
                     placeholder="Nombre"
                    //  value=""
                     name="name"
                     onChange={(e) => setName(e.target.value)} />
                  <input readOnly type="text"
                        placeholder="Apellidos"
                        // value=""
                        name="lastname"
                        onChange={(e) => setLastName(e.target.value)} />
                  <input readOnly type="text"
                        placeholder="Email"
                        // value={email}
                        name="email"
                        onChange={(e) => setEmail(e.target.value)}/>
                <div className='city-holder'>
                    <input readOnly type="text"
                          placeholder="Telefono"
                          // value={phone}
                          name="phone"
                          onChange={(e) => setPhone(e.target.value)}/>
                    <input readOnly type="text"
                          placeholder="Dirección"
                          // value={address}
                          name="address"
                          onChange={(e) => setAddress(e.target.value)}/>
                  </div>
                  <div className='banner-cta'>Comprar como Invitado</div>
                  
                </>
                ) : (
                <>
                <input readOnly type="text"
                      placeholder="Nombre"
                      value={name}
                      name="name"
                      onChange={(e) => setName(e.target.value)} />
                <input readOnly type="text"
                      placeholder="Apellidos"
                      value={lastname}
                      name="lastname"
                      onChange={(e) => setLastName(e.target.value)} />
                <input readOnly type="text"
                      placeholder="Email"
                      value={email}
                      name="email"
                      onChange={(e) => setEmail(e.target.value)}/>
              <div className='city-holder'>
                  <input readOnly type="text"
                        placeholder="Telefono"
                        value={phone}
                        name="phone"
                        onChange={(e) => setPhone(e.target.value)}/>
                  <input readOnly type="text"
                        placeholder="Dirección"
                        value={address}
                        name="address"
                        onChange={(e) => setAddress(e.target.value)}/>
              </div>
              <small>*Para cambiar los datos de facturación, vaya a su <span className='profile-redirection' onClick={() => navigate('/dashboard/user/profile')}>perfíl</span></small>
              <div className='discount-code'>
                  <span><b>Código de descuento</b></span>
                  <input type="text" placeholder='Ingrese un código de descuento'/>
              </div> 
              <div className='banner-cta'>Ir a pagar</div>
                </>
                )
              }
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