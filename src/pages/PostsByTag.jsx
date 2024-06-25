import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios";
import PostCard from "../components/main/PostCard";

export default function(){

    const [posts, setPosts] = useState([]);
    const [tag, setTag] = useState('');

    const { id } = useParams();
    const postsUrl = import.meta.env.VITE_SERVER_POSTS;

    const getPosts = async () => {
        try{
            const response = await axios.get(`${postsUrl}/tag/${id}`);
            setPosts(response.data.posts);
            setTag(response.data.tag);
        }catch(err){
            console.error(err);
        }
    }

    useEffect(() => {
        getPosts();
    },[id])

    return(<>
    <ul>
        {posts.length === 0 && <h1>No Posts matching this id</h1>}
        {posts.length !== 0 && (<>
                <div className="bg-slate-300 py-5 px-4">
                    Posts with tag: <span className="text-green-600">{tag}</span> found: <span className="text-rose-600">{posts.length}</span>
                </div>
                {posts.map((post) => (
                    <PostCard
                    key={`postByTag-${post.id}`}
                        id={post.id}
                        title={post.title}
                        slug={post.slug}
                        content={post.content}
                        image={post.image}
                        published={post.published? true : false}
                        tags={post.tags}
                        category={post.category?.name}
                    />
                ))}

        </>
        )}
    </ul>
    </>)
}