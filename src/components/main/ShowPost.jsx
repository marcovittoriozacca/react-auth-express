import { handleFallbackImage, getPostImage } from '../../../utils.js';

export default function({title, slug, content, image, published, tags, category}){
    const baseUrl = import.meta.env.VITE_SERVER_BASE_URL;

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
                {category?.name}
            </div>

        </div>
    )
}