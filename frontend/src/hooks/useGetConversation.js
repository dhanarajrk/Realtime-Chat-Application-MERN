import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

const useGetConversation = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const getConversation = async() => {
        setLoading(true);
        try{
            const res = await fetch("/api/users"); //it is a GET request so we dont need any options like method, headers, body
            const data = await res.json();
            if(data.error){
                throw new Error(data.error);
            }
            setConversations(data); //after fetching data, put or set it in setConversations.
        }
        catch(error){
            toast.error(error.message);
        }
        finally{
            setLoading(false);
        }
    }
    
    getConversation(); //we need to execute it too.
  }, []);

  return {loading, conversations}

}

export default useGetConversation