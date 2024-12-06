import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';

const useSignup = () => {

  const [loading, setLoading] = useState(false);
 
  const { authUser, setAuthUser } = useAuthContext(); //we only need setAuthUser as of this file. No we can remove authUser.
  
  const signup = async({fullName, username, password, confirmPassword, gender}) => {
    const success = handleInputError({fullName, username, password, confirmPassword, gender}) //if handleInputError returns false , it will not continue.
    if(!success) return;
    //after success

    setLoading(true); //set loading to true if success
    try{
      const res = await fetch("/api/auth/signup",{
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({fullName, username, password, confirmPassword, gender})
      });

      const data = await res.json();
      if(data.error){
        throw new Error(error.message);
      }
      
      //store user in localstorage to know if logged in or not
      localStorage.setItem("chat-user", JSON.stringify(data))
      //with the context value, we can make sure the user to navigate to homepage when they are logged in
      setAuthUser(data);
    }

    catch(error){
      toast.error(error.message);
    }
    
    finally{
      setLoading(false); //after try  or error, set loading back to false again
    }
  }
  
  return { loading, signup }

}

export default useSignup


//handleInputError function:

function handleInputError({fullName, username, password, confirmPassword, gender}){
    if(!fullName || !username || !password || !confirmPassword || !gender){
        toast.error('Please fill in all the fields');
        return false;
    }

    if(password !== confirmPassword){
      toast.error('Password do not match');
      return false;
    }

    if(password.length < 6){
      toast.error('Password must be atleast 6 characters');
      return false;
    }

    console.log("Validation successful!");
    return true;
} 


