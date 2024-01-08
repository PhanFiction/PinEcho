import React, { useState, useEffect } from 'react';
import '../../styles/globals.css';
import Icon from '../Icon/Icon';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import PinEcho from '../../assets/images/PinEcho.svg';
import Dropdown from '../Dropdown/Dropdown';
import {fetchCredentials, fetchUserCredentials } from '../../utils/auth';
import { logout } from '../../service/authService';
import CircleBackground from '../CircleBackground/CircleBackground';
import UserIcon from '../UserIcon/UserIcon';

const Nav = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState(fetchUserCredentials());

  const toggleDropdown = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    const loggedOut = await logout();
    if(loggedOut) {
      setAuthenticated(false);
      router.push('/login');
    }
  }

  useEffect(() => {
    // Check the user's authentication status using the utility function
    const isAuthenticated = fetchCredentials();

    // Update the state based on the authentication status
    if(fetchUserCredentials.length > 1 || isAuthenticated) {
      setAuthenticated(true);
    }else{
      setAuthenticated(false);
      router.push('/login');
    }
  }, []);

  return(
    <nav className="fixed left-0 right-0 top-0 flex justify-between p-4 bg-snow drop-shadow-lg z-40">
      <Link href="/" className="flex justify-center align-center">
        <Icon className="m-0 p-0" iconName={PinEcho} altName={'pin'}/>
      </Link>
      {
        authenticated ? (
          <ul className="flex items-center gap-4 text-white">
            <li className="hover:bg-brightred bg-darkred py-1 px-4 rounded-lg ease-in duration-200">
              <Link href="/pin/create"><span className="text-sm text-black hover:text-indianred-200">Create Pin</span></Link>
            </li>
            <li>
              <span className="hover:cursor-pointer text-black" onClick={toggleDropdown}>
                <CircleBackground md={true}>
                  <UserIcon name={user.username} imgName={user.profileImage.path ? user.profileImage.path : ""}/>
                </CircleBackground>
              </span>
              <Dropdown isOpen={isOpen} setIsOpen={toggleDropdown} handleLogout={handleLogout}/>
            </li>
          </ul>
        )
        : 
        (
          <ul className="flex items-center gap-4 text-white">
            <li className="hover:bg-brightred bg-darkred py-1 px-4 rounded-lg ease-in duration-200">
              <Link href="/login"><span className="text-sm text-black hover:text-indianred-200">Login</span></Link>
            </li>
            <li className="hover:bg-brightred bg-darkred py-1 px-4 rounded-lg ease-in duration-200">
              <Link href="/signup"><span className="text-sm text-black hover:text-indianred-200">Sign Up</span></Link>
            </li>
          </ul>
        )
      }
    </nav>
  )
};

export default Nav;