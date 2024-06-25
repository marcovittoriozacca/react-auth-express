
import { useEffect, useState } from "react"
import axiosClient from "../axios/axiosClient.js";
import { useNavigate, useParams } from 'react-router-dom';

export default function(){
    const navigate = useNavigate();

    const { slug } = useParams();

    const data = {
        title: '',
        image: [],
        content: '',
        published: false,
        categoryId: '',
        tags: [],
    }
    
    const [formData, setFormData] = useState(data);
    const [options, setOptions] = useState([]);
    const [tags, setTags] = useState([]);

    useEffect(()=> {
        getPostToEdit();
        getCategories();
        getTags();
    },[slug])
    
    const getPostToEdit = async () => {
        try{
            const response = await axiosClient.get(`/posts/${slug}`);
            setFormData(response.data.post);
            setFormData(curr => ({...curr, tags: curr.tags.map(t => t.id)}))
        }catch(err){
            console.error(err);
        }
    }

    const getCategories = async () => {
        try{
            const response = await axiosClient.get("/categories");
            const categories = response.data.categories
            setOptions(categories);
        }catch(err){
            console.error(err);
        }
    }

    const getTags = async () => {
        try{
            const response = await axiosClient.get("/tags");
            const tags = response.data.tags;
            setTags(tags);
        }catch(err){
            console.error(err);
        }
    }
    const handleFormDataChange = (e) => {
        switch(e.target?.type){
            case "text":
                setFormData(curr => ({...curr, [e.target.name]: e.target.value}));
                break;
            case "checkbox":
                setFormData(curr => ({...curr, [e.target.name]: e.target.checked}));
                break;
            case "file":
                setFormData(curr => ({...curr, [e.target.name]: e.target.files[0]}));
                break;
        }
    }
    const handleMultiCheckbox = (id) => {
        setFormData(curr => ({...curr, tags: (curr.tags.includes(id)? curr.tags.filter(t => t !== id) : [...curr.tags, id] )}))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try{
            const response = await axiosClient.put(`/posts/${slug}`, formData, {
                headers:{
                    "Content-Type": "multipart/form-data",
                }
            });
            const newPostslug = (response.data.updated_post.slug);
            return navigate(`/posts/${newPostslug}`);
        }catch(err){
            console.error(err);
        }
    };

    return(<>
        <section className="w-[95%] mx-auto bg-slate-300 p-5 rounded-md">
            <form action="" onSubmit={handleSubmit} >
                
                <div className="mb-3">
                    <label className="flex flex-col gap-y-1">
                        Title
                        <input placeholder="Title..." type="text" id="title" name="title" value={formData.title} onChange={handleFormDataChange}/>
                    </label>
                </div>
                
                <div className="mb-3">
                    <label className="flex flex-col gap-y-1">
                        Content
                        <textarea placeholder="Content..." name="content" id="content" rows="5" value={formData.content} onChange={(e) => setFormData(curr => ({...curr, content: e.target.value}))}></textarea>
                    </label>
                </div>
                <div className="mb-3">
                    <label className="flex flex-col gap-y-1">
                        Image
                        <input type="file" id="image" name="image" onChange={handleFormDataChange}/>
                    </label>
                </div>

                <div className="mb-3">
                    <label className="flex items-center gap-x-2">
                        Publish
                        <input type="checkbox" name="published" id="published" checked={formData?.published} onChange={handleFormDataChange}/>
                    </label>
                </div>
                
                <div className="mb-3">
                    <label className="flex flex-col gap-y-1">
                    Category
                        <select name="categoryId" id="categoryId" value={formData.categoryId} onChange={(e) => setFormData(curr => ({...curr, categoryId: parseInt(e.target.value)}))}>
                            {options?.map((category,index) => (
                                <option key={`post-categoryId${category.id}`} value={category.id}>{category.name}</option>
                            ))}
                        </select>
                    </label>
                </div>

                <div className="mb-3">
                    <ul>
                        {tags?.map((tag, index) => (
                            <li key={`tagPost-${tag.id}`}>
                                <label className="flex items-center gap-x-2">
                                    <span className="capitalize">{tag.name}</span>
                                    <input type="checkbox" name="tags" id={`tag-${tag.id}`} checked={formData.tags?.includes(tag.id)} onChange={() => handleMultiCheckbox(tag.id)}/>
                                </label>
                            </li>
                        ))}
                    </ul>
                </div>

                <button type="submit" className="p-3 bg-sky-500 text-white rounded-md hover:bg-sky-400">Edit Post</button>
            </form>
        </section>
    </>)
}