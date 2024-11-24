import jwt from "jsonwebtoken";
import User from "../backend/models/user.model.js";

const protectRoute = async (req, res, next) =>{
    try{
       const token = req.cookies.jwt;  //to be able to get cookies, we have to add cookieParser() from 'cookie-parser' in the server.js 
       if(!token){
        return res.status(401).json({error: "Unauthorized - No Token Provided"});
       }

       const decoded = jwt.verify(token, process.env.JWT_SECRET); //decode or verify signed-in user's token using JWT_SECRET key
       if(!decoded){
        return res.status(401).json({error: "Unauthorized - Invalid Token"});
       }

       const user = await User.findById(decoded.userId).select("-password");  //it is called userId because we named it in the jwt.sign token. And .select("-password") is return user without password
       if(!user){
        return res.status(404).json({error: "User not found!"});
       }

       req.user = user; //After token is verfied and user is found valid. we put the specific user in req.user to get _id in message controller

       next(); //This will execute whatever function comes next or after protectRoutes. In our case it will run sendMessage as specified in message Routing
    }

    catch(error){
        console.log("Error in protectRoute middleware", error.message);
        res.status(500).json({error:"Internal Server Error"});
    }
};

export default protectRoute;