import React from "react";
import '../../styles/globals.css';

const UserIcon = ({ name, iconSize=18, children }) => {
  const firstLetter = name.slice(0, 1); // Use slice to get the first letter

  return (
    <span className={`text-center font-semibold text-${iconSize}`}> {firstLetter} {children} </span>
  );
};

export default UserIcon;
