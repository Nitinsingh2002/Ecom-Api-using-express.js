import UserModel from "../features/user/user.model.js";

function BasicAuth(req, res, next) {
    // Check if authorization header is empty 
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
        return res.status(401).send("No authorization detail found");
    }

    // Extract credentials from header
    const base64credentials = authHeader.replace('Basic ', '');
    console.log(base64credentials);

    // Decode credentials
    const decodedCred = Buffer.from(base64credentials, 'base64').toString('utf-8');
    console.log(decodedCred); // Should output something like 'userEmail:password'

    const creds = decodedCred.split(":");

    const user = UserModel.getAll().find((u) => u.email === creds[0] && u.password === creds[1]);

    if (user) {
        next();
    } else {
        return res.status(401).send("Unauthorized");
    }
}

export default BasicAuth;


// this is basic auth but using jwt is more secure as compare to basic auth