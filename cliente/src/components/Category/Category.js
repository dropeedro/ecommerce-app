import React from 'react';
import './Category.scss';
import Products
 from '../Products/Products';
import Layout from '../Layout/Layout';

const Category = () => {
  return (
    <Layout>
        <div className='category-main-content'>
            <div className="layout">
                <div className="category-title">
                    Category Title
                </div>
                <div className="products-container">
                    <Products innerPage = {true}/>
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default Category