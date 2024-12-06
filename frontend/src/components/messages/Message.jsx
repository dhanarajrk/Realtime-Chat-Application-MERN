import React from 'react'
import useConversation from '../../zustand/useConversation';
import { useAuthContext } from '../../context/AuthContext';
import { convertTime } from '../../utils/convertTime';

  // passed each {message} from Messages.jsx mapping
const Message = ({message}) => {

  //How to know message is from sender or receiver
  const {authUser} = useAuthContext(); //sender(me)
  const {selectedConversation} = useConversation(); //receiver(him/her)
  const fromMe = message.senderId === authUser._id;

  const chatClassName = fromMe ? 'chat-end' : 'chat-start';  //If fromMe=true, then start chat from end(right side) and vice versa
  const profilePic = fromMe? authUser.profilePic : selectedConversation?.profilePic; //similarly for if fromMe then show authUser.profilePic and vice versa
  const bubbleMsgColor = fromMe? 'bg-blue-500' : '' ; //Similarly, chat bubble background color=blue if fromMe=true else no background color
  const formattedTime = convertTime(message.createdAt); //to convert long time to short time.

  const shakeClass = message.shouldShake ? "shake" : ""; //if message.shouldShake = true, then create a class called "shake" to use as css in chatbubble

  return (
    <div className={`chat ${chatClassName}`}>
        <div className='chat-image avatar'>
            <div className='w-10 rounded-full'>
                <img src={profilePic} alt='Tailwind Css chat bubble component' />
            </div>
        </div>

        <div className={`chat-bubble text-white ${bubbleMsgColor} ${shakeClass}`}>{message.message}</div>
        <div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>{formattedTime}</div>
    </div>
  )
}

export default Message