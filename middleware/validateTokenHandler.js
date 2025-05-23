const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken"); 

const validateTokenHandler = asyncHandler(async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            // Get token from header                    
            token = req.headers.authorization.split(" ")[1];
            // Verify token     
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log('Decoded', decoded);
            req.user = decoded.User;        
            next();
        } catch (error) {
            console.error(error);
            res.status(401);
            throw new Error("Not authorized, token failed");
        }   
    }else{
        res.status(401);
        throw new Error("Not authorized, no token");
    }   
});
module.exports = {validateTokenHandler};
