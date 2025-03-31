import React from "react";
import ButtonList from "./ButtonList";
import VideoContainer from "./VideoContainer";

const MainContainer = () => {
  return (
    <>
      <div className="bg-zinc-900 text-white p-4 lg:p-6 sm:p-2">
        <ButtonList />
        <VideoContainer />
      </div>
    </>
  );
};

export default MainContainer;
