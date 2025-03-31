import React from "react";
import { Link } from "react-router-dom";

const Button = ({ label, id }) => {
  return (
    <Link to={`/category/${id}`} >
      <button className="px-2 py-1 cursor-pointer border border-zinc-400 rounded-xl bg-zinc-800 text-white text-[1.4vw] lg:text-[1.4vw]">
        {label}
      </button>
    </Link>
  );
};

export default Button;
