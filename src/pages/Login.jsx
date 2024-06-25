import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";
import { IoEye as ShowPassword, IoEyeOff as HidePassword  } from "react-icons/io5";
import { MultiError, SingleError } from "../components/main/ErrorHandlers";
import axios from "axios";

export default function(){
    const navigate = useNavigate();
    const { isLoggedIn, handleLogin } = useAuth();

    const initialData = {
        email: "",
        password: "",
    };

    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState(initialData);
    const [errors, setErrors] = useState([]);

    const handleSubmit = async (e) => {
        const loginUrl = import.meta.env.VITE_SERVER_LOGIN;
        e.preventDefault();
        
        try{
            const response = await axios.post(`${loginUrl}`, formData);
            const token = response.data.token;
            const username = response.data.user.name;

            handleLogin({"token": token, "name": username});
            return navigate("/posts");

        }catch(err){
            setErrors(err.response.data.errors || err.response.data.error)
        }

    }

    const handleFormData = (e) => {
        setFormData(curr => ({...curr, [e.target.name]: e.target.value}))
    }

    
    return(<>
        {isLoggedIn === true? 
            <Navigate to={"/posts"}/> 
            : 
            <section className="container mx-auto">
                <div>
                    <form action="" onSubmit={handleSubmit} className="bg-slate-300 p-10 rounded-md flex flex-col gap-y-3 items-center w-min mx-auto">
                        <div className="mb-3">
                            <label>
                                Email
                                <div>
                                    <input type="text" name="email" id="email" className="pr-10" value={formData.email} onChange={handleFormData}/>
                                </div>
                            </label>
                            <MultiError field={"email"} array={errors}/>
                        </div>

                        <div className="mb-3">
                            <label>
                                Password
                                <div className="relative bg-rose-100">
                                    <input className="pr-10" type={showPassword? "text" : "password" } name="password" id="password" value={formData.password} onChange={handleFormData}/>
                                    <div className="absolute top-1/2 -translate-y-1/2 right-3 cursor-pointer" onClick={() => setShowPassword(curr => !curr)}>
                                        {showPassword === false? <ShowPassword/> : <HidePassword/>}
                                    </div>
                                </div>
                                <MultiError field={"password"} array={errors}/>
                            </label>
                        </div>
                        <SingleError error={errors}/>
                        <button type="submit" className="bg-sky-400 w-full py-3 rounded-md">Login</button>
                    </form>
                </div>
                <div className=" text-end">
                    <Link to={"/register"} className="px-2 py-3">Dont have an account? Register here!</Link>
                </div>

            </section>
        }
        
    </>)

}