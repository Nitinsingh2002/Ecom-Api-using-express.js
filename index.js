import express from "express";
import apidocs from './swagger.json' assert {type: 'json'};
//importing router as product Routes
import productRoutes from "./src/features/product/product.routes.js";
import bodyParser from "body-parser";
import userRoutes from "./src/features/user/user.routes.js";
import BasicAuth from "./src/middlewares/basicAuth.middleware.js";
import jwtAuth from "./src/middlewares/jwt.middleware.js";
import cartRoutes from "./src/features/cart/cart.routes.js";
import swagger from 'swagger-ui-express'
import cors from 'cors'
import loggerMiddleware from "./src/middlewares/logger.middleware.js";
import { ApllicationError } from "./error/application-error.js";

// import apidocs from './swagger.json ' assert{type: 'json'}



// creating server
const app = express();

//cors policy configuration without using library
// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Methods', '*');
//     res.header('Access-Control-Allow-Headers', '*');
//     // Check for preflight request and respond with the appropriate headers
//     if (req.method === 'OPTIONS') {
//         res.header('Access-Control-Allow-Credentials', 'true');
//         return res.sendStatus(200);
//     }
//     next();
// });


// //using applicatiolevel error handler middleware
// app.use(errorHandler);

//cors policy configuration  using library (library name npm cors)
app.use(cors())


//use body parser for post request and write this code just after ccreating server( this is application level middleware so we write as app.use )
app.use(bodyParser.json())


// //using logger middleware 
app.use(loggerMiddleware)

//for swagger UI
app.use("/api-docs", swagger.serve, swagger.setup(apidocs))


//for all request related to product redirects to product routes
app.use("/api/products", productRoutes)
app.use("/api/users", userRoutes)
app.use("/api/cartItems", jwtAuth, cartRoutes)



//default request handler
app.get("/", (req, res) => {
    res.end("welcome to api of ecom")
})

// middleware to handle application level error . The error handling middleware should be defined after all other routes and middleware to catch errors that might occur in them.
app.use((err, req, res, next) => {
    console.error(err);
    //customer based based error
    if (err instanceof ApllicationError) {
        res.status(err.code).send(err.message)
    }
    //server error
    res.status(500).send("Something went wrong. Please try again later.");
});


//midleware to handle 404 request
app.use((req, res) => {
    return res.status(401).send("Resource not found")
})



// listening the server 
app.listen(3000, (err) => {
    if (err) {
        console.log(err)
    }
    else {
        console.log("server is running on prt number 3000")
    }
})