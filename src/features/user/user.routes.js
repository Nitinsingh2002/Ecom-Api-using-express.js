import express from 'express'
import UserController from './user.conroller.js'


const userRoutes = express.Router();

const userController = new UserController

userRoutes.post("/signUp", userController.userSignup)
userRoutes.post("/signIn", userController.userLogin)

export default userRoutes;