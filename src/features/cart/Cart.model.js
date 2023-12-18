import ProductModel from "../product/product.model.js"
import UserModel from "../user/user.model.js"

export default class CartModel {
    constructor(productId, userId, quantity, id) {
        this.productId = productId
        this.userId = userId
        this.quantity = quantity
        this.id = id
    }

    static add(productId, userId, quantity) {
        //validating user
        const user = UserModel.getAll().find((u) => u.id == userId)
        if (!user) {
            return ("User not avaialable")
        }
        //validating roduct 
        const product = ProductModel.getAll().find((p) => p.id == productId)
        if (!product) {
            return ("prodct not found")
        }

        const cartItem = new CartModel(
            productId, userId, quantity,
        )
        cartItem.id = cartItems.length + 1;

        cartItems.push(cartItem)
        return cartItem
    }


    static get(uId) {
        const user = UserModel.getAll().find((u) => u.id == uId)
        if (!user) {
            return ("User not avaialable")
        }

        const AllItem = cartItems.find((i) => i.userId == uId)
        return AllItem;
    }

    static delete(cartItemId,uId) {
        const itemIndex = cartItems.findIndex((c) => c.id == cartItemId && c.userId == uId)
        if (itemIndex == -1) {
            return ("Item is not persent")
        } else {
            cartItems.splice(itemIndex, 1)
        }
    }
}

var cartItems = [
    new CartModel(1, 1, 1, 1)  //1 product id 1 user id and qunatity is also 1 and id is also 1

]