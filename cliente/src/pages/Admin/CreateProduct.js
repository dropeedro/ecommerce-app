import React, {useState, useEffect} from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import { toast } from 'react-hot-toast'
import axios from 'axios';
import {Select} from 'antd'
import { useNavigate } from 'react-router-dom';

const {Option} = Select;

const CreateProduct = () => {

  const [categories, setCategories] = useState([])
  const [photo, setPhoto] = useState("")
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [price, setPrice] = useState("")
  const [quantity, setQuantity] = useState("")
  const [shipping, setShipping] = useState("")

  const navigate = useNavigate()
  

  //traer categorias
  const getAllCategories = async() => {
    try {
      const {data} = await axios.get('/api/v1/category/get-category')
      if(data?.success){
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error)
      toast.error('Error al cargar las categorías')
    }
  }

  useEffect(() => {
    getAllCategories();
  }, [])

  const handleSubmit = async(e) => {
      e.preventDefault();
      try {
        const productData = new FormData()
        productData.append("name" , name);
        productData.append("description" , description);
        productData.append("quantity" , quantity);
        productData.append("price" , price);
        productData.append("photo" , photo);
        productData.append("category" , category);
        console.log(productData.values)
        const {data} = await axios.post('/api/v1/products/create-product', productData)
        if(data?.success){
          toast.success('Producto guardado correctamente');
          navigate('/dashboard/admin/products');
        }else{
          toast.error(data?.message);
        }
      } catch (error) {
        console.log(error)
        toast.error('Algo salío mal')
      }
  }

  return (
    <Layout title={"Dashboard - Crear Producto"}>
    <div className='container-fluid m-3 p-10'>
        <div className='row'>
            <div className='col-md-3'>
                <AdminMenu/>
            </div>
            <div className='col-md-9'>
                <h3>Crear Productos</h3>
                <div className='mb-3 col-md-9'>
                <label className='p-2'>Seleccione la categoría del producto: </label>
                  <Select bordered={false} placeholder="Elija una categoría" size='large' showSearch className='form-control mb-3' onChange={(value) => {setCategory(value)}}>
                    {categories?.map((c) => (
                      <Option key={c._id} value = {c._id} >{c.name}</Option>
                    ))}

                  </Select>
                </div>
                <div className='mb-3 col-md-9'>
                  <label className='p-2'>Nombre del producto: </label>
                  <input type='text' value={name} placeholder='Escriba el nombre del producto' className='form-control' onChange={(e) => setName(e.target.value)}/>
                </div>
                <div className='mb-3 col-md-9'>
                  <label className='p-2'>Descripción: </label>
                  <input type='text' value={description} placeholder='Escriba una descripción del producto' className='form-control' onChange={(e) => setDescription(e.target.value)}/>
                </div>
                <div className='mb-3 col-md-9'>
                  <label className='p-2'>Cantidad</label>
                  <input type='number' value={quantity} placeholder='Cantidad en stock' className='form-control' onChange={(e) => setQuantity(e.target.value)}/>
                </div>
                <div className='mb-3 col-md-9'>
                  <label className='p-2'>Precio</label>
                  <input type='text' value={price} placeholder='Escriba el nombre del producto' className='form-control' onChange={(e) => setPrice(e.target.value)}/>
                </div>
                <div className='mb-3 col-md-9'>
                  <label className='p-2'>Envio disponible</label>
                  <Select bordered={false} placeholder="Seleccione si tiene envio disponible" size='large' onChange={(value) => {setShipping(value)}}>
                    <Option value = "0">No</Option>
                    <Option value = "1">Si</Option>
                  </Select>
                </div>
                <div className='mb-3 col-md-12'>
                  <label className='btn btn-outline-primary col-md-9'>
                    {photo ? photo.name : "Subir imagen"}
                  <input type='file' name='photo' accept='image/*' onChange={(e) => {setPhoto(e.target.files[0]); console.log(e.target.files)}} hidden />
                  </label>
                </div>
                <div className='mb-3 col-md-9'>
                  {photo && (
                    <div className='text-center'>
                      <img src={URL.createObjectURL(photo)} alt='imagen-producto' height={'200px'} className='img img-responsive'/>
                    </div>
                  )}
                </div>
                <div className='mb-3'>
                  <button className='btn btn-outline-success' onClick={handleSubmit}>Guardar Producto</button>
                </div>

            </div>
        </div>
    </div>
    </Layout>
  )
}

export default CreateProduct