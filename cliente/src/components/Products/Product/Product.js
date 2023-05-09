import React, { useEffect, useState } from 'react'
import './Product.scss'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Product = () => {

  const [products, setProducts] = useState([])
  const navigate = useNavigate()

  const getAllProducts = async () => {
    try {
      // setLoading(true);
      const { data } = await axios.get(`/api/v1/products/get-products`);
      // setLoading(false);
      setProducts(data.products);
    } catch (error) {
      // setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, [])

  //Convertir a pesos chilenos
  const convertToCl = (total) => {
    return total.toLocaleString('es-CL', {
        style : 'currency',
        currency : "CLP",
    })
}

  return (
    <>
    {products.slice(0,4).map((p) => (
    <div className='product-card col' onClick={() => navigate(`/product/${p.slug}`)}>
        <div className="thumbnail">
        <img src={`/api/v1/products/product-photo/${p._id}`} className="card-img-top" alt={p.name}></img>
        </div>
        <div className="prod-details">
          <span className="name">{p.name}</span>
          <span className="price">{convertToCl(p.price)}</span>
        </div>
    </div>
    ))}
    </>
  )
}

export default Product