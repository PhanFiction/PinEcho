import sectionImg from '../assets/rectangle-6@2x.png';

const LandingPage = () => {
  return(
    <>
      <section className="find-your-pin-section">
        <h1>Find your Pin</h1>
        <div>
          <img src={require('../assets/rectangle-6@2x.png')} alt="img" />
          <img src={require('../assets/rectangle-2@2x.png')} alt="img" />
          <img src={require('../assets/rectangle-3@2x.png')} alt="img" />
          <img src={require('../assets/rectangle-4@2x.png')} alt="img" />
          <img src={require('../assets/rectangle-21@2x.png')} alt="img" />
        </div>
      </section>
      <section className="search-section">
        <div></div>
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
    </>
  )
};

export default LandingPage;