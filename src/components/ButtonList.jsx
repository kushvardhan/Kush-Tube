import React, { useEffect, useRef, useState } from "react";
import Button from "./Button";
import axios from "axios";
import { CATEGORY_LIST } from "../utils/constant";

const ButtonList = () => {
  const scrollRef = useRef(null);
  const [category, setCategory] = useState([]);

  const getCategoryList = async () => {
    try {
      const res = await axios.get(CATEGORY_LIST);
      setCategory(res.data.items.slice(0, 20)); // Limit to 20 categories
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getCategoryList();
  }, []);

  const handleScroll = (direction) => {
    const scrollAmount = direction === "left" ? -100 : 100;
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative bg-zinc-900 group">
      {/* Left Scroll Button */}
      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 hidden group-hover:block">
        <button 
          className="bg-zinc-800 text-white px-3 py-1 rounded-l"
          onClick={() => handleScroll("left")}
        >
          &lt;
        </button>
      </div>

      {/* Category List */}
      <div 
        ref={scrollRef} 
        className="flex overflow-hidden gap-2 whitespace-nowrap py-2 px-2 mb-3"
      >
        {category.map((item) => (
          <Button key={item.id} label={item.snippet.title} id={item.id} />
        ))}
      </div>

      {/* Right Scroll Button */}
      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 hidden group-hover:block">
        <button 
          className="bg-zinc-800 text-white px-3 py-1 rounded-r"
          onClick={() => handleScroll("right")}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default ButtonList;
