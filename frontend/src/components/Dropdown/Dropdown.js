import React, { useEffect, useRef } from 'react';
import Icon from '../Icon/Icon';
import UserIcon from '../../assets/images/user-circle.svg';

const Dropdown = ({ isOpen, setIsOpen }) => {
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
      <ul className="py-2 px-4">
        {/* Dropdown content */}
        <li>
          <a href="/profile" className="flex items-center">
            <Icon iconName={UserIcon} altName={'userIcon'} width={24} height={24} className="mr-2" />
            <span className="text-black hover:text-indianred-200">Profile</span>
          </a>
        </li>
        <li>
          <a href="/settings" className="flex items-center">
            <Icon iconName={UserIcon} altName={'settingsIcon'} width={24} height={24} className="mr-2" />
            <span className="text-black hover:text-indianred-200">Settings</span>
          </a>
        </li>
        <li>
          <a href="/logout" className="flex items-center">
            <Icon iconName={UserIcon} altName={'logoutIcon'} width={24} height={24} className="mr-2" />
            <span className="text-black hover:text-indianred-200">Logout</span>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Dropdown;
