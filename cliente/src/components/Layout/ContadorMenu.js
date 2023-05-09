import React from 'react'
import { NavLink } from 'react-router-dom'
const ContadorMenu = () => {
  return (
    <>
    <div className='text-center'>
        <div className="list-group">
            <h4>Panel de control Contador</h4>
            <NavLink to="/dashboard/contador/register-payment" className="list-group-item list-group-item-action">Registro de pagos</NavLink>
            <NavLink to="/dashboard/contador/shipping" className="list-group-item list-group-item-action">Registro de entregas</NavLink>
        
        </div>
    </div> 


    </>
  )
}

export default ContadorMenu