export const cleanYoutubeUrl = (url:string) => {
    const videoId = url.match(/(?:youtube\.com\/(?:[^\/\n\s]+\/\s*(?:\w*\/)*|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    return videoId ? `https://www.youtube.com/embed/${videoId[1]}` : url
}