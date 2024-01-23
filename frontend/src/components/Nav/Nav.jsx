import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Icon from '../Icon/Icon';
import PinEcho from '../../assets/images/PinEcho.svg';
import Dropdown from '../Dropdown/Dropdown';
import CircleBackground from '../CircleBackground/CircleBackground';
import UserIcon from '../UserIcon/UserIcon';
import { getUser, logout } from "../../service/authService";
import { fetchCredentials } from '../../utils/auth';
import { useAuth } from '../../providers/Auth';

const Nav = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const { setAuthenticated } = useAuth();
  const [user, setUser] = useState(null);
  const [profileImage, setProfileImage] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      const isAuthenticated = fetchCredentials();

      if (isAuthenticated) {
        const user = await getUser();
        setUser(user);
        setProfileImage(user.profileImage ? user.profileImage.path : "");
      }else{
        setAuthenticated(false);
      }
    }
    fetchUser();
  }, []);

  const toggleDropdown = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    const loggedOut = await logout();
    if(loggedOut) {
      setAuthenticated(false);
      setUser(null);
      router.push('/');
    }
  }

  return(
    <nav className="fixed left-0 right-0 top-0 flex justify-between p-4 bg-snow drop-shadow-lg z-40">
      <Link href="/" className="flex justify-center align-center">
        <Icon className="m-0 p-0" iconName={PinEcho} altName={'pin'}/>
      </Link>
      {
        user ? (
          <ul className="flex items-center gap-4 text-white">
            <li className="hover:bg-brightred bg-darkred py-1 px-4 rounded-lg ease-in duration-200">
              <Link href="/pin/create"><span className="text-sm text-black hover:text-indianred-200">Create Pin</span></Link>
            </li>
            <li>
              <span className="hover:cursor-pointer text-black" onClick={toggleDropdown}>
                <CircleBackground md={true}>
                  <UserIcon name={user.username} imgName={profileImage}/>
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