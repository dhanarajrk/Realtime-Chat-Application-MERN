import React from 'react'
import Conversation from './Conversation'
import useGetConversation from '../../hooks/useGetConversation'
import { getRandomEmoji } from '../../utils/getEmojis'

const Conversations = () => {
  
  const { loading, conversations } = useGetConversation();
  //console.log("Conversations:",conversations);
  return (
    <div className='py-2 flex flex-col overflow-auto'>

      {/*We show each Coversation component here using mapping or conversations array. passing the props to Conversation.jsx component(child)*/ }
      {conversations.map((conversation, idx) =>(  
        <Conversation 
        key={conversation._id}
        conversation={conversation}
        emoji={getRandomEmoji()}
        lastIdx={idx === conversations.length-1}
        />
      ) )}

        {loading? <span className='loading loading-spinner mx-auto'></span> : null}
    </div>
  )
}

export default Conversations