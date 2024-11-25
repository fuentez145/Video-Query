"use client";

import React, { useState , useEffect } from 'react';
import MediaPlayer from "./MediaPlayer";
import { Textarea } from "@/components/ui/textarea";


const HandlerPlay = () => {
    const [textareaValue, setTextareaValue] = useState<string>('');
    const [urls, setUrls] = useState<string[]>([]);

  
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    
    setTextareaValue(event.target.value);
  };

  useEffect(() => {
    const urlArray = textareaValue
      .split("\n")
      .map((url) => url.trim())
      .filter((url) => url);
    setUrls(urlArray);
  }, [textareaValue]);
  
//   console.log(urls);
  return (
    <>
      <div className="inline">
        <MediaPlayer
        current_urls={urls}
        set_current_urls={setUrls}
        set_current_values={setTextareaValue}
        />
      </div>
      <Textarea
        value={textareaValue}
        rows={10} 
      onChange={handleChange} className="w-100" />
    </>
  );
};

export default HandlerPlay;
