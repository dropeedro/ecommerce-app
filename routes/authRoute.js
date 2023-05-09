import express from 'express'
import {registerController, 
        loginController,
        testController,
        updateProfile
    } from '../controllers/authController.js'
import { isAdmin, isContador, requireSignIn } from '../middlewares/authMiddleware.js'

//router object
const router = express.Router()

//routing
//REGISTER || METHOD POST
router.post('/register', registerController)

//POST LOGIN
router.post('/login', loginController)

//test
router.get("/test", requireSignIn, isAdmin, testController)

//ruta protegida auth cliente
router.get("/user-auth", requireSignIn, (req, res) => {
    res.status(200).send({ok : true})
})
//ruta protegida auth admin
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
    res.status(200).send({ok : true})
})

//ruta protegida auth contador
router.get("/contador-auth", requireSignIn, isContador, (req, res) => {
    res.status(200).send({ok : true})
})

//actualizar producto
router.put('/profile', requireSignIn, updateProfile)
 


export default router