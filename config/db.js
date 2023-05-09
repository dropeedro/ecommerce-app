import mongoose from 'mongoose';

const connectDB = async() => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL)
        console.log(`Conectado a mongoDB : Database ${conn.connection.host}`.bgMagenta.white)
    } catch (error) {
        console.log(`Error en mongoDB ${error}`.bgWhite.white)
    }
}
export default connectDB;