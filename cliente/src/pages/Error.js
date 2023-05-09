import React from 'react'
import Layout from '../components/Layout/Layout'
import { Link } from 'react-router-dom'

const Error = () => {
  return (
    <Layout title={"Página no encontrada"}>
        <div className='error'>
          <h1 className='error-title'>404</h1>
          <h2 className='error-subtitle'>Página no encontrada</h2>
          <Link to="/" className='error-btn'>
            Volver al inicio
          </Link>
        </div>
    </Layout>
  )
}

export default Error