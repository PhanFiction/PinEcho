import './LandingPage.css';

const LandingPage = () => {
  return(
    <div className="landing-page">
      <section className="header-section">
        <h1>Find your Pin</h1>
        <div className="header-items">
          <img className="img img-child" src={require('../assets/rectangle-21@2x.png')} alt="img" />
          <img className="img img-child2" src={require('../assets/rectangle-2@2x.png')} alt="img" />
          <img className="img img-child3" src={require('../assets/rectangle-3@2x.png')} alt="img" />
          <img className="img img-child2" src={require('../assets/rectangle-6@2x.png')} alt="img" />
          <img className="img img-child" src={require('../assets/rectangle-4@2x.png')} alt="img" />
        </div>
        <div className="blur-overlay"></div>
      </section>
      <section className="search-section">
        <div className="search-items">
          <img className="search-item-child" alt="img" src={require("../assets//rectangle-8@2x.png")} />
          <img className="search-item-child2" alt="img" src={require("../assets/rectangle-10@2x.png")} />
          <img className="search-item-child3" alt="img" src={require("../assets/rectangle-7@2x.png")} />
        </div>
        <div>
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