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
        <div className="search-text">
          <b className="search-for-a">Search for a pin</b>
          <p className="find-an-item">{`Find an item you want to see. Something like “chocolate”. `}</p>
        </div>
      </section>
      <section className="sign-up-section">
        <h1>Sign up now to see more ideas</h1>
        <form action="">
          <input type="text" name="username" id="username" />
          <label htmlFor="">Username</label>
          <input type="text" name="fullname" id="fullname" />
          <label htmlFor="">Fullname</label>
          <input type="text" name="email" id="email" />
          <label htmlFor="">Email</label>
          <input type="text" name="password" id="password" />
          <label htmlFor="">Password</label>
        </form>
      </section>
      <section></section>
      <footer>
        <ul>
          <li>Created By Steve Wu</li>
        </ul>
      </footer>
    </div>
  )
};

export default LandingPage;