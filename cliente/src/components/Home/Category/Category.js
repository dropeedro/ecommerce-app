import React from 'react'
import './Category.scss'
import CategoryImg from '../../../assets/images/descarga.jpeg'

const Category = () => {
  return (
    <div className='category-section'>
        <div className="categories">
            <div className="category">
                <img src={CategoryImg} alt="" />
            </div>
            <div className="category">
                <img src={CategoryImg} alt="" />
            </div>
            <div className="category">
                <img src={CategoryImg} alt="" />
            </div>
            <div className="category">
                <img src={CategoryImg} alt="" />
            </div>
        </div>
    </div>
  )
}

export default Category