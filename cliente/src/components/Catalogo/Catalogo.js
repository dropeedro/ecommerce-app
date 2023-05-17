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

  //get all cat
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
  //get products
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

  //getTOtal COunt
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
  //load more
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

  // filter by cat
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };
  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  //get filterd product
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


  return (
    <Layout title={"Catalogo - MusicPro "}>
      <div className="container-fluid">
        <div className="row m-3">
          <div className="col-md-2 mt-5">
            <h4 className="text-center">Filtrar por categoriaaa</h4>
            <div className="d-flex flex-column">
              {categories?.map((c) => (
                <Checkbox key={c._id}onChange={(e) => handleFilter(e.target.checked, c._id)}>
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
                  <img src={`/api/v1/products/product-photo/${p._id}`} className="card-img-top" alt={p.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">
                      {p.description}
                    </p>
                    <p className="card-text">{parseInt(p.price).toLocaleString('es-CL', {style : 'currency',currency : "CLP"})}</p>
                    <button class="btn btn-primary ms-1" onClick={() => {navigate(`/product/${p.slug}`)}}>Ver más</button>
                    <button class="btn btn-warning ms-1" onClick={() => {
                                                                        const clone = JSON.parse(JSON.stringify(p))
                                                                        let newProd = {...clone, quantityItem : 1}
                                                                        setCart([...cart, newProd])
                                                                        localStorage.setItem('cart', JSON.stringify([...cart, newProd]))
                                                                        toast.success('Producto agregado al carrito')
                                                                        }}>Agregar al carro</button>
                  </div>
                </div>
              )) : <LoadingSpinner/>}
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
