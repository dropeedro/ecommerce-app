import slugify from "slugify";
import fs from 'fs'
import productModel from "../models/productModel.js";
import categoryModel from "../models/categoryModel.js"

//Crear producto
export const createProductController = async(req, res) => {
    try {
        const {name, slug, description, price, category, quantity,shipping} = req.fields
        const {photo} = req.files
        switch (true) {
            case !name:
                res.status(401).send({message : 'El nombre del producto es obligatorio'})
            case !description:
                res.status(401).send({message : 'La descripcion producto es obligatorio'})
            case !price:
                res.status(401).send({message : 'El precio del producto es obligatorio'})
            case !category:
                res.status(401).send({message : 'La categoria del producto es obligatorio'})
            case !quantity:
                res.status(401).send({message : 'La categoria del producto es obligatorio'})
            case photo && photo.size > 4000000:
                res.status(401).send({message : 'La foto es obligatoria y debe pesar menos de 4mb'})
        }

        const products = await productModel({...req.fields, slug: slugify(name)})
        if(photo){
            products.photo.data = fs.readFileSync(photo.path)
            products.photo.contentType = photo.type
        }
        await products.save();

        res.status(200).send({
            success: true,
            message : 'Producto guardado correctamente',
            products,
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success : false,
            message : 'Error al crear producto',
        })
    }

}

//Listar productos
export const getProductsController = async(req, res) => {
    try {
        const products = await productModel.find({}).populate("category").select('-photo').limit(12).sort({createdAt : -1})
        res.status(200).send({
            success : true,
            countTotal : products.length,
            message : 'Productos listados con éxito',
            products
        })
    } catch (error) {
        console.log(error)
        res.status(500).sned({
            success: false,
            message: 'Error al listar productos',
        })
    }
}

//Mostrar un producto
export const getSingleProductController = async(req, res) => {
    try {
        const product = await productModel.findOne({slug : req.params.slug}).select("-photo").populate("category")
        res.status(200).send({
            success : true,
            message : 'Producto cargado con éxito',
            product
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message : 'Error al cargar este producto'
        })
    }
}

//Mostrar imagen del producto
export const productPhotoController = async(req, res) => {
    try {
        const product = await productModel.findById(req.params.pid).select("photo")
        if(product.photo.data){
            res.set('Content-type', product.photo.contentType)
            return res.status(200).send(product.photo.data)
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success : false,
            message : 'Error cargando la imagen'
        })
    }
}

//Editar productos
export const updateProductController = async(req, res) => {
    try {
        console.log(req)
        const { name, description, price, category, quantity, shipping } = req.fields;
        const { photo } = req.files;
        switch (true) {
            case !name:
                res.status(401).send({message : 'El nombre del producto es obligatorio'})
            case !description:
                res.status(401).send({message : 'La descripcion producto es obligatorio'})
            case !price:
                res.status(401).send({message : 'El precio del producto es obligatorio'})
            case !category:
                res.status(401).send({message : 'La categoria del producto es obligatoria'})
            case !quantity:
                res.status(401).send({message : 'La cantidad del producto es obligatoria'})
            case photo && photo.size > 4000000:
                res.status(401).send({message : 'La foto es obligatoria y debe pesar menos de 4mb'})
        }
    
        const products = await productModel.findByIdAndUpdate(req.params.pid,{ ...req.fields, slug: slugify(name) },{ new: true });
        if (photo) {
          products.photo.data = fs.readFileSync(photo.path);
          products.photo.contentType = photo.type;
        }
        await products.save();
        res.status(201).send({
          success: true,
          message: "Product Updated Successfully",
          products,
        });
      } catch (error) {
        console.log(error);
        res.status(500).send({
          success: false,
          error,
          message: "Error in Updte product",
        });
      }

}

//Eliminar producto
export const deleteProductController = async(req, res) => {
    try {
        const {id} = req.params
        const product = await productModel.findByIdAndRemove(id).select("photo")
        res.status(200).send({
            success : true,
            message : 'Producto eliminado'
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success : false,
            message : 'Error al eliminar este producto',
        })
    }
}

//Funcion para filtrar productos
export const productFilterController = async (req, res) => {
    try {
      const { checked, radio } = req.body;
      let args = {};
      if (checked.length > 0) args.category = checked;
      if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
      const products = await productModel.find(args);
      res.status(200).send({
        success: true,
        products,
      });
    } catch (error) {
      console.log(error);
      res.status(400).send({
        success: false,
        message: "Error WHile Filtering Products",
        error,
      });
    }
  };

// contador de productos
export const productCountController = async (req, res) => {
    try {
      const total = await productModel.find({}).estimatedDocumentCount();
      res.status(200).send({
        success: true,
        total,
      });
    } catch (error) {
      console.log(error);
      res.status(400).send({
        message: "Error in product count",
        error,
        success: false,
      });
    }
  };
  
  // lista de productos por página
  export const productListController = async (req, res) => {
    try {
      const perPage = 6;
      const page = req.params.page ? req.params.page : 1;
      const products = await productModel
        .find({})
        .select("-photo")
        .skip((page - 1) * perPage)
        .limit(perPage)
        .sort({ createdAt: -1 });
      res.status(200).send({
        success: true,
        products,
      });
    } catch (error) {
      console.log(error);
      res.status(400).send({
        success: false,
        message: "error in per page ctrl",
        error,
      });
    }
  };
  

  export const searchProductController = async(req, res) => {
    try {
      const {keyword} = req.params
      const results = await productModel.find({
        $or: [
          {name : {$regex: keyword, $options:"i"}},
          {description : {$regex: keyword, $options:"i"}}
        ]
      }).select('-photo')
      res.json(results)
    } catch (error) {
      console.log(error)
      res.status(400).send({
        success: false,
        message : 'Error al buscar productos'
      })
    }
  }

  export const relatedProductController = async(req,res) =>{
      try {
        const {pid, cid} = req.params
        const products = await productModel.find({
          category : cid,
          _id : {$ne : pid}
        }).select('-photo').limit(3).populate("category")
        res.status(200).send({
          succes : true,
          products,
        })
      } catch (error) {
        console.log(error)
        res.status(400).send({
          success : false,
          message : 'Error al traer productos relacionados'
        })
      }
  }

  export const productCategoryController = async(req,res) => {
    try {
      const category = await categoryModel.findOne({slug: req.params.slug})
      const products = await productModel.find({category}).populate('category')
      res.status(200).send({
        success : true,
        products,
        category,
      })
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: 'Error trayendo los productos de esta categoria',
        error,
      })
    }
  }