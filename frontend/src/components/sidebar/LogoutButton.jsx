import React from 'react'
import { BiLogOut } from "react-icons/bi";
import useLogout from '../../hooks/useLogout';


const LogoutButton = () => {

  const {logout} = useLogout(); //import logout function from useLogout() hook to use in logout button

  return (
    <div className='mt-auto'>
        <BiLogOut className='w-6 h-6 text-white cursor-pointer' onClick={logout}/>
    </div>
  )
}

export default LogoutButton