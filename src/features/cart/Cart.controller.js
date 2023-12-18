import CartModel from "./Cart.model.js"


export default class CartController {


    addToCart(req, res) {
        const { ProductId, quantity } = req.query
        // acessing userId from header that we acess from payload from jwt token
        const userId = req.userId;


        CartModel.add(userId, ProductId, quantity)
        return res.status(201).send("product added to cart sucessfully")
    }


    getCart(req, res) {
        //acess user id from token
        const userId = req.userId;

        const item = CartModel.get(userId)
        res.status(201).send(item)
    }

    deleteProduct(req, res) {
        const userId = req.userId;
        const cartItemId = req.params.id
        console.log("userId", userId)
        console.log("cartItemId", cartItemId)
        const error = CartModel.delete(userId, cartItemId)
        if (error) {
            return res.status(404).send(error)
        }
        else {
            return res.status(201).send("Item removed form cart")
        }
    }
}