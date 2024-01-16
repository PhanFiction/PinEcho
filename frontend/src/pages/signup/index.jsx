import { useState, useEffect } from "react";
import Image from 'next/image';
import bgSignup from '../../assets/images/bg_signup.png';
import Label from "../../components/Label/Label";
import Link from 'next/link';
import { fetchCredentials } from '../../utils/auth';
import { useRouter } from "next/router";
import { signUpService } from "../../service/authService";
import ActionButton from '../../components/ActionButton/ActionButton';
import Alert from "../../components/Alert/Alert";

export default function Signup() {
  const router = useRouter();
  const [username, setUsername] = useState("JohnDoe");
  const [firstName, setFirstName] = useState("John");
  const [lastName, setLastName] = useState("Doe");
  const [email, setEmail] = useState("JohnDoe@gmail.com");
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
      firstName,
      lastName,
      email,
      password,
    };
    
    try {
      const res = await signUpService(credentials);
      if(res.success) {
        router.push(res.redirectURL);
      }
    } catch(error) {
      setAlertMessage('Unable to sign up');
    }
  };

  return (
    <section className="w-full relative bg-black">
      {alertMessage && <Alert message={alertMessage} onClose={() => setAlertMessage(null)} />}
      {
        authenticated ? 
          router.push('/')
        :
        <>
          <div className="w-full h-screen bg-black absolute">
            <Image
              src={bgSignup}
              alt="signup"
              fill={true}
              style={{objectFit:"cover"}}
              className="bg-gray-900 opacity-40 blur-sm"
            />
          </div>
          <div className="z-10 h-screen flex items-center justify-center z-10 p-4 relative">
            <form className="bg-white rounded-md p-4 flex gap-2 flex-col w-11/12 sm:w-6/12 lg:w-4/12 lg:mt-8">
              <h2 className="font-semibold text-black text-[24px] md:text-[36px] text-center">
                Sign Up
              </h2>
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
              <div className="mt-4">
                <ActionButton handleClick={handleSubmit}>
                  Sign Up
                </ActionButton>
              </div>
              <Link className="text-sm m-2 hover:text-blue" href="/login">Already have an account. Login Now.</Link>
            </form>
          </div>
        </>
      }
    </section>
  )
};