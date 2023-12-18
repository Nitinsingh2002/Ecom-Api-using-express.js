import express from 'express'
import ProductController from './product.controller.js';
import upload from '../../middlewares/fileupload.middleware.js'


//intilize router
const router = express.Router()

// create a instance of product controller 
const productController = new ProductController;


// all the path to controllers method
//localhost/api/products/
router.get("/", productController.getAllproducts)
router.post("/", upload.single('imageUrl'), productController.addProduct)
router.get("/get-products/:id",productController.getSingleProduct)

// http://localhost:3000/api/products/filter?minPrice=10&maxPrice=20&category=Cateogory1
router.get("/filter",productController.filterProduct)
router.post("/rate",productController.RateProduct)

export default router;
