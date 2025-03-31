import React from "react";
import Sidebar from "./Sidebar";
import MainContainer from "./MainContainer";
import { useSelector } from "react-redux";

const Home = () => {
  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);

  return (
    <div className={`w-full h-[calc(100vh-10vh)] grid ${isMenuOpen ? 'grid-cols-[19%_81%]' : 'grid-cols-1'}`}>
      {isMenuOpen && <Sidebar className="h-full" />}
      <MainContainer className="h-full w-full" />
    </div>
  );
};

export default Home;
