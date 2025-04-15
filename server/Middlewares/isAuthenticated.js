// import jwt from "jsonwebtoken";

// const isAuthenticated = async(req,res,next)=>{
//     try {
//         const token = req.cookies.token;
//         //check token
//         if(!token){
//             return res.status(401).json({msg:"Please login to access this resource"});
//         }
//         //decode
//         const decoded = jwt.verify(token,process.env.JWT_SECRET);
//         if(!decoded){
//             return res.status(401).json({msg:"Token is invalid"});
//         }
//         req.id=decoded.userId;
//         next();

//     } catch (error) {
//         console.log(error);
//     }
// };

// export default isAuthenticated;

import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    // Check token
    if (!token) {
      return res.status(401).json({ msg: "Please login to access this resource" });
    }
    
    // Decode the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ msg: "Token is invalid" });
    }

    // Assign decoded user info to req.user
    req.user = { id: decoded.userId };  // Use userId from decoded token
    next();

  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server error" });
  }
};

export default isAuthenticated;
