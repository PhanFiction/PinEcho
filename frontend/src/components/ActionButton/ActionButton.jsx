import React from "react";
import '../../styles/globals.css';

export default function ActionButton({ children }) {
  return (
    <button className="w-full bg-red text-white p-2 mt-4 rounded-md shadow-lg hover:bg-firebrick-200 ease-in duration-300">
     { children }
    </button>
  )
}