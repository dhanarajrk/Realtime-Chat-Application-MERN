import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema({
    participants: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}], //participants must be in array ref to User model
    messages: [{type: mongoose.Schema.Types.ObjectId, ref: "Message", default: [] }] //message must also within array so that we can use .push() function // default[] to push messages
}, {timestamps: true});

const Conversation = mongoose.model("Conversation", conversationSchema);

export default Conversation;