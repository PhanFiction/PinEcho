// CircleBackground.js
import React from "react";
import '../../styles/globals.css';

const CircleBackground = ({ sm = true, md = false, lg = false, children }) => {
  let sizeClass;

  if (sm) {
    sizeClass = "w-6 h-6";
  } else if (md) {
    sizeClass = "w-12 h-12";
  } else if (lg) {
    sizeClass = "w-20 h-20";
  }

  return (
    <div className={`flex flex-col items-center justify-center rounded-full ring-1 ring-black ${sizeClass} relative`}>
      {children}
    </div>
  );
};

export default CircleBackground;
