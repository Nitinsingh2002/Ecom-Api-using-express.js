import ProductModel from "./product.model.js";


export default class ProductController {
    getAllproducts(req, res) {
        const products = ProductModel.getAll();
        res.status(200).send(products)
    }

    addProduct(req, res) {
        const { name, price, sizes } = req.body
        const newProduct = {
            name,
            price: parseFloat(price),
            sizes: sizes.split(','),
            imageUrl: req.file.filename
        }

        const createdReacord = ProductModel.Add(newProduct)
        res.status(201).send(createdReacord)
    }


    getSingleProduct(req, res) {
        const id = req.params.id;
        console.log(id)
        const product = ProductModel.getSingle(id)

        if (!product) {
            res.status(401).send("Product not found")
        }
        res.status(201).send(product)

    }



    filterProduct(req, res) {
        //taking dta from query
        const minPrice = req.query.minPrice
        const maxPrice = req.query.maxPrice
        const category = req.query.category

        const result = ProductModel.filter(minPrice, maxPrice, category)
        res.status(200).send(result)
    }

    RateProduct(req, res) {
        console.log("query", req.query)

        const userId = req.query.userId
        const productId = req.query.productId
        const rating = req.query.rating

            ProductModel.RateProduct(
                userId, productId, rating
            )

        

        return res.status(201).send("product rated")
    }
}