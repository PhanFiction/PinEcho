import UserCicrleIcon from "../components/UserCircleIcon";
import FullNameForm from "../components/FullNameForm";
import "./LandingPage2.css";

const LandingPage2 = () => {
  return (
    <div className="landing-page">
      <div className="nav">
        <button className="pinecho">PinEcho</button>
        <div className="nav-items">
          <button className="nav-link-1-wrapper"> 
            <div className="nav-link-1">
              <div className="login">Login</div>
            </div>
          </button>
          <button className="nav-link-2-wrapper" autoFocus>
            <div className="nav-link-2">
              <div className="login">Sign Up</div>
            </div>
          </button>
          <button className="user-cicrle-wrapper" autoFocus>
            <UserCicrleIcon />
          </button>
        </div>
      </div>
      <div className="header-section">
        <div className="find-your-pin">Find your pin</div>
        <div className="items">
          <img className="items-child" alt="" src="/rectangle-6@2x.png" />
          <img className="items-item" alt="" src="/rectangle-2@2x.png" />
          <img className="items-inner" alt="" src="/rectangle-3@2x.png" />
          <img className="rectangle-icon" alt="" src="/rectangle-4@2x.png" />
          <img className="items-child1" alt="" src="/rectangle-21@2x.png" />
        </div>
        <div className="header-section-child" />
        <div className="arrow-pointer">
          <div className="arrow-pointer-child" />
          <img className="arrow-pointer-item" alt="" src="/arrow-1.svg" />
        </div>
      </div>
      <div className="search-section">
        <img
          className="search-section-child"
          alt=""
          src="/rectangle-9@2x.png"
        />
        <img className="search-section-item" alt="" src="/rectangle-7@2x.png" />
        <img
          className="search-section-inner"
          alt=""
          src="/rectangle-8@2x.png"
        />
        <img
          className="search-section-child1"
          alt=""
          src="/rectangle-10@2x.png"
        />
        <div className="description">
          <b className="search-for-a">Search for a pin</b>
          <div className="find-an-item">{`Find an item you want to see. Something like “chocolate”. `}</div>
        </div>
        <div className="search-bar">
          <img className="search-icon" alt="" src="/search.svg" />
          <div className="chocolate">Chocolate</div>
        </div>
      </div>
      <div className="save-section">
        <img className="save-section-child" alt="" src="/rectangle-14@2x.png" />
        <img className="save-section-item" alt="" src="/rectangle-13@2x.png" />
        <img className="save-section-inner" alt="" src="/rectangle-11@2x.png" />
        <img
          className="save-section-child1"
          alt=""
          src="/rectangle-12@2x.png"
        />
        <img
          className="save-section-child2"
          alt=""
          src="/rectangle-111@2x.png"
        />
        <div className="save-pins-that">Save pins that you like</div>
        <div className="collect-your-favorite">
          Collect your favorite pin and come back to them later on.
        </div>
      </div>
      <div className="signup-section">
        <div className="items1">
          <img className="items-child2" alt="" src="/rectangle-18@2x.png" />
          <img className="items-child3" alt="" src="/rectangle-19@2x.png" />
          <img className="items-child4" alt="" src="/rectangle-20@2x.png" />
          <img className="items-child5" alt="" src="/rectangle-211@2x.png" />
          <img className="items-child6" alt="" src="/rectangle-23@2x.png" />
          <img className="items-child7" alt="" src="/rectangle-17@2x.png" />
          <img className="items-child8" alt="" src="/rectangle-171@2x.png" />
          <img className="items-child9" alt="" src="/rectangle-24@2x.png" />
          <img className="items-child10" alt="" src="/rectangle-201@2x.png" />
          <img className="items-child11" alt="" src="/rectangle-25@2x.png" />
          <img className="items-child12" alt="" src="/rectangle-22@2x.png" />
          <img className="items-child13" alt="" src="/rectangle-241@2x.png" />
          <img className="items-child14" alt="" src="/rectangle-231@2x.png" />
          <img className="items-child15" alt="" src="/rectangle-221@2x.png" />
        </div>
        <div className="overlay" />
        <div className="form-items">
          <div className="background-box" />
          <div className="password">
            <div className="password-child" />
            <div className="password1">Password</div>
            <div className="enter-your-password">Enter Your Password</div>
            <img className="vector-icon" alt="" src="/vector.svg" />
          </div>
          <FullNameForm userInfo="Full Name" fullName="John Doe" />
          <FullNameForm
            userInfo="Username"
            fullName="JohnDoe"
            propTop="142.21px"
          />
          <div className="email">
            <div className="password1">Email</div>
            <div className="frame">
              <div className="frame-child" />
              <div className="johndoegmailcom">JohnDoe@gmail.com</div>
            </div>
          </div>
          <div className="submit-button">
            <div className="sign-up1">Sign Up</div>
          </div>
          <div className="already-have-an-container">
            <span className="already-have-an-container1">
              {`Already have an account? `}
              <span className="login1">Login</span>
            </span>
          </div>
        </div>
        <div className="sign-up-now">Sign up now to see more ideas</div>
      </div>
      <div className="footer">
        <div className="created-by-steve">Created by Steve Wu</div>
      </div>
    </div>
  );
};

export default LandingPage2;
