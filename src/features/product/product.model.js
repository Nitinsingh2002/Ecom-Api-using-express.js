import { ApllicationError } from '../../../error/application-error.js';
//application based to throw user based error

import UserModel from '../user/user.model.js';


export default class ProductModel {
    constructor(id, name, description, price, imageUrl, category, sizes) {
        this.id = id
        this.name = name
        this.description = description
        this.price = price
        this.imageUrl = imageUrl
        this.category = category
        this.sizes = sizes


    }

    static getAll() {
        return products;
    }

    static Add(product) {
        product.id = products.length + 1
        products.push(product)
        return product
    }

    static getSingle(id) {
        console.log(id, "id")
        const product = products.find((p) => p.id == id)
        console.log("products", product)
        return product;
    }

    static filter(minPrice, maxPrice, cat) {
        const result = products.filter((product) => {
            return (
                (!minPrice || product.price >= minPrice) &&
                (!maxPrice || product.price <= maxPrice) &&
                (!cat || product.category === cat)
            );
        });
        return result;
    }



    static RateProduct(userId, productId, rating) {
        1//validate user 
        console.log("userId", userId)

        const user = UserModel.getAll().find((user) => user.id === parseInt(userId));

        if (!user) {
            throw new ApllicationError("User not found" ,400)
        }

        //2 validate product
        const product = products.find((p) => p.id === parseInt(productId));


        if (!product) {
            throw new ApllicationError ("product not found",400)
        }

        // 3. Check if there are any ratings , and if not then add ratings array

        if (!product.ratings) {
            product.ratings = []
            product.ratings.push({
                userId: userId,
                rating: rating
            })
        }

        else {
            // Check if the user has already rated the product
            const existingRatingIndex = product.ratings.findIndex((r) => r.userId == userId)

            if (existingRatingIndex >= 0) {
                // If the user has an existing rating, update it with the new rating
                product.ratings[existingRatingIndex] = {
                    userId: userId,
                    rating: rating
                }
            }
            // If the user hasn't rated before, add a new rating for the user
            else {
                product.ratings.push({
                    userId: userId,
                    rating: rating
                })
            }

        }

    }








}

var products = [
    new ProductModel(
        1,
        'Product 1',
        'Description for Product 1',
        19.99,
        'https://m.media-amazon.com/images/I/51-nXsSRfZL._SX328_BO1,204,203,200_.jpg',
        'Cateogory1'
    ),
    new ProductModel(
        2,
        'Product 2',
        'Description for Product 2',
        29.99,
        'https://m.media-amazon.com/images/I/51xwGSNX-EL._SX356_BO1,204,203,200_.jpg',
        'Cateogory2',
        ['M', 'XL']
    ),
    new ProductModel(
        3,
        'Product 3',
        'Description for Product 3',
        39.99,
        'https://m.media-amazon.com/images/I/31PBdo581fL._SX317_BO1,204,203,200_.jpg',
        'Cateogory3',
        ['M', 'XL', 'S']
    )
]