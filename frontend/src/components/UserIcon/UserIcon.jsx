import React from "react";
import '../../styles/globals.css';

const UserIcon = ({ name, children }) => {
  const firstLetter = name.split('')[0];
  return (
    <div className="flex flex-col items-center justify-center h-8 w-8 rounded-full ring-2 ring-black">
      <span className="text-center font-semibold text-[18px]"> {firstLetter} {children} </span>
    </div>
  )
};

export default UserIcon;