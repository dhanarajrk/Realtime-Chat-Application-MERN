import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const signup = async (req,res) => {
    try{
        const {fullName, username, password, confirmPassword, gender} = req.body;

        //password confirmation
        if(password !== confirmPassword) {
            return res.status(400).json({error: "Password don't match"});
        }

        //unique username verification
        const user = await User.findOne({username});
        if(user){
            return res.status(400).json({error:"Username already exists"});
        }

        //HASH Password
        const salt = await bcrypt.genSalt(10); //generate salt of value 10. More salt means more security but slows down loading
        const hashedPassword = await bcrypt.hash(password, salt);

        //Profile Pic API for male & female: https://avatar.iran.liara.run/public/boy?username=Scoot+Williams
        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`

        const newUser = new User({
            fullName: fullName,   // fetch from req body and store in fullName variable when creating a newUser. We can just write as fullName only since they have same variable name
            username: username,
            password: hashedPassword,
            gender: gender,
            profilePic: gender == "male" ? boyProfilePic : girlProfilePic
        });

        //Only if there is newUser created then save the database and displace status
      if(newUser){
        //generate JWT token here
        generateTokenAndSetCookie(newUser._id, res);
        await newUser.save();

         res.status(201).json({
            _id: newUser._id,
            fullName: newUser.fullName,
            username: newUser.username,
            profilePic: newUser.profilePic
        });
       }else{
            return res.status(400).json({error: "Invalid user data"});
       }

    }
    catch(error){
        console.log("Sign Up Error", error.message);
        res.status(500).json({error:"Internal Server Error"});

    }
};

export const login = async (req,res) => {
    try{
        const {username, password} = req.body;

        const user = await User.findOne({username});
        if(!user){
           return res.status(400).json({error: "Username not found"});
        }

        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");  //return true value if password == user.password  However, if user.password is null (user?.password) then it compares with empty string "" so that it won't return false
        if(!isPasswordCorrect){
            return res.status(400).json({error: "Invalid password"});
        }

        //After credentials is matched, generate token & Cookies and display info.
        generateTokenAndSetCookie(user._id, res);

        res.status(201).json({
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            profilePic: user.profilePic
        });
    }

    catch(error){
        return res.status(500).json({error: "Failed to login"});
    }

};

export const logout = (req,res) => {
    try{
        //clear out cookies
        res.cookie("jwt","",{maxAge: 0});
        res.status(401).json({console: "Logged out successfully"});
    }
    catch(error){
        console.log("Error in logout controller", error.message);
        res.status(500).json({error: ""})
    }
}