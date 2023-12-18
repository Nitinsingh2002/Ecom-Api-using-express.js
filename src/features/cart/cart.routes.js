import express from 'express'
import CartController from './Cart.controller.js'


const cartRoutes = express.Router()
const cartController = new CartController


cartRoutes.post("/", cartController.addToCart)
cartRoutes.get("/itemgetall", cartController.getCart)
cartRoutes.delete("/:id", cartController.deleteProduct)

export default cartRoutes;