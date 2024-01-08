// CircleBackground.js
import React from "react";
import '../../styles/globals.css';

const CircleBackground = ({ sm = false, md = false, lg = false, children }) => {
  let sizeClass;

  if (sm) {
    sizeClass = "w-6 h-6";
  } else if (md) {
    sizeClass = "w-8 h-8";
  } else if (lg) {
    sizeClass = "w-12 h-12";
  } else {
    sizeClass = "w-6 h-6";
  }

  return (
    <div className={`flex flex-col items-center justify-center text-center rounded-full ring-1 ring-black relative ${sizeClass}`}>
      {children}
    </div>
  );
};

export default CircleBackground;
