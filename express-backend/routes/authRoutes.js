const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const rateLimiter = require("express-rate-limit");

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/;

const createAccessToken = (user) => {
    return jwt.sign({id:user._id}, process.env.JWT_ACCESS_SECRET, {
        expiresIn: "15m"
    });
};

const createRefreshToken = (user) => {
    return jwt.sign({id:user._id}, process.env.JWT_REFRESH_SECRET, {
        expiresIn: "7d"
    });
};

const authLimiter = rateLimiter({
    windowMs: 15*60*1000,
    max:5,
    message: "Too many attempts, try again later"
});

router.post("/register", authLimiter, async(req, res) => {
    const {username, email, password} = req.body;
    const userExists = await User.findOne({email});
    
    if(userExists) return res.status(400).json({message: "User already exists"});

    //if(!passwordRegex.test(password)) return res.status(400).json({message: "Password has to have minimum 12 characters, at least 1 upper and lower case, special sign and 1 number"});

    const user = await User.create({ username, email, password});
    const accessToken = createAccessToken(user);
    const refreshToken = createRefreshToken(user);

    user.refreshToken = refreshToken;

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
        maxAge: 7*24*60*1000
    });
    res.status(201).json({accessToken, user: {
        id:user._id, username:user.username, email:user.email }});
});

router.post("/login", authLimiter, async(req,res) => {
    const {identifier, password} = req.body;

    const user = await User.findOne({
        $or: [
            {username: identifier},
            {email: identifier}
        ]
    });
    
    if(!user || !(await user.comparePassword(password))){
        return res.status(401).json({
            message: "Invalid credentials"
        });
    }
    const accessToken = createAccessToken(user);
    const refreshToken = createRefreshToken(user);

    user.refreshToken = refreshToken;
    await user.save();

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
        maxAge: 7*24*60*1000
    });

    res.status(200).json({accessToken, user: {
        id:user._id, username:user.username, email:user.email }});
});

router.post("/refresh", async(req,res) => {
    const cookies = req.cookies;
    if(!cookies?.refreshToken) return res.status(401).json({message: "No refresh token"});

    const refreshToken = cookies.refreshToken;
    const user = await User.findOne({refreshToken});
    if(!user) return res.status(403).json({message: "Forbidden"});

    jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err,decoded)=> {
        if(err || user._id.toString() !== decoded.id) return res.status(403).json({message:"Forbidden"});
        const accessToken = createAccessToken(user);
        return res.json({accessToken});
    });
});

router.get("/logout", async(req, res) => { 
    res.clearCookie("refreshToken", {
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production"
    });
    res.status(200).json({message: "Logged out"});
});

module.exports = router;

