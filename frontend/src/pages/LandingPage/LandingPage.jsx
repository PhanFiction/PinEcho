import Label from '../../components/Label/Label';
import Footer from '../../components/Footer/Footer';
import Image from 'next/image';

const LandingPage = () => {
  return(
    <div className="w-full">
      <section className="flex flex-col">
        <h1 className="">Find your Pin</h1>
        <div className="relative w-full">
          <div className="h-80 md:h-96 lg:h-screen">
            <Image
              src={require('../../assets/find_pin_bg.png')}
              alt="img"
              fill={true}
            />
          </div>
          <div className="absolute blur-sm w-full bg-black h-24 md:h-28 lg:h-80 bottom-0 opacity-50"></div>
        </div>
      </section>
      <section className="search-section">
        <div className="search-items">
          <img className="search-item-child" alt="img" src={require("../../assets/search_bg.png")} />
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
            <Label name={"username"} text={"JohnDoe"}>
              Username
            </Label>
          </div>
          <div>
            <Label name={"firstname"} text={"John"}>
              First name
            </Label>
          </div>
          <div>
            <Label name={"lastname"} text={"Doe"}>
              Last name
            </Label>
          </div>
          <div>
            <Label name={"email"} text={"JohnDoe@gmail.com"}>
              Email
            </Label>
          </div>
          <div>
            <Label type={"password"} name={"password"}>
              Password
            </Label>
          </div>
          <button className="submit-btn" type='submit'>Submit</button>
          <a href="#">Already have an account. Sign in Now.</a>
        </form>
      </section>
      <Footer />
    </div>
  )
};

export default LandingPage;