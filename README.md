# MusicPro (in Development)

Un ecommerce profesional para la venta online de una tienda de música. Cuenta con todo lo necesario para que sea **autoadministrable**. 

#### Backend	 
- Node js
- Express
- MongoDB
#### Frontend
- React js
- SASS

Y será desplegado en un heroku server
# Cómo empezar
### Primero clona este proyecto en tu terminal local
`git clone https://github.com/dropeedro/ecommerce-app.git`
### Entra al directorio
`cd ecommerce-app`
### Instala las dependencias necesarias para correr el proyecto local
`npm run build`
> Esto intalará dependencias en el frontend y el backend, por lo que solo se hace una vez
### Tienes 3 opciones para correr el proyecto.
`npm run server` (Levantará el servidor y podrás probar las api).

`npm run client` (Levantará la vista web del cliente)

`npm run dev`(levantará ambos)

# Integración Transbank WebPay Plus SDK

Está implementado el servicio de transbank WebPay Plus a través del SDK.

Para correr el sdk necesita crear un archivo `.env` y agregar las siguientes variables:

>`WPP_CC`: Clave de comercio asignado
>
>`WPP_KEY`: Secret Api Key 

Para conseguir las llaves para el entorno de desarrollo en testing vea la documentación oficial de [Transbank Developers](https://www.transbankdevelopers.cl/producto/webpay#webpay-plus)

#### Para ver una versión funcionando del proyecto haga click [aquí](https://music-pro-sv7n.onrender.com) 
`https://music-pro-sv7n.onrender.com`