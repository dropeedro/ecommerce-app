import './Products.scss'
import Product from './Product/Product'
import React from 'react'

const Products = ({innerPage}) => {
  return (
    <div className="container">
        <div className="products-container">
            {!innerPage && <div className="sec-heading">Productos destacados</div>}
            <div className="products row">
                <Product/>
            </div>
        </div>
    </div>
  )
}

export default Products