import React,{ useState } from "react";
import '../../styles/globals.css';
import Cookies from 'js-cookie';
import Image from 'next/image';
import bgSignup from '../../assets/images/bg_signup.png';
import Label from "../../components/Label/Label";
import useAuth from '../../utils/useAuth';
import Link from 'next/link';
import { useRouter } from "next/router";

const Login = () => {
  const router = useRouter();
  const authenticated = useAuth();
  const [username, setUsername] = useState("JohnDoe");
  const [password, setPassword] = useState("12345");

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const authTokenValue = JSON.stringify({
      username: 'JohnDoe',
      name: 'John Doe',
    });
    Cookies.set('authToken', authTokenValue);
    router.push('/');
  }

  return(
    <section className="w-full h-screen relative bg-black">
      {
        authenticated ? (
          router.push('/')
        ) : 
        <>
          <div className="w-full h-screen absolute">
            <Image
              src={bgSignup}
              alt="signup"
              fill={true}
              style={{objectFit:"cover"}}
              className="bg-gray-900 opacity-40 blur-sm"
            />
          </div>
          <div className="h-screen flex items-center justify-center z-10 p-4 relative">
            <form className="bg-white rounded-md p-4 flex gap-2 flex-col w-11/12 sm:w-6/12 lg:w-4/12 2xl:w-2/12 lg:mt-8">
              <h2 className="font-semibold text-black text-[24px] md:text-[36px] text-center">
                Login
              </h2>
              <Label name={"username"} text={"JohnDoe"} value={username} onChange={(e) => setUsername(e.target.value)}>
                Username
              </Label>
              <Label type={"password"} text={"password"} value={password} name={"password"} onChange={(e) => setPassword(e.target.value)}>
                Password
              </Label>
              <button 
                className="
                  w-full bg-indianred-200 hover:bg-red 
                  hover:drop-shadow-lg text-white p-2 mt-4 
                  rounded-md ease-in duration-200"
                onClick={handleLoginSubmit}
              >
                Submit
              </button>
              <Link className="text-sm m-2" href="/signup">Don't have an account. Sign up now.</Link>
            </form>
          </div>
        </>
      }
    </section>
  )
};

export default Login;