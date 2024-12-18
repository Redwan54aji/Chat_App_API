const JWT = require('jsonwebtoken')
const {User}=require('../models/User.model')
const protectRoute =async (req, res, next) => {
    try {
        const  token=req.cookies.JWT
        if(!token){
            return res.status(401).json({error:"Unauthorized - No Token Provided"})
        }
        const decoded=JWT.verify(token,process.env.JWT_SCRIPT)
        if(!decoded){
            return res.status(401).json({
                error: "Unauthorized - Invalid Token Provided"
            })
        }
        const user=await User.findById(decoded.userId).select('-password')
        if(!user){
            return res.status(404).json({
                error: "User Not Found"
            })
        }
        req.user=user;
        next()
    } catch (error) {
        console.log("error in protectRoute Middleware", error.message);
        res.status(500).json({
            error: "Internal Srver error"
        })
    }
}

module.exports = {
    protectRoute
};