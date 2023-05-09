
import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
const ProductDetail = () => {
    const params = useParams()
    const [product, setProduct] = useState({})
    const [relatedProducts, setRelatedProducts] = useState([])
    const navigate = useNavigate()


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
  return (
    <Layout>
        <div className='row container mt-5'>
            <div className='col-md-5'>
                <img src={`/api/v1/products/product-photo/${product._id}`} className="card-img-top" alt={product.name} height={'400px'} width={'400px'} />
            </div>
            <div className='col-md-5 mt-5'>
                <h1>{product.name}</h1>
                <p>{product.description}</p>
                <p>${product.price}</p>
                <p>Stock : {product.quantity}</p>
                <small><p>Envio disponible : {product.shipping}</p></small>
                <button class="btn btn-warning ms-1">Agregar al carro</button>
            </div>
        </div>
        <hr/>
        <div className='container'>
            <div className='row'>
                <div className='col-md-12'>
                    <h3>Productos similares</h3>
                    {relatedProducts.length < 1 && <p className='text-center'>No se encontraron productos similares</p>}
                    <div className="d-flex flex-wrap">
                        {relatedProducts?.map((p) => (
                        <div className="card m-2" style={{ width: "18rem" }}>
                            <img src={`/api/v1/products/product-photo/${p._id}`} className="card-img-top" alt={p.name}
                            />
                            <div className="card-body">
                            <h5 className="card-title">{p.name}</h5>
                            <p className="card-text">
                                {p.description}
                            </p>
                            <p className="card-text"> $ {p.price}</p>
                            <button class="btn btn-primary ms-1" onClick={() => {navigate(`/product/${p.slug}`)}}>Ver más</button>
                            <button class="btn btn-warning ms-1">Agregar al carro</button>
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

export default ProductDetail