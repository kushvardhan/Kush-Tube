import React from "react";

const Button = ({ label }) => {
  return (
    <>
      <button className="px-3 py-1 border border-zinc-400 rounded-xl bg-zinc-800 text-white text-sm lg:text-base">
        {label}
      </button>
    </>
  );
};

export default Button;
