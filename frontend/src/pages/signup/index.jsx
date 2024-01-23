import { useState } from "react";
import Image from 'next/image';
import bgSignup from '../../assets/images/bg_signup.png';
import Label from "../../components/Label/Label";
import Link from 'next/link';
import { useRouter } from "next/router";
import { signUpService } from "../../service/authService";
import ActionButton from '../../components/ActionButton/ActionButton';
import Alert from "../../components/Alert/Alert";
import withoutAuth from '../../hocs/withoutAuth';

export default withoutAuth(function Signup() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alertMessage, setAlertMessage] = useState(null);

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
        router.push('/login');
      }
    } catch(error) {
      setAlertMessage('Unable to sign up');
    }
  };

  return (
    <section className="w-full relative bg-black">
      {alertMessage && <Alert message={alertMessage} onClose={() => setAlertMessage(null)} />}
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
        <form
          onSubmit={handleSubmit} 
          className="bg-white rounded-md p-4 flex gap-2 flex-col w-11/12 sm:w-6/12 lg:w-4/12 lg:mt-8"
        >
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
            <ActionButton buttonType="submit">
              Sign Up
            </ActionButton>
          </div>
          <Link className="text-sm m-2 hover:text-blue" href="/login">Already have an account. Login Now.</Link>
        </form>
      </div>
    </section>
  )
});