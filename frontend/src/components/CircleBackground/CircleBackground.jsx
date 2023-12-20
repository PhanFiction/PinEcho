// CircleBackground.js
import React from "react";
import '../../styles/globals.css';

const CircleBackground = ({ sm=true, children }) => {
  return (
    sm ? 
    <div className={`flex flex-col items-center justify-center w-6 h-6 rounded-full ring-1 ring-black`}>
      {children}
    </div>
    :
    <div className={`flex flex-col items-center justify-center w-12 h-12 rounded-full ring-1 ring-black`}>
      {children}
    </div>
  );
};

export default CircleBackground;
