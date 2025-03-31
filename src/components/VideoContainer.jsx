import axios from 'axios';
import React, { useEffect, useState, useRef, useCallback } from 'react';
import { YOUTUBE_VIDEO_API } from '../utils/constant';
import { Link } from 'react-router-dom';

const VideoContainer = () => {
    const [videoData, setVideoData] = useState([]);
    const [nextPageToken, setNextPageToken] = useState(null);
    const [loading, setLoading] = useState(false);
    
    const observer = useRef();

    // Fetch Videos Function
    const getVideoData = async () => {
        if (loading) return;
        setLoading(true);
        try {
            const res = await axios.get(`${YOUTUBE_VIDEO_API}&pageToken=${nextPageToken || ''}`);
            setVideoData((prev) => [...prev, ...res.data.items]); // Append new data
            setNextPageToken(res.data.nextPageToken || null); // Save next page token
        } catch (err) {
            console.error(err.message);
        }
        setLoading(false);
    };

    useEffect(() => {
        getVideoData(); // Initial Fetch
    }, []);

    // Infinite Scroll Observer
    const lastVideoRef = useCallback((node) => {
        if (loading) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && nextPageToken) {
                getVideoData();
            }
        });
        if (node) observer.current.observe(node);
    }, [loading, nextPageToken]);

    return (
        <>
        <div className="w-full px-3 py-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4">
            {videoData.map((item, index) => (
                <div ref={index === videoData.length - 1 ? lastVideoRef : null} key={item.id}>
                    <Card video={item} />
                </div>
            ))}

        </div>
        {loading && <Shimmer />}
        </>
    );
};

// 📌 Format Time Ago
const formatTimeAgo = (dateString) => {
    const seconds = Math.floor((new Date() - new Date(dateString)) / 1000);
    const intervals = { year: 31536000, month: 2592000, day: 86400, hour: 3600, minute: 60 };
    for (let key in intervals) {
        const interval = Math.floor(seconds / intervals[key]);
        if (interval >= 1) return `${interval} ${key}${interval > 1 ? 's' : ''} ago`;
    }
    return 'Just now';
};

// 📌 Format Views Count
const formatViews = (views) => {
    if (views >= 1_000_000_000) return (views / 1_000_000_000).toFixed(1) + "B";
    if (views >= 1_000_000) return (views / 1_000_000).toFixed(1) + "M";
    if (views >= 1_000) return (views / 1_000).toFixed(1) + "K";
    return views;
};

// 📌 Video Card Component
const Card = ({ video }) => {
    return (
        <Link 
            to={`https://www.youtube.com/watch?v=${video.id}`} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="w-full max-w-[350px] max-h-[220px] bg-neutral-950 rounded-lg shadow-lg overflow-hidden text-gray-300"
        >
            <div className="w-full h-[60%] aspect-video">
                <img src={video.snippet.thumbnails.medium.url} alt={video.snippet.title} className="w-full h-full object-cover"/>
            </div>
            <div className="flex p-3 w-full h-[40%] items-center">
                <img src={"https://4kwallpapers.com/images/wallpapers/kanye-west-5k-blue-3840x2160-15452.jpg"} alt={video.snippet.channelTitle} className="w-10 h-10 rounded-full mr-3"/>
                <div className="flex flex-col w-full py-1">
                    <h2 className="text-sm md:text-[1.3vw] font-semibold line-clamp-2" title={video.snippet.title}>
                        {video.snippet.title}
                    </h2>
                    <p className="text-xs md:text-[1.1vw] text-gray-400">{video.snippet.channelTitle}</p>
                    <p className="text-xs md:text-[1.2vw] text-gray-400">
                        {formatViews(parseInt(video.statistics.viewCount))} views • {formatTimeAgo(video.snippet.publishedAt)}
                    </p>
                </div>
            </div>
        </Link>
    );
};

// 📌 Shimmer Loader Component (Pure Tailwind)
const Shimmer = () => {
    return (
        <div className="w-[100%] flex flex-wrap items-center gap-4">
            {Array.from({ length: 6 }).map((_, index) => (
                <div 
                    key={index} 
                    className="w-[100%] bg-zinc-800 max-w-[250px] min-h-[200px] bg-neutral-900 rounded-lg shadow-lg overflow-hidden animate-pulse"
                >
                    {/* Thumbnail */}
                    <div className="w-full h-[60%] bg-gray-700 animate-pulse"></div>

                    {/* Video Info */}
                    <div className="flex p-3 w-full h-[40%] items-center">
                        {/* Channel Avatar */}
                        <div className="w-10 h-10 bg-gray-600 rounded-full mr-3 animate-pulse"></div>

                        {/* Video Details */}
                        <div className="flex flex-col w-full py-1">
                            <div className="w-full h-4 bg-gray-600 rounded-md mb-2 animate-pulse"></div>
                            <div className="w-3/4 h-3 bg-gray-600 rounded-md mb-2 animate-pulse"></div>
                            <div className="w-1/2 h-3 bg-gray-600 rounded-md animate-pulse"></div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default VideoContainer;
