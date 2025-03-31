import React, { useState } from "react";
import { AiOutlineVideoCameraAdd } from "react-icons/ai";
import { IoMdNotificationsOutline, IoMdSearch } from "react-icons/io";
import { GiEgyptianProfile } from "react-icons/gi";
import { RxHamburgerMenu } from "react-icons/rx";
import { useDispatch } from "react-redux";
import { toggleMenu } from "../utils/appSlice";
import { Link } from "react-router-dom";

const Head = () => {
  const dispatch = useDispatch();
  const [isSearchActive, setIsSearchActive] = useState(false);

  const toggleMenuHandler = () => {
    dispatch(toggleMenu());
  };

  return (
    <>
      <div className="w-full h-[10vh] bg-zinc-900 text-white px-4 sm:px-8 lg:px-10 gap-6 sm:gap-7 flex items-center justify-between">
        
        <div className="flex items-center gap-4">
          <RxHamburgerMenu
            onClick={toggleMenuHandler}
            className="text-3xl cursor-pointer"
          />
          <h1 className="text-[1.5rem] sm:text-[2rem] font-bold cursor-pointer">
            <Link></Link>
          </h1>
        </div>

        {/* Center Section - Conditional Search Icon and Search Bar */}
        <div className="flex items-center gap-2 w-[50%] justify-center">
          {/* Display the search bar on medium and larger screens */}
          <div className="hidden sm:flex w-full items-center">
            <input
              className="w-full h-[2.5rem] px-4 py-2 text-white outline-none border-zinc-400 border-[0.2px] bg-zinc-800 rounded-l-full"
              type="text"
              placeholder="Search"
            />
            <button className="h-[2.5rem] px-4 py-2 border rounded-r-full border-zinc-400">
              <IoMdSearch className="text-2xl text-zinc-300" />
            </button>
          </div>

          {/* Display only search icon on small screens */}
          <button
            className="sm:hidden p-2 border rounded-full border-zinc-400"
            onClick={() => setIsSearchActive(!isSearchActive)}
          >
            <IoMdSearch className="text-2xl text-zinc-300" />
          </button>
        </div>

        {/* Right Section - Icons (Some icons hidden on smaller screens) */}
        <div className="flex items-center gap-4 sm:gap-6">
          <AiOutlineVideoCameraAdd className="text-2xl sm:text-3xl hidden sm:block" />
          <IoMdNotificationsOutline className="text-2xl sm:text-3xl hidden sm:block" />
          <GiEgyptianProfile className="text-2xl sm:text-3xl" />
        </div>
      </div>

      {/* Additional Search Input Modal for Small Screens */}
      {isSearchActive && (
        <div className="sm:hidden w-full flex justify-center bg-zinc-900 py-2">
          <input
            className="w-[80%] h-[2.5rem] px-4 py-2 outline-none border-zinc-400 border-[0.2px] bg-zinc-800 rounded-full"
            type="text"
            placeholder="Search"
          />
        </div>
      )}
    </>
  );
};

export default Head;
