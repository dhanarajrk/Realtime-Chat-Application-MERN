import React, { useState } from 'react'
import { IoSearchSharp } from "react-icons/io5";
import useConversation from '../../zustand/useConversation';
import useGetConversation from '../../hooks/useGetConversation';
import toast from 'react-hot-toast';

const SearchInput = () => {
  const [search, setSearch] = useState(""); //to store from search input
  const { setSelectedConversation } = useConversation();
  const { conversations } = useGetConversation(); //to get all the users in conversations

  const handleSubmit = (e) =>{
    e.preventDefault();
    if(!search) return;
    if(search.length<3){
      return toast.error('Atleast 3 characters is required to search');
    }

    const conversation = conversations.find((c) => c.fullName.toLowerCase().includes(search.toLowerCase())); //search algorithm to find matching user among conversations (comparision in lower case)

    if(conversation){
      setSelectedConversation(conversation); //if conversation matching name is found, setSelectedConversation as its value
      setSearch(""); 
    } else toast.error('No such user found!')
  }

  return (
    <form onSubmit={handleSubmit} className='flex items-center gap-2' >
        <input type='text' placeholder='Search...' className='input input-bordered rounded-full' 
         value={search}
         onChange={(e) => setSearch(e.target.value)}/>
        <button type='submit' className='btn btn-circle bg-sky-500 text-white'>
         <IoSearchSharp className='w-6 h-6 outline-none' />
        </button>
        
    </form>
  )
}

export default SearchInput