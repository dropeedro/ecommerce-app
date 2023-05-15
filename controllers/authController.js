import userModel from "../models/userModel.js"
import router from "../routes/authRoute.js";
import { comparePassword, hashPass } from "../util/authHelper.js"
import JWT from "jsonwebtoken";

export const registerController = async(req,res) =>{
    try {
        const {name, lastname, email, password, phone, address} = req.body
        //validaciones
        if(!name){
            return res.send({message:'El nombre es obligatorio'})
        }
        if(!lastname){
            return res.send({message:'El apellido es obligatorio'})
        }
        if(!email){
            return res.send({message:'El email es obligatorio'})
        }
        if(!password){
            return res.send({message:'La contraseña es obligatoria'})
        }
        if(!phone){
            return res.send({message:'El telefono es obligatorio'})
        }
        if(!address){
            return res.send({message:'La dirección es obligatoria'})
        }

        //valider usuario existente
        const existeUser = await userModel.findOne({email})
        if(existeUser){
            return res.status(200).send({
                success: false,
                message: 'Este email ya fue registrado, intente nuevamente'
            })
        }

        //registrar usuario
        //hash de password
        const hashedPassword = await hashPass(password) 
        const nuevoUser = new userModel({name, lastname, email, phone, address, password: hashedPassword}).save()
        res.status(201).send({
            success : true,
            message : 'Usuario registrado correctamente',
            nuevoUser,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success : false,
            message : 'Error en el registro',
            error
        })
    }
}

//POST LOGIN

export const loginController = async(req,res) => {
    try {
        const {email, password} = req.body
        //validacion 
        if(!email || !password ){
            return res.status(404).send({
                success: false,
                message: 'Email o clave invalida, intente nuevamente'
            })
        }
        //valida usuario
        const user = await userModel.findOne({email})
        if(!user){
            return res.status(200).send({
                status : false,
                message: 'Este email no está registrado'
            })
        }
        const match = await comparePassword(password, user.password)
        if(!match){
            return res.status(200).send({
                status : false,
                message : 'Contraseña invalida'
            })
        }
        //token
        const token = JWT.sign({ _id : user._id }, process.env.JWT_SECRET, {expiresIn: "7d"},)
            res.status(200).send({
                status : true,
                message : 'Inicio de sesión exitoso',
                user : {
                    _id : user._id,
                    name : user.name,
                    lastname : user.lastname,
                    email : user.email,
                    phone : user.phone,
                    address : user.address,
                    role : user.rol
                },
                token,
            })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error en el login',
            error
        })
    }
}

export const testController = (req, res) => {
    try {
        res.send('Ruta protegida')
    } catch (error) {
        res.send({ error })
    }
}

export const updateProfile = async(req, res) => {
    try {
        const {name, lastname, password, email, phone, address} = req.body
        const user = await userModel.findById(req.user._id)
        //contraseña
        if(password && password.length < 4 ){
            return res.json({error: 'La contraseña es obligatoria y mayor de 4 caracteres'})
        }
        const hashedPassword = await password ? await hashPass(password) :undefined;
        const updatedUser = await userModel.findByIdAndUpdate(req.user._id,{
            name : name || user.name,
            lastname : lastname || user.lastname,
            password : hashedPassword || user.pasword,
            phone : phone || user.phone,
            address : address || user.address,
        },{new : true})
        res.status(200).send({
            success : true,
            message : 'Usuario actualizado correctamente',
            updatedUser,
        })
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: 'Error actualizando el perfil',
            error
        })
    }
}