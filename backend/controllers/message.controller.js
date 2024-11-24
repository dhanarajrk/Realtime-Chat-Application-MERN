import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const sendMessage = async (req, res) =>{
    try{
        const { message } = req.body;
        const { id:receiverId } = req.params;
        const senderId = req.user._id; //req.user._id will not work if we haven't set it in request. So we create protectRoutes as authorization function to use before sendMessage in messages.routes.js

        let conversation = await Conversation.findOne({
            participants:{ $all: [senderId, receiverId]}
        });

        //check if their conversation is first time. If yes then create one
        if(!conversation){
            conversation = await Conversation.create({
                participants: [senderId, receiverId],
            });
        }

        //then we create new message model for the messages coming from the user
        const newMessage = new Message({
            senderId: senderId,
            receiverId: receiverId,
            message: message
        });

        //if newMessage is created successfuly, then push that newMessage._id into conversation.messages to store the message id
        if(newMessage){
            conversation.messages.push(newMessage._id);
        }
        //save the conversation and message
        await conversation.save();
        await newMessage.save();

        res.status(201).json(newMessage);

    }

    catch(error){
        console.log("Failed Sending Message", error.message);
        res.status(500).json({error:"Internal Error in Message Controller"});
    }
};

export const getMessage = async (req, res) =>{
    try{

        const senderId = req.user._id;
        const {id: receiverId} = req.params;

        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        }).populate("messages");                          // .populate("messages") is used to return Objects inside each id. That means it will not only return messages id but it will return contents of each message id

        if(!conversation) return res.status(200).json([]); //if there is no conversation between them, just return empty object

        res.status(200).json(conversation.messages); //print all the contents of each messages id (which is made possible by .populate("messages") otherwise it will return messages' id only)
    }

    catch(error){
        console.log("Failed Sending Message", error.message);
        res.status(500).json({error:"Internal Error in Message Controller"});
    }
 
};