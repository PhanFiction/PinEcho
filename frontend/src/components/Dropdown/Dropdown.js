import React, { useEffect, useRef } from 'react';

const Dropdown = ({ isOpen, setIsOpen, handleLogout }) => {
  const dropdownRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      const dropdownContainer = dropdownRef.current;

      if (dropdownContainer && !dropdownContainer.contains(event.target)) {
        setIsOpen(false);
      }
    };

    const handleClickInside = (event) => {
      const userIcon = document.querySelector('.user-icon');

      if (userIcon && userIcon.contains(event.target)) {
        setIsOpen(!isOpen);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('mousedown', handleClickInside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('mousedown', handleClickInside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('mousedown', handleClickInside);
    };
  }, [isOpen, setIsOpen]);

  return (
    <div ref={dropdownRef} className={`absolute right-0 mt-2 bg-white border rounded-md shadow-md ${isOpen ? 'block' : 'hidden'}`}>
      <ul className="flex flex-col p-1 gap-2 z-40">
        {/* Dropdown content */}
        <li className="hover:bg-lightgray rounded-sm p-1">
          <a href="/profile/23" className="text-center px-2">
            <span className="text-black hover:text-indianred-200">Profile</span>
          </a>
        </li>

        <li className="hover:bg-lightgray rounded-sm p-1">
          <a href="/pin/saves" className="text-center px-2">
            <span className="text-black hover:text-indianred-200">Saves</span>
          </a>
        </li>
        <li className="hover:bg-lightgray rounded-sm p-1" onClick={handleLogout}>
          <span className="text-center px-2 text-black hover:text-indianred-200 hover:cursor-pointer">Logout</span>
        </li>
      </ul>
    </div>
  );
};

export default Dropdown;
