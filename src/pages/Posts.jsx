import { useEffect, useState } from "react";
import axios from "axios";
import PostCard from "../components/main/PostCard";
import Navigation from "../components/main/Navigation";
import { useSearchParams } from "react-router-dom";

export default function(){

    const postsUrl = import.meta.env.VITE_SERVER_POSTS;
    
    const [postsList, setPostsList] = useState([]);
    const [totalPages, setTotalPages] = useState(0);

    const [searchParams, setSearchParams] = useSearchParams({page: 1});

    const currPage = parseInt(searchParams.get("page")) || 1;


    const getPosts = async () => {
        try{
            const response = await axios.get(`${postsUrl}?page=${parseInt(currPage)}&limit=10`);
            const res = response.data;
            setPostsList(res.postsList);
            setTotalPages(res.totalPages);
        }catch(err){
            console.error(err);
        }
    }
    const handleNextPage = () => {
        setSearchParams({ page: (currPage >= totalPages? totalPages : currPage+ 1) });
    }
    const handlePrevPage = () => {
        setSearchParams({ page: (currPage === 1? 1 : currPage - 1) });
    }

    useEffect(()=>{
        getPosts();
    }, [currPage]);

    return(<>
    <Navigation onNext={handleNextPage} onPrev={handlePrevPage}>
        {currPage}
    </Navigation>
        <section className="container mx-auto">
            <ul>
                {postsList.length === 0 && <h1>No Posts available yet...</h1>}
                {postsList === null?
                    <h1>Loading...</h1>
                    :
                    postsList.map(post => (
                        <PostCard
                            key={`post-${post.id}`}
                            id={post.id}
                            title={post.title}
                            slug={post.slug}
                            content={post.content}
                            image={post.image}
                            published={post.published? true : false}
                            tags={post.tags}
                            category={post.category?.name}
                        />
                    ))
                }
            </ul>
        </section>
        
    </>)
}