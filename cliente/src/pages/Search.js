
import React from 'react'
import { useSearch } from '../context/search.js'
import Layout from '../components/Layout/Layout.js'
import { useNavigate } from 'react-router-dom'

const Search = () => {

    const [values, setValues ] = useSearch()
    const navigate = useNavigate()

  return (
    <Layout title={'Resultados de la busqueda'}>
        <div className='container'>
            <div className='text-center'>
                <h3>Resultador de la busqueda</h3>
                <h5>{values?.results.length > 1 ? 'No se encontraron productos' : `Se encontraron ${values?.results.length}`}</h5>
                <div className="d-flex flex-wrap">
                    {values?.results.map((p) => (
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
    </Layout>
  )
}

export default Search