import { handleFallbackImage, getPostImage } from '../../../utils.js';
import { useAuth } from '../../contexts/AuthContext.jsx';
import { MdDelete as DeleteIcon } from "react-icons/md";
import { useGlobal } from '../../contexts/GlobalContext.jsx';
import { Link } from 'react-router-dom';

export default function({title, slug, content, image, published, tags, category}){
    const { user } = useAuth();
    const { handlePostDelete } = useGlobal();

    return(
        <div className='container mx-auto'>
            <div className='flex items-center gap-x-3 mb-3'>
                <h1 className='font-bold text-2xl'>{title}</h1>
                <span className={published? "published" : "notPublishedYet"}>{published? "Published" : "Not Published Yet"}</span>
            </div>
            <figure className='rounded-md md:w-2/3'>
                <img className='rounded-md w-full h-auto' src={image? getPostImage(image) : ""} alt={slug} onError={handleFallbackImage}/>
            </figure>
            <p className='py-2 text-slate-600'>{content}</p>
            <div>
                {tags?.map((tag) => (
                    <span key={`show-post-tag-${tag.id}`}>{tag.name}</span>
                ))}
            </div>
            <div>
                {category}
            </div>
            {user && <DeleteIcon onClick={() => handlePostDelete(slug)}/>}
            {user && <Link to={`/posts/edit-post/${slug}`}>Edit this post</Link>}
        </div>
    )
}