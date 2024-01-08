import React from 'react';
import '../../styles/globals.css';

const ActionButton = ({ handleClick, bgColor="red", children }) => {

  return (
    <button
      type="button" 
      className={`w-full bg-${bgColor} text-white p-1 rounded-md shadow-lg hover:bg-firebrick-200 ease-in duration-300`}
      onClick={handleClick}
    >
      { children }
    </button>
  );
};

export default ActionButton;