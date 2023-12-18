import Jwt from "jsonwebtoken";

const jwtAuth = (req, res, next) => {
    //taking token from header and store in in token variable
    const token = req.headers["authorization"]

    console.log("token is", token)

    //if token is not  avialable in header
    if (!token) {
        res.status(401).send("Unauthorized acess")
    }

    //token verification
    try {
        const payload = Jwt.verify(token, "%Dzf@fox%bJ^Qh")   //use same ket that we use for creating the token
        console.log("verifiedToken", payload)
        //aceess userId from header (we use this cart controller where we accees usr id to add cart)
        req.userId = payload.userID
        next();
    }
    //if token verification is failed
    catch (error) {
        console.log(error)
        res.status(401).send("unauthorized acess")
    }
  


}


export default jwtAuth;