import Icon from '../Icon/Icon';

import UserIcon from '../../assets/user-circle.svg';
import PinEcho from '../../assets/PinEcho.svg';

const Nav = () => {
  return(
    <nav>
      <Icon className="icon" iconName={PinEcho} altName={'pin'}/>
      <ul>
        <li className="btn-wrapper">
          <button className="btn">
            <span className="btn-text">
              Login
            </span>
          </button>
        </li>
        <li>
          <button className="btn">
            <span className="btn-text">
              Sign Up
            </span>
          </button>
        </li>
        <li>
          <Icon iconName={UserIcon} altName={'userIcon'} width={32} height={32}/>
        </li>
      </ul>
    </nav>
  )
};

export default Nav;