import React from 'react'
import Layout from '../components/Layout/Layout'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/cart'
import { useAuth } from '../context/auth'

const Cart = () => {
    const navigate = useNavigate()
    const [cart, setCart] = useCart()
    const [auth, setAuth] = useAuth()

    //Quitar item
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

    //precio total

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

  return (
    <Layout>
        <div className='container'>
            <div className='row'>
                <div className='col-md-12'>
                    <h1 className='bg-light p-2 mt-5'>
                        {`Hola ${auth?.token && auth?.user?.name ? auth?.token && auth?.user?.name : 'Invitado'}`}
                    </h1>
                    <h5 className=''>
                        {cart.length ? `Tienes ${cart.length} productos en tu carrito` : 'No tienes productos en tu carrito'}
                    </h5>
                </div>
            </div>
            <div className='row'>
                <div className='col-md-8'>
                    {cart.map(c => (
                        <div className='row card m-2 flex-row mb-2 p-3'>
                            <div className='col-md-4'>
                                <img src={`/api/v1/products/product-photo/${c._id}`} className="card-img-top" alt={c.name} height={'100px'} width={'100px'}/>
                            </div>
                            <div className='col-md-4'>
                                <h3>{c.name}</h3>
                                <p>{c.description}</p>
                                <p>Precio : ${c.price}</p>
                                <button className='btn btn-danger' onClick={() => removeCartItem(c._id)}>Quitar</button>
                            </div>
                        </div>
                    ))}
                </div>
                <div className='col-md-4'>
                    <h4 className='text-center'>Total</h4>
                    <hr/>
                    <h4>Total : {totalPrice()}</h4>
                    {auth?.user?.address ? (
                        <>
                        <div className='col-md-12 mt-5'>
                            <p>Dirección actual</p>
                            <p><b>{auth?.user?.address}</b></p>
                            <button className='btn btn-info' onClick={() => navigate('/dashboard/user/profile')}>Actualizar dirección</button>
                        </div>
                        </>
                    ) : (
                        <div className='col-md-12 mt-5'>
                            <p>Ingrese dirección de envío:</p>
                            <input className='form-control'></input>
                            <button className='btn btn-info mt-2' onClick={() => navigate('/')}>Comprar como invitado</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default Cart