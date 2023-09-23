import './LandingPage.css';

const LandingPage = () => {
  return(
    <div className="landing-page">
      <section className="header-section">
        <h1>Find your Pin</h1>
        <div className="header-items">
          <img className="header_bg" src={require('../assets/find_pin_bg.png')} alt="img" />
        </div>
        <div className="blur-overlay"></div>
      </section>
      <section className="search-section">
        <div className="search-items">
          <img className="search-item-child" alt="img" src={require("../assets/search_bg.png")} />
        </div>
        <div className="mobile">
          <div className="overlay-text"></div>
        </div>
        <div className="search-text">
          <b className="search-for-a">Search for a pin</b>
          <p className="find-an-item">{`Find an item you want to see. Something like “chocolate”. `}</p>
        </div>
      </section>
      <section className="sign-up-section">
        <div className="sign-up-bg"></div>
        <div className="overlay-text"></div>
        <h1>Sign up now to see more ideas</h1>
        <form action="" className="sign-up-form">
          <div>
            <label htmlFor="">Username</label>
            <input type="text" name="username" id="username"></input>
          </div>
          <div>
            <label htmlFor="">Fullname</label>
            <input type="text" name="fullname" id="fullname" />
          </div>
          <div>
            <label htmlFor="">Email</label>
            <input type="text" name="email" id="email" />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input type="text" name="password" id="password" />
          </div>
          <button className="submit_btn" type='submit'>Submit</button>
          <a href="#">Already have an account. Sign in Now.</a>
        </form>
      </section>
      <footer className="footer">
        <ul>
          <li>Created By Steve Wu</li>
        </ul>
      </footer>
    </div>
  )
};

export default LandingPage;