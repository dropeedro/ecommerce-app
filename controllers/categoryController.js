import { model } from "mongoose"
import categoryModel from "../models/categoryModel.js"
import slugify from "slugify"

export const createCategoryController = async(req, res) => {
    try {
        const {name} = req.body
        if(!name){
            return res.status(401).send({ message : 'El nombre es obligatorio'})
        }
        const existeCategoria = await categoryModel.findOne({name})
        if(existeCategoria){
            return res.status(200).send({success: true, message: 'La categoria ya existe'})
        }
        const category = new categoryModel({name, slug: slugify(name)}).save()
        res.status(200).send({
            success: true,
            message: 'Nueva categoria creada',
            category,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success : false,
            error,
            message: 'Error en Categoria'
        })
    }
}

export const updateCategoryController = async(req,res) => {
    try {
        const {name} = req.body
        const {id} = req.params
        const category = await categoryModel.findByIdAndUpdate(id, {name, slug: slugify(name)}, {new : true})
        res.status(200).send({
            success : true,
            message : 'Categoria editada correctamente',
            category,
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error al cargar la categoria',
            error,
        })
    }
}

export const categoryController = async(req, res) => {
    try {
        const category = await categoryModel.find({})
        res.status(200).send({
            success : true,
            message : 'Todas las categorias listadas',
            category, 
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success : false,
            message : 'Error al mostrar las categorias'
        })
    }
}

export const singleCategoryController = async(req, res) => {
    try {
        const category = await categoryModel.findOne({slug: req.params.slug})
        res.status(200).send({
            success : true,
            message : 'Categoria cargada con éxito',
            category,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success : false,
            message : 'Error al cargar la categoria'
        })
    }
}

export const deleteCategoryController = async(req, res) => {
    try {
        const {id} = req.params
        const category = await categoryModel.findByIdAndRemove(id)
        res.status(200).send({
            success : true,
            message : 'Categoría eliminada'
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success : false,
            message : 'Error al eliminar la categoría',
        })
    }
}