import axios from 'axios';
import React, { useEffect } from 'react';
import { YOUTUBE_VIDEO_API } from '../utils/constant';

const VideoContainer=()=>{

    const getVideoData = async()=>{
        try{
            console.log("hihef");
            console.log("env data : "+ YOUTUBE_VIDEO_API);
            const res = await axios.get(YOUTUBE_VIDEO_API);
            console.log(res);
        }catch(err){
            console.log(err.message);
        }
    }

    useEffect(()=>{
        getVideoData();
    },[])
    return(
        <>
        <div className="w-full h-screen bg-neutral-700 px-3 py-2 flex flex-wrap  justify-between">
            <Card></Card>
        </div>
        </>
    )
}

const Card = () => {
    return (
      <div className='w-[23vw] h-[30vh] bg-blue-700 p-2 rounded-md'>
          <h1>Card</h1>
      </div>
    )
  }

export default VideoContainer;