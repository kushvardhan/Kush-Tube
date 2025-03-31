import React, { useRef } from "react";
import Button from "./Button";

const ButtonList = () => {
  const scrollRef = useRef(null);

  const handleScroll = (direction) => {
    const scrollAmount = direction === "left" ? -100 : 100; // Change this value to adjust scroll distance
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative bg-zinc-900 group"> {/* Added group class to the main div */}
      {/* Scroll buttons with hidden default state */}
      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 hidden group-hover:block">
        <button 
          className="bg-zinc-800 text-white px-3 py-1 rounded-l"
          onClick={() => handleScroll("left")}
        >
          &lt; {/* Left arrow for scrolling left */}
        </button>
      </div>
      <div 
        ref={scrollRef} 
        className="flex overflow-hidden gap-4 whitespace-nowrap py-2 px-2 mb-3"
      >
        <Button label="All" />
        <Button label="Music" />
        <Button label="News" />
        <Button label="Sports" />
        <Button label="Gaming" />
        <Button label="Anime" />
        <Button label="Hip-Hop" />
        <Button label="Psychology" />
        <Button label="Books" />
        <Button label="MMA" />
        <Button label="Fighting" />
        <Button label="Gym" />
        <Button label="Finance" />
        <Button label="Coding" />
      </div>
      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 hidden group-hover:block">
        <button 
          className="bg-zinc-800 text-white px-3 py-1 rounded-r"
          onClick={() => handleScroll("right")}
        >
          &gt; {/* Right arrow for scrolling right */}
        </button>
      </div>
    </div>
  );
};

export default ButtonList;
