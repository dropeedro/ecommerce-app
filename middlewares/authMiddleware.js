import JWT from 'jsonwebtoken'
import userModel from '../models/userModel.js';

//ruta protegida por token

export const requireSignIn = async(req, res, next) => {
    try {
        const decode = JWT.verify(req.headers.authorization, process.env.JWT_SECRET);
        req.user = decode;
        next();
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success : false,
            message: 'Error aquí'
        })
    }
}

//Acceso admin
export const isAdmin = async(req, res, next) => {
    try {
        const user = await userModel.findById(req.user._id)
        if(user.rol === 1){
            next();
        }else{
            return res.status(401).send({
                success : false,
                message : "Ingreso no autorizado",
            })
        }
    } catch (error) {
        console.log(error)
        res.status(401).send({
            success : false,
            error,
            message : 'Error en admin middleware'
        })
    }
}
export const isContador = async(req, res, next) => {
    try {
        const user = await userModel.findById(req.user._id)
        if(user.rol === 2){
            next();
        }else{
            return res.status(401).send({
                success : false,
                message : "Ingreso no autorizado",
            })
        }
    } catch (error) {
        console.log(error)
        res.status(401).send({
            success : false,
            error,
            message : 'Error en contador middleware'
        })
    }
}