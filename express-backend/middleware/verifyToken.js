const jwt = require("jsonwebtoken");
const User = require("../models/User");

export const protect = async(req,res,next) => {
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        try{
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
        }catch(err){
            return res.status(401).json({message: "Not authorized, invalid token"});
        }
        if(!token){
            return res.status(401).json({message: "Not authorized, no token"});
        }
    }
};