import React from 'react'
import Layout from '../components/Layout/Layout'
import Map from '../components/Map'

const Contacto = () => {
  const key = "AIzaSyAHqb7xP20pvhpKUI_m6gtpJcp3t8II2EQ"
  const url = `https://maps.googleapis.com/maps/api/js?v=3.exp&key=${key}`
  console.log(url);
  return (
    <Layout title={"Contacto - MusicPro"}>
        <h1>Contacto</h1>
        <Map 
            googleMapURL = {`https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyAHqb7xP20pvhpKUI_m6gtpJcp3t8II2EQ`}
            containerElement = {<div style={{height: '400px'}}></div>}
            mapElement = {<div style={{height: '400px'}}></div>}
            loadingElement = {<p>Cargando...</p>}
        />
    </Layout>
  )
}

export default Contacto;