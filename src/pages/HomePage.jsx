import { Link } from "react-router-dom";

export default function(){
    return(<>
        <section>
            <div className="flex justify-center py-10">
                <div className="flex flex-col items-center gap-y-3">
                    <h1>Welcome to my blog!</h1>
                    <Link to={"/posts"} className="p-3 bg-sky-500 rounded-md text-white">See all posts!</Link>
                </div>
            </div>
        </section>
    </>)
}