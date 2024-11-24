import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    senderId:{
        type: mongoose.Schema.Types.ObjectId,   //sender id is of type ObjectId from MongoDB
        ref: "User",      //The name you use in ref: "User" must match the model name you specified when defining the referenced model using Mongoose. eg. const User = mongoose.model("User", userSchema);
        required: true,
    },
    receiverId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    message:{
        type: String,
        required: true,
    }
}, {timestamps: true});  //to include createdAt, UpdateAt timestamps

const Message = mongoose.model("Message", messageSchema);

export default Message; 