import { useState } from 'react';
import { useRouter } from "next/navigation";
import Label from '../../components/Label/Label';
import Image from 'next/image';
import findPinBg from '../../assets/images/find_pin_bg.png';
import bgSignup from '../../assets/images/bg_signup.png';
import searchBg from '../../assets/images/search_bg.png';
import ActionButton from '../../components/ActionButton/ActionButton';
import Link from 'next/link';
import { signUpService } from '../../service/authService';

const Landing = () => {
  const [username, setUsername] = useState("JohnDoe");
  const [firstName, setFirstName] = useState("John");
  const [lastName, setLastName] = useState("Doe");
  const [email, setEmail] = useState("JohnDoe@gmail.com");
  const [password, setPassword] = useState("12345");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const credentials = {
      username,
      firstName,
      lastName,
      email,
      password,
    };
    const response = await signUpService(credentials);
    if(response) router.push(response.redirectURL);
  };

  return (
    <div className="w-full mt-12">
      <section className="w-full h-full flex flex-col">
        <h1 className="my-8 font-original-surfer text-center text-[32px] md:text-[64px]">
          Find your Pin
        </h1>
        <div className="w-full relative">
          <div className="h-48 md:h-96 mt-64">
            <Image
              src={findPinBg}
              alt="pin-bg"
              fill={true}
            />
          </div>
          <div className="absolute blur-sm w-full bg-black h-24 md:h-28 lg:h-80 bottom-0 opacity-50"></div>
        </div>
      </section>
      <section className="w-full bg-greenishgray py-4 md:p-8">
        <div className="flex justify-around flex-col md:flex-row sm:m-4 md:m-12">
          <div>
            <Image
              src={searchBg}
              alt="chocolate-img"
            />
          </div>
          <div className="font-semibold text-darkslategray-200 flex flex-col justify-center text-center sm:text-left my-8 md:mt-8">
            <h2 className="font-open-sans text-[32px] md:text-[32px] lg:text-[64px]"><b>Search for a Pin</b></h2>
            <p className="text-[14px] md:text-[18px] lg:text-[24px]">{`Find an item you want to see. Something like “chocolate”. `}</p>
          </div>
        </div>
        <div className="overlay-text"></div>
      </section>
      <section className="w-full flex flex-col justify-center relative sm:flex-row">
        <div className="w-full h-full bg-black absolute">
          <Image
            src={bgSignup}
            alt="signup"
            fill={true}
            style={{objectFit:"cover"}}
            className="bg-gray-900 opacity-40 blur-sm"
          />
        </div>
        <div className="w-full z-10 flex flex-col justify-evenly my-12 gap-4 p-4 md:flex-row">
          <div className="my-auto md:w-2/4 lg:w-1/3">
            <h2 className="font-semibold text-white text-[32px] md:text-[58px] lg:text-[68px] text-center md:text-left">
              Sign up now to see more ideas
            </h2>
          </div>
          <form className="bg-white rounded-md p-8 flex flex-col gap-4">
            <Label name={"username"} text={"JohnDoe"} onChange={(e)=>{setUsername(e.target.value)}}>
              Username
            </Label>
            <Label name={"firstname"} text={"John"} onChange={(e)=>{setFirstName(e.target.value)}}>
              First name
            </Label>
            <Label name={"lastname"} text={"Doe"} onChange={(e)=>{setLastName(e.target.value)}}>
              Last name
            </Label>
            <Label name={"email"} text={"JohnDoe@gmail.com"} onChange={(e)=>{setEmail(e.target.value)}}>
              Email
            </Label>
            <Label type={"password"} text={"password"} name={"password"} onChange={(e)=>{setPassword(e.target.value)}}>
              Password
            </Label>
            <ActionButton handleClick={handleSubmit}>
              Sign Up
            </ActionButton>
            <Link className="text-sm m-2 hover:text-blue" href="/login">Already have an account. Login Now.</Link>
          </form>
        </div>
      </section>
    </div>
  )
};

export default Landing;