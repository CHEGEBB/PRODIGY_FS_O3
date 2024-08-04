import jwt from 'jsonwebtoken';
import User from '../models/auth.model.js';

const protectRoute = async (req,res,next) => {
    try {
        const token = req.cookies.jwt;
        if(!token){
            return res.status(401).json({message: "unauthorized access"});
        }
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        
        if(!decoded){
            return res.status(401).json({message: "unauthorized token"});
        }

        const user = await User.findById(decoded.id).select('-password');

        if(!user){
            return res.status(404).json({message: "user not found"});
        }

        req.user = user;
        next();
        
    } catch (error) {
        res.status(500).json({message: "internal server error", error: error.message});
    }
}

export default protectRoute;