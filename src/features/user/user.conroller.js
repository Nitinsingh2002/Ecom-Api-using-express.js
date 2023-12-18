import UserModel from "./user.model.js";
import jwt from 'jsonwebtoken'

export default class UserController {
    userSignup(req, res) {
        const { name, email, password, type } = req.body;
        const user = UserModel.signUp(name, email, password, type)
        res.status(201).send(user)
    }

    userLogin(req, res) {
        const { email, password } = req.body;
        const result = UserModel.logIn(email, password);

        if (!result) {
            res.status(400).send("Incorrect credentials");
        } else {


            //create jwt token   (for more details read notes securing api)
            const token = jwt.sign({
                userID: result.id,
                email: result.email   //this is payload dont store passord or any sensitive data here
            },
                "%Dzf@fox%bJ^Qh",  //key := can be genrated from online key generator
                {
                    expiresIn: '1h'    //time when token expire 
                }
            )

            //send jwt token
            res.status(200).send(token);
        }
    }

}