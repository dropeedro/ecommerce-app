import './Banner.scss';
import React from 'react';
import BannerImg from "../../../assets/banner-img.png"
const Banner = () => {
  return (
    <div className='hero-banner'>
        <div className="content">
            <div className="text-content">
                <h1>Ventas</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate autem quaerat officia cumque in quibusdam delectus, quos maiores veniam ad.</p>
                <div className="ctas">
                    <div className='banner-cta'>Ver mas</div>
                    <div className='banner-cta v2'>Comprar ahora</div>
                    <div></div>
                </div>
            </div>
            <img className='banner-img' src={BannerImg} alt="" />
        </div>
    </div>
  )
}

export default Banner