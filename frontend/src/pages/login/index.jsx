import React,{ useState, useEffect } from "react";
import '../../styles/globals.css';
import Link from 'next/link';
import { useRouter } from "next/router";
import Cookies from 'js-cookie';
import Image from 'next/image';
import bgSignup from '../../assets/images/bg_signup.png';
import Label from "../../components/Label/Label";
import { fetchCredentials } from '../../utils/auth';
import ActionButton from "../../components/ActionButton/ActionButton";
import { loginService } from '../../service/authService';
import Alert from '../../components/Alert/Alert';

const Login = () => {
  const router = useRouter();
  const [username, setUsername] = useState("JohnDoe");
  const [password, setPassword] = useState("12345");
  const [authenticated, setAuthenticated] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);

  useEffect(() => {
    // Check the user's authentication status using the utility function
    const isAuthenticated = fetchCredentials();

    // Update the state based on the authentication status
    if(isAuthenticated) {
      setAuthenticated(true);
    }else{
      setAuthenticated(false);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const credentials = {
      username,
      password,
    }
    try {
      const res = await loginService(credentials);    
      if(res.success) {
        const userData = JSON.stringify(res.user);
        Cookies.set('userToken', userData, { expires: 1 });
        router.push(res.redirectURL);
      }
    } catch(error) {
      setAlertMessage('Unable to login');
    }
  }

  return(
    <section className="w-full h-screen relative bg-black">
      {alertMessage && <Alert message={alertMessage} onClose={() => setAlertMessage(null)} />}
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
              <div className="mt-4">
                <ActionButton handleClick={handleSubmit}>
                  Login
                </ActionButton>
              </div>
              <Link className="text-sm m-2 hover:text-blue" href="/signup">Don't have an account. Sign up now.</Link>
            </form>
          </div>
        </>
      }
    </section>
  )
};

export default Login;