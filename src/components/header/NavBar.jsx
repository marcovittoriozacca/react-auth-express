import { NavLink, useNavigate } from "react-router-dom"
import "./NavBar.css";
import { useAuth } from "../../contexts/AuthContext";

const links = [
    {
        name: "home",
        url: "/",
    },
    {
        name: "posts",
        url: "/posts",
    },
    {
        name: "create post",
        url: "/create-post",
    }
]
export default function(){
    const navigate = useNavigate();
    const { handleLogout, user } = useAuth();

    const logout = () => {
        handleLogout();
        return navigate("/")
    }

    return(<>
        <header className=" bg-neutral-200">
            <nav className="container mx-auto py-4 flex justify-between">
                <ul className="flex items-center gap-x-5">
                    {links.map((link,index) => (
                        <li key={`navLink-${index}`}>
                            <NavLink to={link.url} className={"capitalize"}>{link.name}</NavLink>
                        </li>
                    ))}
                </ul>
                {!user &&
                    <ul className="flex items-center gap-x-5">
                        <li>
                            <NavLink to={"/login"}>Login</NavLink>
                        </li>
                        <li>
                            <NavLink to={"/register"}>Register</NavLink>
                        </li>
                    </ul>
                }
                {user && 
                    <div>
                        <details>
                            <summary>                        
                                {user.name}
                            </summary>
                            <button type="button" onClick={logout}>Logout</button>
                        </details>
                    </div>
                }
            </nav>
        </header>
    </>)
}