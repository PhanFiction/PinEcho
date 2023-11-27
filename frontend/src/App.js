import Nav from './components/Nav/Nav';
import LandingPage from './pages/LandingPage/LandingPage';
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
import PinEchoPage from './pages/PinEchoPage/PinEchoPage';
import PinCreationPage from './pages/PinCreationPage/PinCreationPage';
import Profile from './pages/Profile/Profile';
import Home from './pages/Home/Home';
import './global.css';

import {
  Switch,
  Route,
  Link,
} from "react-router-dom";

function App() {
  return (
    <>
        <nav>
          <ul>
            <li>
              <Link to="/pin/14">Pin</Link>
            </li>
            <li>
              <Link to="/pin/create-pin">Create Pin</Link>
            </li>
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/profile/24">Profile</Link>
            </li>
            <li>
              <Link to="/landing-page">Landing Page</Link>
            </li>
            <li>
              <Link to="/">Home</Link>
            </li>
          </ul>
        </nav>
      <Switch>
        <Route path="/pin/create-pin" component={PinCreationPage} />
        <Route exact path="/pin/:id" component={PinEchoPage} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={SignUp} />
        <Route path="/profile/:id" component={Profile}/>
        <Route exact path="/landing-page" component={LandingPage} />
        <Route exact path="/" component={Home} />
      </Switch>
    </>
  );
}

export default App;
