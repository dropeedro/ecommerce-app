
import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';
import authRoute from './routes/authRoute.js';
import categoryRoutes from './routes/categoryRoutes.js';
import productRoutes from './routes/productRoutes.js';
import stripeRoutes from './routes/stripeRoutes.js';
import cors from 'cors';
import webpayPlusRouter from './routes/webpayPlusRoute.js';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

//Env config
dotenv.config()

//db config
connectDB();

//Rest object
const app = express()

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//middlewares
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

//route
app.use('/api/v1/auth', authRoute)
app.use('/api/v1/category', categoryRoutes)
app.use('/api/v1/products', productRoutes)
app.use('/api/v1/stripe', stripeRoutes)
app.use('/webpay_plus', webpayPlusRouter)

//static files
app.use(express.static(path.join(__dirname, './cliente/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './cliente/build/index.html'));
});

//rest api
app.get('/', (req,res) => {
    res.send("<h1>Bienvenido</h1>")
})

const PORT = process.env.PORT || 8080;
const MODE = process.env.DEV_MODE;

app.listen(PORT, () =>{
    console.log(`Server corriendo en modo ${MODE} en puerto ${PORT}`.bgGreen.white)
})
