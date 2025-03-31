import React, { useEffect, useState } from "react";
import { AiOutlineVideoCameraAdd } from "react-icons/ai";
import { IoMdNotificationsOutline, IoMdSearch } from "react-icons/io";
import { GiEgyptianProfile } from "react-icons/gi";
import { RxHamburgerMenu } from "react-icons/rx";
import { useDispatch } from "react-redux";
import { toggleMenu } from "../utils/appSlice";
import { Link } from "react-router-dom";
import axios from "axios";
import { SEARCH_KEY } from "../utils/constant";

const Head = () => {
  const dispatch = useDispatch();
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchData, setSearchData] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchSearchData = async () => {
      try {
        const res = await axios.get(SEARCH_KEY);
        setSearchData(res.data.items);  // Setting search data
        const filteredData = res.data.items.filter((video) =>
          video.snippet.title.toLowerCase().includes(search.toLowerCase())
        );
        console.log(filteredData); // Logging filtered search data
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchSearchData();
  }, [search]);

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
            <Link to={"/"}>Youtube</Link>
          </h1>
        </div>

        <div className="flex items-center gap-2 w-[50%] justify-center">
          <div className="hidden sm:flex w-full items-center">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-[2.5rem] px-4 py-2 text-white outline-none border-zinc-400 border-[0.2px] bg-zinc-800 rounded-l-full"
              type="text"
              placeholder="Search"
            />
            <button className="h-[2.5rem] px-4 py-2 border rounded-r-full border-zinc-400">
              <IoMdSearch className="text-2xl text-zinc-300" />
            </button>
          </div>

          <button
            className="sm:hidden p-2 border rounded-full border-zinc-400"
            onClick={() => setIsSearchActive(!isSearchActive)}
          >
            <IoMdSearch className="text-2xl text-zinc-300" />
          </button>
        </div>

        <div className="flex items-center gap-4 sm:gap-6">
          <AiOutlineVideoCameraAdd className="text-2xl sm:text-3xl hidden sm:block" />
          <IoMdNotificationsOutline className="text-2xl sm:text-3xl hidden sm:block" />
          <GiEgyptianProfile className="text-2xl sm:text-3xl" />
        </div>
      </div>

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
