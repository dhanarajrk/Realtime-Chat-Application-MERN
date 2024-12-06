import React, { useEffect } from 'react'
import { useSocketContext } from '../context/SocketContext'
import useConversation from '../zustand/useConversation';
import notificationSound from '../assets/sounds/notification_sound.mp3'

const useListenMessages = () => {
  const {socket} = useSocketContext();
  const {messages, setMessages} = useConversation();

  useEffect(()=> {

    socket?.on("newMessage", (newMessage)=>{   //Listen to "newMessage" event
        newMessage.shouldShake = true;         //shouldShake property is added for incoming/new message
        const sound = new Audio(notificationSound);
        sound.play();
        setMessages([...messages, newMessage])    
    })

    return () => socket?.off("newMessage");       //After unmount, turn off listening of "newMessage" event

  },[socket,messages,setMessages]);
}

export default useListenMessages