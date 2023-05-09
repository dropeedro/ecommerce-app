import React, {useState} from 'react'
import Layout from '../../components/Layout/Layout'
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
import toast from 'react-hot-toast';



const Registro = () => {

    const [name, setName] = useState("")
    const [lastname, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("")
    const navigate = useNavigate()

    //validacion form
    const envioRegistro = async(e) => {
        e.preventDefault()
        const objRegistro = {name, lastname, email, password, phone, address}
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/register`, objRegistro)
            if(res && res.data.success){
                toast.success(res.data.message)
                navigate("/login")
            }else{
                toast.error(res.data.message)
            }
        } catch (error) {
            toast.error('Algo salió mal, intente nuevamente')
        }        
    }

  return (
    <Layout title={"Regístrate"}>
        <div className='registro'>
            <h1>Pagina de registro</h1>
            <form onSubmit={envioRegistro}>
                <div className="mb-3">
                    <label htmlFor="registroNombre" className="form-label">Nombre</label>
                    <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} id="registroNombre" />
                </div>
                <div className="mb-3">
                    <label htmlFor="registroApellido" className="form-label">Apellido</label>
                    <input type="text" className="form-control" value={lastname} onChange={(e) => setLastName(e.target.value)} id="registroApellido" />
                </div>
                <div className="mb-3">
                    <label htmlFor="registroContraseña" className="form-label">Contraseña</label>
                    <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} id="registroContraseña" />
                </div>
                <div className="mb-3">
                    <label htmlFor="registroEmail" className="form-label">Email</label>
                    <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} id="registroEmail" />
                </div>
                <div className="mb-3">
                    <label htmlFor="registroTelefono" className="form-label">Telefono</label>
                    <input type="text" className="form-control" value={phone} onChange={(e) => setPhone(e.target.value)} id="registroTelefono" />
                </div>
                <div className="mb-3">
                    <label htmlFor="registroDireccion" className="form-label">Dirección</label>
                    <input type="text" className="form-control" value={address} onChange={(e) => setAddress(e.target.value)} id="registroDireccion" />
                </div>
                <button type="submit" className="btn btn-primary">Registrar</button>
            </form>
        </div>
    </Layout>
  )
}

export default Registro