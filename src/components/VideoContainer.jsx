import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { YOUTUBE_VIDEO_API } from '../utils/constant';
import { Link } from 'react-router-dom';

const VideoContainer = () => {
    const [videoData, setVideoData] = useState([]);

    const getVideoData = async () => {
        try {
            const res = await axios.get(YOUTUBE_VIDEO_API);
            setVideoData(res.data.items);
        } catch (err) {
            console.error(err.message);
        }
    };

    useEffect(() => {
        getVideoData();
    }, []);

    return (
        <div className="w-full px-3 py-2 flex flex-wrap justify-around overflow-y-auto">
            {videoData.map((item) => (
                <Card key={item.id} video={item} />
            ))}
        </div>
    );
};

const formatTimeAgo = (dateString) => {
    const seconds = Math.floor((new Date() - new Date(dateString)) / 1000);
    const intervals = {
        year: 31536000,
        month: 2592000,
        day: 86400,
        hour: 3600,
        minute: 60,
    };
    for (let key in intervals) {
        const interval = Math.floor(seconds / intervals[key]);
        if (interval >= 1) return `${interval} ${key}${interval > 1 ? 's' : ''} ago`;
    }
    return 'Just now';
};

const formatViews = (views) => {
    if (views >= 1_000_000_000) return (views / 1_000_000_000).toFixed(1) + "B";
    if (views >= 1_000_000) return (views / 1_000_000).toFixed(1) + "M";
    if (views >= 1_000) return (views / 1_000).toFixed(1) + "K";
    return views;
};

const Card = ({ video }) => {
    return (
        <Link 
            to={`https://www.youtube.com/watch?v=${video.id}`} 
            target="_blank" 
            rel="noopener noreferrer" 
            className='w-[24vw] min-h-[35vh] bg-neutral-950 rounded-md mb-3 flex flex-col text-white overflow-hidden'
        >
            <img 
                src={video.snippet.thumbnails.medium.url} 
                alt={video.snippet.title} 
                className='w-full h-[60%] object-cover rounded-md' 
            />
            <div className='flex justify-center items-center mt-2 pt-1 pb-2 px-2'>
                <img 
                    src={"https://4kwallpapers.com/images/wallpapers/kanye-west-5k-blue-3840x2160-15452.jpg"} 
                    alt={video.snippet.channelTitle} 
                    className='w-9 h-9 rounded-full mr-2' 
                />
                <div className='flex flex-col w-full'>
                    <h2 
                        className='text-[1.3vw] font-semibold w-full line-clamp-2 overflow-hidden text-ellipsis'
                        title={video.snippet.title}
                    >
                        {video.snippet.title}
                    </h2>
                    <p className='text-[1.1vw] text-gray-400'>{video.snippet.channelTitle}</p>
                    <p className='text-[1.2vw] text-gray-400'>
                        {formatViews(parseInt(video.statistics.viewCount))} views • {formatTimeAgo(video.snippet.publishedAt)}
                    </p>
                </div>
            </div>
        </Link>
    );
};

export default VideoContainer;
