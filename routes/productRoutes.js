import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import { createProductController, deleteProductController, getProductsController, getSingleProductController, productCategoryController, productCountController, productFilterController, productListController, productPhotoController, relatedProductController, searchProductController, updateProductController } from "../controllers/productController.js";
import formidable from "express-formidable";

const router = express.Router()

//crear producto 
router.post('/create-product', requireSignIn, isAdmin, formidable(), createProductController)

//listar productos
router.get('/get-products', getProductsController)

//mostrar un producto
router.get('/get-product/:slug', getSingleProductController)

//ver foto
router.get('/product-photo/:pid', productPhotoController)

//editar producto
router.put('/update-product/:pid', requireSignIn, isAdmin, formidable(), updateProductController)

//eliminar producto
router.delete('/delete-product/:id', requireSignIn, isAdmin, deleteProductController)


//filtrar productos
router.post('/product-filters', productFilterController)

//contador productos
router.get("/product-count", productCountController);

//productos por pagina
router.get("/product-list/:page", productListController);

//buscar producto
router.get("/search/:keyword", searchProductController)

//productos relacionados
router.get("/related-products/:pid/:cid", relatedProductController)

//productos por categoria
router.get("/product-category/:slug", productCategoryController)

export default router