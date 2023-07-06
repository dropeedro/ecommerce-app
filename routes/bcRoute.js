import express from "express";
import { bcController } from "../controllers/bcController.js";

const router = express.Router()

//crear producto 
router.post('/convertir', bcController)

export default router