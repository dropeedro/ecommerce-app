import React, {useEffect, useState, } from 'react'
import Layout from '../../components/Layout/Layout'
import UserMenu from '../../components/Layout/UserMenu'
import { useAuth } from '../../context/auth'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const Profile = () => {
    const [auth, setAuth] = useAuth()
    const [name, setName] = useState("")
    const [lastname, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("")
    const navigate = useNavigate()

    useEffect(() => {
        const {name, lastname, email, phone, address} = auth?.user
        setName(name)
        setLastName(lastname)
        setEmail(email)
        setPhone(phone)
        setAddress(address)

    },[auth?.user])

    //form
    const envioRegistro = async(e) => {
        e.preventDefault()
        const objRegistro = {name, lastname, email, password, phone, address}
        try {
            console.log(`${process.env.REACT_APP_API}/api/v1/auth/profile`);
            const {data} = await axios.put(`${process.env.REACT_APP_API}/api/v1/auth/profile`, objRegistro)
            // const {data} = await axios.put('/api/v1/auth/profile', objRegistro)
            if(data?.error){
                toast.error(data?.error)
            }else{
                setAuth({...auth, user : data?.updatedUser})
                let ls = localStorage.getItem("auth")
                ls = JSON.parse(ls)
                ls.user = data?.updatedUser
                localStorage.setItem('auth', JSON.stringify(ls))
                toast.success('Perfil actualizado correctamente')
            }
        } catch (error) {
            toast.error('Algo salió mal, intente nuevamente')
        }        
    }

  return (
    <>
    <Layout title={"Dashboard - Tú Perfil"}>
        <div className='container-fluid m-3 p-10'>
            <div className='row'>
                <div className='col-md-3'>
                    <UserMenu/>
                </div>
                <div className='col-md-9'>
                    <h3>Perfil</h3>
                    <div className='update-profile'>
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
                            <input type="email" disabled className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} id="registroEmail" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="registroTelefono" className="form-label">Telefono</label>
                            <input type="text" className="form-control" value={phone} onChange={(e) => setPhone(e.target.value)} id="registroTelefono" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="registroDireccion" className="form-label">Dirección</label>
                            <input type="text" className="form-control" value={address} onChange={(e) => setAddress(e.target.value)} id="registroDireccion" />
                        </div>
                        <button type="submit" className="btn btn-primary">Actualizar información</button>
                    </form>
                </div>
                </div>
            </div>
        </div>
    </Layout>
    </>
  )
}

export default Profile