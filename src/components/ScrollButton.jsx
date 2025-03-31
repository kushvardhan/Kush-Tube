import React from 'react';

const ScrollButton = ({ label }) => {
    return (
        <button className='px-5 py-2 border border-zinc-400 rounded-xl ml-3 bg-zinc-800 text-white text-sm'>
            {label}
        </button>
    );
};

export default ScrollButton;
