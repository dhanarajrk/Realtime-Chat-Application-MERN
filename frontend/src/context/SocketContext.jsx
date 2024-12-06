import { createContext, useContext, useEffect, useState } from "react";
import io from 'socket.io-client'; //socket.io-client pkg is used for frontend connection
import { useAuthContext } from "./AuthContext";

export const SocketContext = createContext();

export const useSocketContext = () =>{
   return useContext(SocketContext);
}

export const SocketContextProvider = ({children}) =>{
    const [socket, setSocket]= useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);

    const {authUser} = useAuthContext();

    useEffect(() => {
        if(authUser){           //io("Backend url")
            const socket = io("http://localhost:5000", {
                query:{
                    userId: authUser._id      //to put authenticated userId inside socket so that we can use it in socket.js to view online user status
                }
            }); 
            
            setSocket(socket);

            //listend to events broadcasted by io.emit from backend (socket.js), passed as users and then we can now setOnlineUsers
            socket.on("getOnlineUsers", (users) => {
                setOnlineUsers(users);
                console.log(onlineUsers);
            })

            return () => socket.close()//OR for performance reason, we could close the socket connection when component is unmounted
          } else{
            if(socket){       //If not authUser, then close/clear the socket
                socket.close();
                setSocket(null);
            }
        } 
    },[authUser]);

    return <SocketContext.Provider value={{socket, onlineUsers}}>
        {children}
    </SocketContext.Provider>
}

