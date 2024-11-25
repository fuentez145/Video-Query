'use client';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { YoutubeData } from '@/lib/info';
const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });

const MediaPlayer = ({
  current_urls,
  set_current_urls,
  title,
  set_current_values,
} : {
  current_urls?: string[],
  set_current_urls?: (urls: string[]) => void,
  title?: string,
  set_current_values?: (values: string) => void,
}) => {
  const [playingUrl, setPlayingUrl] = useState<string | null>(null);
  const [videoTitle, setVideoTitle] = useState<string>('');

  useEffect(()  => {
    if (current_urls && current_urls.length > 0) {
      if (!playingUrl || !current_urls.includes(playingUrl)) {
        setPlayingUrl(current_urls[0]);
      }
    }

    const getData = async () => {
      if (playingUrl) { // Ensure playingUrl is not null
        const data = await YoutubeData(playingUrl);
        if (data ) {
          console.log(data.snippet.title);
          setVideoTitle(data.snippet.title);
        }
      }
    }
    getData();

  }, [current_urls, playingUrl]);

  const handleEnded = () => {
    if (current_urls && set_current_urls) {
      const index = current_urls.findIndex(url => url === playingUrl);
      if (index !== -1) {
        const updatedUrls = [...current_urls];
        updatedUrls.splice(index, 1);
        set_current_urls(updatedUrls);
        if (set_current_values) {
          set_current_values(updatedUrls.join('\n'));
        }
        setPlayingUrl(updatedUrls.length > 0 ? updatedUrls[0] : null);
      }
    }
  };

  return (
   <div>
   {
    videoTitle && (<h1>{videoTitle}</h1>  )
   }
    <div className='flex'>
      <ReactPlayer
        controls
        playing={true}
        url={playingUrl ?? ''}
        onEnded={handleEnded}
      />
    </div>
   </div>
  );
};

export default MediaPlayer;