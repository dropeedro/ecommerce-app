import React, {useState} from 'react'
import Layout from '../../components/Layout/Layout'
import axios from 'axios';
import {useNavigate, useLocation} from 'react-router-dom'
import toast from 'react-hot-toast';
import { useAuth } from '../../context/auth';
import './Login.scss';

const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const [auth, setAuth] = useAuth()
    const location = useLocation()

    const envioRegistro = async(e) => {
        e.preventDefault()
        const objRegistro = {email, password}
        try {
            const res = await axios.post(`/api/v1/auth/login`, objRegistro)
            if(res.data.status === true){
                toast.success(res.data.message)
                setAuth({
                    ...auth,
                    user: res.data.user,
                    token:  res.data.token
                })
                localStorage.setItem('auth', JSON.stringify(res.data))
                navigate(location.state || "/")
            }else{
                toast.error(res.data.message)
            }
        } catch (error) {
            toast.error('Algo salió mal, intente nuevamente')
        }        
    }

  return (
    <Layout title={"Inicia sesión"}>
        <div className='registro'>
            <h1>Inicia sesión</h1>
            <form onSubmit={envioRegistro}>
                
                <div className="mb-3">
                    <label htmlFor="registroEmail" className="form-label">Email</label>
                    <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} id="registroEmail" />
                </div>
                <div className="mb-3">
                    <label htmlFor="registroContraseña" className="form-label">Contraseña</label>
                    <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} id="registroContraseña" />
                </div>
                <button type="submit" className="btn btn-primary">Iniciar Sesión</button>
            </form>
        </div>
    </Layout>
  )
}

export default Login