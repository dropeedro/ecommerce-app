import React, { useEffect, useState } from 'react'
import './Footer.scss'
import Payment from '../../assets/payments.png';
import { FaEnvelope, FaLocationArrow, FaMobileAlt } from 'react-icons/fa/index.esm';
import { BsFillHeartFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const Footer = () => {

    const [categories, setCategories] = useState([]);
    const navigate = useNavigate()

    //Categorias
    const getAllCategory = async () => {
        try {
          const { data } = await axios.get("/api/v1/category/get-category");
          if (data?.success) {
            setCategories(data?.category);
          }
        } catch (error) {
          console.log(error);
        }
      };

      useEffect(()=> {
        getAllCategory()
      },[])

    const capitalize = (word) => {
    return word[0].toUpperCase() + word.substring(1).toLowerCase();
    }

    const handleHome = () => {
        navigate('/')
    }
    const handleCatalogo = () => {
        navigate('/catalogo')
    }

  return (
    <footer className='footer'>
        <div className="footer-content">
            <div className="col">
                <div className="title">Sobre Nosotros</div>
                <div className="text">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem quasi veritatis necessitatibus nam. Aut sit veritatis voluptas nam excepturi recusandae!</p>
                </div>
            </div>
            <div className="col">
                <div className="title">Contacto</div>
                <div className="c-item">
                    <FaLocationArrow/>
                    <div className="text">Serrano #1032, Melipilla</div>
                </div>
                <div className="c-item">
                    <FaMobileAlt/>
                    <div className="text">+56(9) 83848284</div>
                </div>
                <div className="c-item">
                    <FaEnvelope/>
                    <div className="text">contacto@musicpro.cl</div>
                </div>
            </div>
            <div className="col">
                <div className="title">Categorias</div>
                {categories.map(c => (
                    <span key={c._id} className="text" onClick={() => navigate(`/category/${c.slug}`)}>{capitalize(c.name)}</span>
                ))}
            </div>
            <div className="col">
                <div className="title">Páginas</div>
                <span className="text" onClick={handleHome}>Inicio</span>
                <span className="text" onClick={handleCatalogo}>Catalogo</span>
            </div>
        </div>
        <div className="bottom-bar">
            <div className="bottom-bar-content">
                <div className="text">
                    <b>MUSICPRO 2023 - </b> CREADO CON <BsFillHeartFill/> POR PEDRO,BASTI,MARTIN Y MAXI
                </div>
                <img src={Payment} alt="" />
            </div>
        </div>
    </footer>
  )
}

export default Footer