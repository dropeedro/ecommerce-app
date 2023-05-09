
import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';
import authRoute from './routes/authRoute.js';
import categoryRoutes from './routes/categoryRoutes.js';
import productRoutes from './routes/productRoutes.js';
import cors from 'cors';


//Env config
dotenv.config()

//db config
connectDB();

//Rest object
const app = express()


//middlewares
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

//route
app.use('/api/v1/auth', authRoute)
app.use('/api/v1/category', categoryRoutes)
app.use('/api/v1/products', productRoutes)

//rest api
app.get('/', (req,res) => {
    res.send("<h1>Bienvenido</h1>")
})

const PORT = process.env.PORT || 8080;
const MODE = process.env.DEV_MODE;

app.listen(PORT, () =>{
    console.log(`Server corriendo en modo ${MODE} en puerto ${PORT}`.bgGreen.white)
})