import React, { useState } from 'react';
import Icon from '../Icon/Icon';
import Link from 'next/link';
import '../../styles/globals.css';

import UserIcon from '../../assets/images/user-circle.svg';
import PinEcho from '../../assets/images/PinEcho.svg';
import Dropdown from '../Dropdown/Dropdown';

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  return(
    <nav className="w-full flex justify-between p-4 bg-snow drop-shadow-lg">
      <Link href="/" className="flex justify-center align-center">
        <Icon className="m-0 p-0" iconName={PinEcho} altName={'pin'}/>
      </Link>
      <ul className="flex items-center gap-4 text-white">
        <li className="hover:bg-brightred bg-darkred py-1 px-4 rounded-lg ease-in duration-200">
          <Link href="/landing"><span className="text-sm text-black hover:text-indianred-200">Login</span></Link>
        </li>
        <li className="hover:bg-brightred bg-darkred py-1 px-4 rounded-lg ease-in duration-200">
          <Link href="/signup"><span className="text-sm text-black hover:text-indianred-200">Sign Up</span></Link>
        </li>
        <li>
          <span className="cursor-pointer" onClick={toggleDropdown}>
            <Icon iconName={UserIcon} altName={'userIcon'} width={32} height={32} />
          </span>
          <Dropdown isOpen={isOpen} setIsOpen={toggleDropdown}/>
        </li>
      </ul>
    </nav>
  )
};

export default Nav;