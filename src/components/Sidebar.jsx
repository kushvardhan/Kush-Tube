import React from "react";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);

  return !isMenuOpen ? null : (
    <>
      <div className="bg-zinc-900 border-r border-zinc-500 text-white shadow-lg p-4 w-full lg:w-full md:w-full sm:w-[50vw]">
        <div className="flex flex-col pl-2 mt-1">
          <ul className="text-[1.3rem] space-y-[6px] mb-3">
            <li>Home</li>
            <li>Shorts</li>
            <li>Videos</li>
            <li>Live</li>
          </ul>
        </div>
        <div className="flex flex-col pl-2 mt-1">
          <h1 className="text-[1.4rem] font-semibold">Subscription</h1>
          <ul className="text-[1.1rem] space-y-[2px] mb-3">
            <li>Sports</li>
            <li>Movie</li>
            <li>Comedy</li>
            <li>Music</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
