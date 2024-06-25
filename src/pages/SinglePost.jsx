import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import axios from "axios";
import ShowPost from "../components/main/ShowPost";

export default function(){
    const postsUrl = import.meta.env.VITE_SERVER_POSTS;
    const { slug } = useParams();
    
    const [foundStatus, setFoundStatus] = useState(false);
    const [post, setPost] = useState([]);

    const getSinglePost  = async () => {

        try{
            const response = await axios.get(`${postsUrl}/${slug}`)
            setPost(response.data.post);
            setFoundStatus(true)
        }catch(err){
            setFoundStatus(false)
        }
    }
    

    useEffect(()=> {
        getSinglePost()
    },[slug])

    return(<>
        {!foundStatus && <h1>Post Not Found</h1>}
        {post === null? 
            <h1>Loading...</h1> 
            :
            <ShowPost
                title={post.title}
                slug={post.slug}
                content={post.content}
                image={post.image}
                published={post.published? true : false}
                tags={post.tags}
                category={post.category?.name}
            />
        }
        
        
    </>)
}