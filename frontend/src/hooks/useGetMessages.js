import React, { useEffect, useState } from 'react'
import useConversation from '../zustand/useConversation';
import { toast } from 'react-hot-toast';

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const {messages, setMessages, selectedConversation} = useConversation();

  //useEffect to run this function immediately whenever [selectedConversation._id] changes:
  useEffect(()=> {
    const getMessages = async() =>{
        setLoading(true);
        try{
            const res = await fetch (`/api/messages/${selectedConversation._id}`); //GET method so we dont need any options
            const data = await res.json();
            if(data.error){
                throw new Error(data.error);
            }
            setMessages(data);
        }
        catch(error){
            toast.error(error.message);
        }
        finally{
            setLoading(false);
        }
    }

    if(selectedConversation?._id) getMessages(); //we run getMessages() only if a conversation is selected (ie. not null)

  }, [selectedConversation?._id]) //whenever this reference changes, useEffect immediately runs again.

  return { loading, messages}
}

export default useGetMessages