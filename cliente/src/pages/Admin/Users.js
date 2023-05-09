import React from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'

const Users = () => {
  return (
    <>
    <Layout title={"Dashboard - Ver Clientes"}>
    <div className='container-fluid m-3 p-10'>
        <div className='row'>
            <div className='col-md-3'>
                <AdminMenu/>
            </div>
            <div className='col-md-9'>
                <h3>Todos los usuarios </h3>
            </div>
        </div>
    </div>
    </Layout>
    </>
  )
}

export default Users