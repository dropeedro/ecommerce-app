import React, {useState, useEffect} from 'react'
import Layout from '../components/Layout/Layout'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const CategoryProduct = () => {
    const params = useParams()
    const [products, setProducts] = useState([])
    const [category, setCategory] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        if(params?.slug) getProductByCat()
    }, [params?.slug])

    const getProductByCat = async() => {
        try {
            const {data} = await axios.get(`/api/v1/products/product-category/${params.slug}`)
            setProducts(data?.products)
            setCategory(data?.category)
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <Layout>
        <div className='container mt-5'>
            <h1 className='text-center'>{category.name}</h1>
            <h5 className='text-center'>En esta categoria hay <b>{products.length}</b> productos</h5>
        </div>
        <div className="d-flex justify-content-center">
            {products?.map((p) => (
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
    </Layout>
  )
}

export default CategoryProduct