import React, { useState } from 'react'
import useConversation from '../zustand/useConversation';
import { toast } from 'react-hot-toast';

const useSendMessage = () => {
    const [loading, setLoading] = useState(false);
    const {messages, setMessages, selectedConversation} = useConversation();

    const sendMessage = async(message) =>{   //message text is passed as message
        setLoading(true);
        try{ 
            const res = await fetch(`/api/messages/send/${selectedConversation._id}`,{  //we use backtick ` ` so that we can send to ${selectedConversation._id} ie, selected id instead of :id
                method: "POST",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify({message})
            })
            const data = await res.json();
            if(data.error){
                throw new Error(data.error);
            }
            //if there is no data error, update messages state of zustand with latest message data
            setMessages([...messages, data]);
        }
        catch(error){
            toast.error(error.message);
        }
        finally{
            setLoading(false);
        }
    }

    return { sendMessage, loading };
    
}

export default useSendMessage