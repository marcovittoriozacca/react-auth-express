import fallbackImage from "/fallback-image.png";
const baseUrl = import.meta.env.VITE_SERVER_BASE_URL;

const handleFallbackImage = e => e.currentTarget.src = fallbackImage;

const getPostImage = (img) => {
    return `${baseUrl}/${img}`
}
export {
    handleFallbackImage,
    getPostImage,
}