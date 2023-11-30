import Icon from '../Icon/Icon';
import Link from 'next/link';

import UserIcon from '../../assets/user-circle.svg';
import PinEcho from '../../assets/PinEcho.svg';

const Nav = () => {
  return(
    <nav className="w-full flex justify-between p-4 bg-darkwhite">
      <Icon className="icon" iconName={PinEcho} altName={'pin'}/>
      <ul className="flex items-center gap-4 text-white">
        <li className="hover:bg-brightred bg-darkred py-1 px-4 rounded-lg ease-in duration-200">
          <Link href="/login"><span className="text-sm">Login</span></Link>
        </li>
        <li className="hover:bg-brightred bg-darkred py-1 px-4 rounded-lg ease-in duration-200">
          <Link href="/signup"><span className="text-sm">Sign Up</span></Link>
        </li>
        <li>
          <Icon iconName={UserIcon} altName={'userIcon'} width={32} height={32}/>
        </li>
      </ul>
    </nav>
  )
};

export default Nav;