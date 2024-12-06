import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export const useAuthContext = () =>{
    return useContext(AuthContext);
}

export const AuthContextProvider = ({children}) =>{
    const [authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem("chat-user")) || null);  //if data is found is local storage, update authUser else set it to null

    return <AuthContext.Provider value={{authUser, setAuthUser}}>
            {children}
           </AuthContext.Provider>
}