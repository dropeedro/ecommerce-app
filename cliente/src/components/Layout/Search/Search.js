import { MdClose } from "react-icons/md"
import "./Search.scss"
import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { useSearch } from "../../../context/search"

const Search = ({setShowSearch}) => {

    const [loading, setLoading] = useState(false)
    const [values, setValues] = useState([])
    const [searchTitle, setSearchTitle] = useState("")
    const navigate = useNavigate()

    useEffect(() => {
        const loadData = async() => {
            setLoading(true);
            const response = await axios.get('/api/v1/products/get-products');
            console.log(response.data.products);
            setValues(response.data.products);
            setLoading(false)
        }

        loadData();
    }, [])
    
    

  return (
    <div className="search-modal">
        <div className="form-field">
            <input placeholder="Busca un producto..." onChange={(e) => setSearchTitle(e.target.value)}/>
            <MdClose onClick={() => setShowSearch(false)}/>
        </div>
        <div className="search-result-content">
            <div className="search-results">
                {values.filter((value) => {
                    if(searchTitle === ""){
                        return "";
                    }else if(!value.name.toLowerCase().includes(searchTitle.toLowerCase())){
                        return "";
                     }else{
                        return value
                     }
                })
                .map((item) => (
                    <div key={item._id} className="search-result-item" onClick={() => {setShowSearch(false);
                                                                                navigate(`/product/${item.slug}`)}}>
                    <div className='img-container'>
                    <img src={`/api/v1/products/product-photo/${item._id}`} className="card-img-top" alt={item.name}/>
                    </div>
                    <div className="product-details">
                        <span className="name">{item.name}</span>
                        <span className="desc">{item.description}</span>
                    </div>
                </div> 
                ))} 
            </div>
        </div>
    </div>
  )
}

export default Search