import { Server } from 'socket.io';
import http from 'http';
import express from 'express';

const app = express(); //instead of using this line in server.js, we just export {app} and import it in server.js

//create socket io server on top of express server
const server = http.createServer(app);
const io = new Server(server, {
    cors:{
        origin: ["http://localhost:3000"], //Frontend URL
        method: ["GET","POST"]
    }
});

export const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId];                //this will return socketId for the receiverId(userId)
};

const userSocketMap = {} // {userId: socketId}

                                                  //io.on('connection', ) for log in
io.on('connection', (socket)=>{                  //socket stores information of logged in user
    console.log("A new Socket connection established! SocketID: ", socket.id);

    const userId = socket.handshake.query.userId; //got it from frontend socket setup in SocketContext.jsx to use for user online status
    if(userId != "undefined") userSocketMap[userId] = socket.id;   /*if not "undefined", then create a dynamic property of userId inside userSocketMap with its corresponding socket.id as key  eg. userSocketMap={"userid123": "socketid123", 
                                                                                                                                                                                                                   "userid456": "socketid456"} (Dynamic property is created using [] while fixed property is created using dot .) */

    //io.emit("Anyname", ) is used to send events to all connected clients(in this case it will send online events to all connected clients)
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on('disconnect', ()=>{                    //socket.on('disconnect', ) for logout . Actually, socket.on() is used to listen to the events. can be used both on client and server side
    console.log("A socket disconnected! SocketID:", socket.id);
    delete userSocketMap[userId]; //After disconnected, delete respective userId: socketId key from userSocketMap and rebroatcast io.emit again
    io.emit("getOnlineUsers", Object.keys(userSocketMap));  
   })

})


export { app, server, io };