import Footer from "../components/footer/Footer";
import NavBar from "../components/header/NavBar";
import { Outlet } from "react-router-dom";
export default function(){
    return(<>
        <NavBar/>
        <main className="py-5">
            <Outlet/>
        </main>
        <Footer/>
    </>)
}