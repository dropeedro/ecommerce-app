import express from "express";
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';
import { categoryController, createCategoryController, deleteCategoryController, singleCategoryController, updateCategoryController } from "../controllers/categoryController.js";

const router = express.Router()

//ruta pi
//crear
router.post("/create-category", requireSignIn, isAdmin, createCategoryController);

//editar
router.put("/update-category/:id", requireSignIn, isAdmin, updateCategoryController);

//mostrar todo
router.get("/get-category", categoryController)

//una categoria
router.get("/single-category/:slug", singleCategoryController)

//eliminar categoria
router.delete("/delete-category/:id", deleteCategoryController)

export default router