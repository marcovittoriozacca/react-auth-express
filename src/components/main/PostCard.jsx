import { Link } from 'react-router-dom';
import { handleFallbackImage, getPostImage } from '../../../utils.js';

export default function({title, slug, content, image, published, tags, category}){

    return(
        <li className='mb-10'>
            <div>
                <div className='mb-3 flex items-center gap-x-4'>
                    <Link to={`/posts/${slug}`}>
                        {title}
                    </Link>
                    <span className={published? "published" : "notPublishedYet"}>{published === true? "Published" : "Not Published Yet"}</span>
                </div>
                <div className='flex items-start gap-x-3'>

                    <figure className=' w-64 rounded-md overflow-hidden'>
                        <img src={image? getPostImage(image) : ""} alt={slug} onError={handleFallbackImage}/>
                    </figure>

                    <div>
                        <p>{content}</p>
                        
                        <div className='flex items-center gap-x-3 mb-3'>
                            {tags.map(tag => (
                                <Link to={`/posts/tag/${tag.id}`} key={`post-tag-${tag.id}`} className='p-2 bg-sky-200 rounded-lg'>{tag.name}</Link>
                            ))}
                        </div>
                        
                        {category !== null && <span className='bg-slate-300 p-3'>{category}</span>}
                    </div>

                </div>
                
            </div>
        </li>
    )
}