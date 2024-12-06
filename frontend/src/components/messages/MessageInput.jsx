import React, { useState } from 'react'
import { BsSend } from "react-icons/bs";
import useSendMessage from '../../hooks/useSendMessage';

const MessageInput = () => {
  const [message, setMessage] = useState(""); //to store whatever message typed in message input field
  const { sendMessage, loading } = useSendMessage();

  const handleSubmit = async(e) =>{
    e.preventDefault();
    if(!message) return //if user doesn't type any message then dont run this function
    await sendMessage(message); //else if user typed message then run sendMessage function with passing message data
    setMessage(""); //after sending clear the message state for typing future message
  }

  return (
    <form className='px-4 my-3' onSubmit={handleSubmit}>
        <div className='w-full relative'>
            <input type='text' className='border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white' placeholder='Type a message'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            />
            <button type='submit' className='absolute inset-y-0 end-0 flex items-center pe-3'> 
              {loading? <span className='loading loading-spinner'></span> : <BsSend />} </button>
        </div>
    </form>
  )
}

export default MessageInput