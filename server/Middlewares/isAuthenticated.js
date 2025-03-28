import jwt from "jsonwebtoken";

const isAuthenticated = async(req,res,next)=>{
    try {
        const token = req.cookies.token;
        //check token
        if(!token){
            return res.status(401).json({msg:"Please login to access this resource"});
        }
        //decode
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        if(!decoded){
            return res.status(401).json({msg:"Token is invalid"});
        }
        req.id=decoded.userId;
        next();

    } catch (error) {
        console.log(error);
    }
};

export default isAuthenticated;