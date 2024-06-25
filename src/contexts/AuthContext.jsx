import { createContext, useContext, useEffect, useState } from "react";
import useStorage from "../hooks/useStorage";

const AuthContext = createContext();

const AuthProvider = ({children}) => {

    const [user, setUser] = useStorage(null, "user");

    const handleLogin = (data) => {

        setUser(data);
    };
    
    const handleLogout = () => {
        // setIsLoggedIn(false)
        setUser(null);
        localStorage.removeItem("user");
    };
    
    const values = {
        user,
        handleLogin,
        handleLogout
    }
    
    return(
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    )
}

const useAuth = () => {
    return useContext(AuthContext);
}


export{
    AuthProvider,
    useAuth,
}