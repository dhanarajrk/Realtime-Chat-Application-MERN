import User from "../models/user.model.js";


export const getUsersForSidebar = async (req,res) =>{
    try{

        const loggedInUserId = req.user._id; 

        const filteredUsers = await User.find({_id: { $ne: loggedInUserId} }).select("-password"); //we want all the users _id to display on sidebar except the loggedInUserId which is excluded using $ne=not equal to

        res.status(200).json(filteredUsers);
    }

    catch(error){
        console.log("Error in getUsersForSidebar", error.message);
        res.status(500).json({error:"Internal Error in User Controller"});
    }
};

