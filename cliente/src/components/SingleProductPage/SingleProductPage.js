import React, { useEffect, useState, useContext } from 'react';

import "./SingleProductPage.scss";
import Layout from '../Layout/Layout';
import { FaCartPlus, FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa/index.esm';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import {useCart} from '../../context/cart'

import toast from 'react-hot-toast'


const SingleProductPage = () => {
    const [quantityItem, setQuantityItem] = useState(1);
    const params = useParams()
    const [product, setProduct] = useState({})
    const [relatedProducts, setRelatedProducts] = useState([])
    const navigate = useNavigate()
    const [cart, setCart] = useCart([]); 

    //inicio
    useEffect(() => {
      if(params?.slug) getProduct()
    }, [params?.slug])
    

    //Traer producto
    const getProduct = async() =>{
        try {
            const {data} = await axios.get(`/api/v1/products/get-product/${params.slug}`)
            setProduct(data?.product)
            getSimilarProducts(data?.product._id, data?.product.category._id)

        } catch (error) {
            console.log(error)
        }
    }


    const getSimilarProducts = async(pid, cid) => {
        try {
            const {data} = await axios.get(`/api/v1/products/related-products/${pid}/${cid}`)
            setRelatedProducts(data?.products)
        } catch (error) {
            console.log(error)
        }
    }

    //Convertir a pesos chilenos
    const convertToCl = (total) => {
        total.toLocaleString('es-CL', {
            style : 'currency',
            currency : "CLP",
        })
        return total
    }


    const increment = () => {
        setQuantityItem((prevState) => prevState + 1)
    }

    const decrement = () => {
        setQuantityItem((prevState) => {
            if(prevState === 1) return 1
            return prevState - 1
        })   
    }

    const newProduct = () => {
        const clone = JSON.parse(JSON.stringify(product))
        let newProd = {...clone, quantityItem : quantityItem}
        return newProd
    }

  return (
    <Layout>
        <div className='single-product-main-content'>
            <div className='layout'>
                <div className='single-product-page'>
                    <div className='left'>
                    <img src={`/api/v1/products/product-photo/${product._id}`} className="card-img-top" alt={product.name} />
                    </div>
                    <div className='right '>
                        <span className='name'>{product.name}</span>
                        <span className='price'>{parseInt(product?.price).toLocaleString('es-CL', {style : 'currency',currency : "CLP"})}</span>
                        <span className='desc'>{product.description}</span>

                        <div className='cart-buttons'>
                            <div className='quantity-buttons '>
                                <span onClick={decrement}>-</span>
                                <span>{quantityItem}</span>
                                <span onClick={increment}>+</span>
                            </div>
                            <button className='add-to-cart-button' onClick={() => {
                                                                        setCart([...cart,newProduct()])
                                                                        localStorage.setItem('cart', JSON.stringify([...cart,newProduct()]))
                                                                        toast.success('Producto agregado al carrito')
                                                                        setQuantityItem(1)
                                                                        }}>
                                <FaCartPlus size={20}/> Agregar al carrito
                            </button>
                        </div>
                        <span className='divider'/>
                        <div className='info-item'>
                            <span className='text-bold'>
                                Categoria:                         
                                {/* <span> {product.category.name}</span> */}
                            </span>
                            <span className='text-bold'>
                                Compartir:                         
                                <span>
                                    <FaFacebookF size={16}/>
                                    <FaTwitter size={16}/>
                                    <FaInstagram size={16}/>
                                </span>
                            </span>
                        </div>
                    </div>
                </div>
                <div className="products-container">
                    <div className="sec-heading">Productos Relacionados</div>
                    <div className="products">
                        {relatedProducts?.map((p) => (
                        <div key={p._id} className='product-card' onClick={() => navigate(`/product/${p.slug}`)}>
                        <div key={`thumbnail-${p._id}`} className="thumbnail">
                        <img src={`/api/v1/products/product-photo/${p._id}`} className="card-img-top" alt={p.name}></img>
                        </div>
                        <div key={`prod-details-${p._id}`} className="prod-details">
                                <span key={`name-${p._id}`} className="name">{p.name}</span>
                                <span key={`price-${p._id}`} className="price">{parseInt(p.price).toLocaleString('es-CL', {style : 'currency',currency : "CLP"})}</span>
                            </div>
                        </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default SingleProductPage