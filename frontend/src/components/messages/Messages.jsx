import React, { useRef, useEffect } from 'react'
import Message from './Message'
import useGetMessages from '../../hooks/useGetMessages'
import useListenMessages from '../../hooks/useListenMessages';

const Messages = () => {
  const {messages, loading} = useGetMessages();
  useListenMessages(); //run this hook to listen to new messages and update the messages state
  const messagesEndRef = useRef(null);

  
   // Scroll to the bottom when messages change
   useEffect(() => {
    if (!loading && messages.length > 0) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, loading]);

  return (
    <div className='px-4 flex-1 overflow-auto'>
      
        {/*map the messages as each (message) with key for each <Message/> component */}
        {!loading && messages.length>0 && messages.map((message) => (
          <Message key={message._id} message={message} />
        ))}

        {!loading && messages.length === 0 && (<p className='text-center'>Send a message to start the conversation</p>)} 

        {/* Invisible div to act as a scroll target */}
        <div ref={messagesEndRef}></div>
    </div>
  )
}

export default Messages