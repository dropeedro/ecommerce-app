import React, { useState, useEffect } from "react";
import Layout from "../Layout/Layout";
import './Catalogo.scss';

import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Prices } from "../Prices";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/cart";
import toast from 'react-hot-toast'
import LoadingSpinner from "../LoadingSpinner";

const Catalogo = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [exchangeRate, setExchangeRate] = useState(null);
  const [manualExchangeRate, setManualExchangeRate] = useState(799.97); // Valor manual del tipo de cambio

  // Obtener tipo de cambio desde la API del Banco Central
  useEffect(() => {
    const getExchangeRate = async () => {
      try {
        const response = await axios.get("https://si3.bcentral.cl/SieteRestWS/SieteRestWS.ashx?user=206039035&pass=SmBc4syUBeoa&firstdate=2023-03-01&lastdate=2023-03-01&timeseries=F073.TCO.PRE.Z.D&function=GetSeries"); // Reemplaza con la URL correcta para obtener el tipo de cambio actualizado
        const exchangeRate = response.data.rate; // Asegúrate de obtener el tipo de cambio correcto de la respuesta
        setExchangeRate(exchangeRate);
      } catch (error) {
        console.log(error);
      }
    };

    getExchangeRate();
  }, []);

  // Obtener todas las categorías
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

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);

  // Obtener todos los productos
  const getAllProducts = async () => {
    try {
      setLoadingData(true)
      setLoading(true);
      const { data } = await axios.get(`/api/v1/products/product-list/${page}`);
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  // Obtener el total de productos
  const getTotal = async () => {
    try {
      const { data } = await axios.get("/api/v1/products/product-count");
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  // Cargar más productos
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/products/product-list/${page}`);
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
     setLoading(false);
    }
  };

  // Filtrar por categoría
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c!== id);
    }
    setChecked(all);
  };

  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  // Obtener productos filtrados
  const filterProduct = async () => {
    try {
      const { data } = await axios.post("/api/v1/products/product-filters", {
        checked,
        radio,
      });
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  // Función para convertir el precio de CLP a USD utilizando el tipo de cambio de la API
  const convertToUSD = (priceCLP) => {
    if (exchangeRate) {
      return (priceCLP / exchangeRate).toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    } else {
      return '';
    }
  };

  // Función para convertir el precio de CLP a USD utilizando el valor manual del tipo de cambio
  const convertToManualUSD = (priceCLP) => {
    if (manualExchangeRate) {
      return (priceCLP / manualExchangeRate).toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    } else {
      return '';
    }
  };

  // Manejar el cambio en el valor manual del tipo de cambio
  const handleManualExchangeRateChange = (e) => {
    setManualExchangeRate(parseFloat(e.target.value));
  };

  return (
    <Layout title={"Catalogo - MusicPro "}>
    <div className="container-fluid">
      <div className="row m-3">
        <div className="col-md-2 mt-5">
          <h4 className="text-center">Filtrar por categoría</h4>
          <div className="d-flex flex-column">
            {categories?.map((c) => (
              <Checkbox key={c._id} onChange={(e) => handleFilter(e.target.checked, c._id)}>
                {c.name}
              </Checkbox>
            ))}
          </div>
          <h4 className="text-center mt-4">Filtrar por precio</h4>
          <div className="d-flex flex-column">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          
          <div className="d-flex flex-column">
            <button className="btn btn-danger mt-3" onClick={() => window.location.reload()}>
              Borrar Filtros
            </button>
          </div>
        </div>
        <div className="col-10 ">
          <h1 className="text-center">Todos los productos</h1>
          <div className="d-flex flex-wrap justify-content-center">
            {loadingData ? products?.map((p) => (
              <div className="card m-2" style={{ width: "18rem" }}>
                <img src={`/api/v1/products/product-photo/${p._id}`} className="card-img-top" alt={p.name} />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">{p.description}</p>
                  <p className="card-text">
                    CLP: {parseInt(p.price).toLocaleString('es-CL', { style: 'currency', currency: "CLP" })}
                    <br></br>
                   USD: {exchangeRate && (
                      convertToUSD(p.price).toLocaleString('en-US', { style: 'currency', currency: "USD" })
                    )}
                    {!exchangeRate && (
                      convertToManualUSD(p.price).toLocaleString('en-US', { style: 'currency', currency: "USD" })
                    )}
                  </p>
                  {exchangeRate && (
                    <p className="card-text">
                      {convertToUSD(p.price)}
                    </p>
                  )}
                  {!exchangeRate && (
                    <p className="card-text">
                      {convertToManualUSD(p.price)}
                    </p>
                  )}
                  <button className="btn btn-primary ms-1" onClick={() => { navigate(`/product/${p.slug}`) }}>Ver más</button>
                  <button className="btn btn-warning ms-1" onClick={() => {
                    const clone = JSON.parse(JSON.stringify(p));
                    let newProd = { ...clone, quantityItem: 1 };
                    setCart([...cart, newProd]);
                    localStorage.setItem('cart', JSON.stringify([...cart, newProd]));
                    toast.success('Producto agregado al carrito');
                  }}>Agregar al carro</button>
                </div>
              </div>
            )) : <LoadingSpinner />}
          </div>
          <div className="m-2 p-3">
            {products && products.length < total && (
              <button className="btn btn-warning" onClick={(e) => { e.preventDefault(); setPage(page + 1); }} >
                {loading ? "Cargando ..." : "Cargar Más"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  </Layout>
  
  );
};

export default Catalogo;