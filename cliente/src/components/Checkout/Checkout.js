import React, { useEffect, useState } from 'react'
import { useCart } from '../../context/cart';
import { useAuth } from '../../context/auth';
import './Checkout.scss'
import Layout from '../Layout/Layout';
import LoadingSpinner from '../LoadingSpinner';
import { useNavigate } from 'react-router-dom';
import { Button, Input, Select, Space } from 'antd';
import { Option } from 'antd/es/mentions';
import PayButton from './PayButton/PayButton';

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
    const [shipping, setShipping] = useState("0");
    const [subTotal, setSubTotal] = useState()
    const navigate = useNavigate();

    const [buyOrder, setBuyOrder] = useState("O-" + Math.floor(Math.random() * 10000) + 1);
    const [sessionId,  setSessionId] = useState("S-" + Math.floor(Math.random() * 10000) + 1);
    const [amount, setAmount] = useState(subTotal);
    const [params, setParams] = useState([]);

    useEffect(() => {
        let subTotal = 0
        cart?.map(item => subTotal += item.price * item.quantityItem)
        setCartSubTotal(subTotal)
        setSubTotal(subTotal)
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

  useEffect(() => {
        let bo = "O-" + Math.floor(Math.random() * 10000) + 1;
        let si = "S-" + Math.floor(Math.random() * 10000) + 1;
        setBuyOrder(bo);
        setSessionId(si)
        // setAmount(subTotal)
        console.log(buyOrder);
        console.log(sessionId);
        // console.log(amount);
  },[])
    
  

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

    const handleShipping = (value) => {
      if(value === "0"){
        let final = cartSubTotal + 5000
        console.log(final);
        setSubTotal(final)
        setShipping(5000)
      }else{
        setShipping(0)
        setSubTotal(cartSubTotal)
      }
    }

    const handleCoupon = (value) =>{

    }

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
                    <tr key={c.name}>
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
              <h2>Tú pago</h2>
              <table>
                <tr>
                  <th><div className="shipping-title">Subtotal</div></th>
                  <th><div className="shipping-title">-</div></th>
                  <th><div className="shipping-title">{parseInt(cartSubTotal).toLocaleString('es-CL', {style : 'currency',currency : "CLP"})}</div></th>
                </tr>
                <tr>
                  <th><div className="shipping-title">Envío</div></th>
                  <th>
                    <div className='select-shipping'>
                      <Select bordered={false} placeholder="Seleccione" size='large' fontSize={12} onChange={(value) => {handleShipping(value)}}>
                        <Option value = "0">Envío a domicilio</Option>
                        <Option value = "1">Retiro en tienda</Option>
                      </Select>
                    </div>
                  </th>
                  <th><div className="shipping-title">{ parseInt(shipping).toLocaleString('es-CL', {style : 'currency',currency : "CLP"})}</div></th>
                </tr>
                <tr>
                    <th><div className="shipping-title">Cúpon </div></th>
                    <th>
                    <Space.Compact style={{ width: '100%' }}>
                      <Input className='coupon-input' placeholder='ABC123' />
                    </Space.Compact>
                    </th>
                    <th><div className="shipping-title">$5.430</div></th>
                </tr>
                <tfoot>
                  <tr>
                    <td></td>
                      <td className='sub-total-final-text'>Total a pagar</td>
                      <td className='sub-total-final'>{parseInt(subTotal).toLocaleString('es-CL', {style : 'currency',currency : "CLP"})}</td>
                  </tr>
                </tfoot>
              </table>
              <h2>Información de envío*</h2>
              {
                !auth.user ? (
                <>
                  <input type="text"
                     placeholder="Nombre"
                    //  value=""
                     name="name"
                     onChange={(e) => setName(e.target.value)} />
                  <input type="text"
                        placeholder="Apellidos"
                        // value=""
                        name="lastname"
                        onChange={(e) => setLastName(e.target.value)} />
                  <input type="text"
                        placeholder="Email"
                        // value={email}
                        name="email"
                        onChange={(e) => setEmail(e.target.value)}/>
                <div className='city-holder'>
                    <input type="text"
                          placeholder="Telefono"
                          // value={phone}
                          name="phone"
                          onChange={(e) => setPhone(e.target.value)}/>
                    <input type="text"
                          placeholder="Dirección"
                          // value={address}
                          name="address"
                          onChange={(e) => setAddress(e.target.value)}/>
                  </div>
                  <div className="sec-heading">Cómo desea hacer la compra?</div>
                  <div className='banner-cta' onClick={() => navigate('/login-checkout')}>Tengo una cuenta</div>
                  <label htmlFor="">Comprar como Invitado:</label>
                  {/* <div className='banner-cta v2'> */}
                    <PayButton cartItems = {cart} subTotal={subTotal} buyOrder = {buyOrder} sessionId = {sessionId}/>
                  {/* </div> */}
                  
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
              {/* <div className='discount-code'>
                  <span><b>Código de descuento</b></span>
                  <input type="text" placeholder='Ingrese un código de descuento'/>
              </div>  */}
              <form action="/create-checkout-session">
                {/* <div className='banner-cta'>Ir a pagar</div> */}
                <PayButton cartItems = {cart} subTotal={subTotal} buyOrder = {buyOrder} sessionId = {sessionId}/>
              </form>
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