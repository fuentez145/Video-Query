'use server';

export const YoutubeData =  async (url: string) => {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);

    const videoId =  match?  match[1] : null;
    console.log(videoId);
    console.log(process.env.YOUTUBE_API_KEY);
    if (!videoId) {
        throw new Error('Invalid YouTube URL');
    }
    const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${process.env.YOUTUBE_API_KEY}`);
    const data = await response.json();
    // console.log(data.items[0]);
    return data.items[0];
}
