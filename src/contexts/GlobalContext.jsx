import { createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from '../axios/axiosClient.js'
import { useAuth } from "./AuthContext.jsx";

const GlobalContext = createContext();

const GlobalProvider = ({children}) => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const handlePostDelete = async (slug) => {
        if(user){
            try{
                const response = await axiosClient.delete(`/posts/${slug}`);
                return navigate("/posts");
            }catch(err){
                throw err;
            }
        }
    }

    const values = {
        handlePostDelete,
    };

    return(
        <GlobalContext.Provider value={values}>
            {children}
        </GlobalContext.Provider>
    )

}



const useGlobal = () => {
    return useContext(GlobalContext)
}

export {
    GlobalProvider,
    useGlobal,
}