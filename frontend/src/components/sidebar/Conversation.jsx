import React from 'react'
import useConversation from '../../zustand/useConversation';
import { useSocketContext } from '../../context/SocketContext';

const Conversation = ({conversation, lastIdx, emoji}) => {

    const { selectedConversation, setSelectedConversation} = useConversation(); //for changing selected user to blue background
    const isSelected = selectedConversation?._id === conversation._id; //for changing selected user to blue background when id matches. to deal with null object like selectedConversation "?."" chaining must be used

    const {onlineUsers} = useSocketContext();
    const isOnline = onlineUsers.includes(conversation._id) //since conversation._id is actually userId, we can compare it with onlineUsers data.

  return (
    <>
    <div className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer ${isSelected ? "bg-sky-500" : "" }`}
    onClick={() => setSelectedConversation(conversation)} //selectedConversation was null as default so when we click it we change the state and store conversation file to compare and show blue background if id matches
    >
        <div className={`avatar ${isOnline ? "online" : ""}`}>
            <div className='w-12 rounded-full'>
                <img src={conversation.profilePic} alt="user avatar" />
            </div>
        </div>

        <div className='flex flex-col flex-1'>
            <div className='flex gap-3 justify-between'>
                <p className='font-bold text-gray-200'>{conversation.fullName}</p>
                <span className='text-xl'>{emoji}</span>
            </div>
        </div>

    </div>

    {!lastIdx && <div className='divider my-0 py-0 h-1' />}
    </>
  );
};

export default Conversation