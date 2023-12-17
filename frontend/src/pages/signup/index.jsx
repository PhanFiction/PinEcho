import React, { useState } from "react";
import '../../styles/globals.css';
import Image from 'next/image';
import bgSignup from '../../assets/images/bg_signup.png';
import Label from "../../components/Label/Label";
import Link from 'next/link';
import useAuth from "../../utils/useAuth";
import { useRouter } from "next/router";

export default function Signup() {
  const router = useRouter();
  const authenticated = useAuth();
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); 

  return (
    <section className="w-full relative bg-black">
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
            <form action="" className="bg-white rounded-md p-4 flex gap-2 flex-col w-11/12 sm:w-6/12 lg:w-4/12 lg:mt-8">
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
              <button className="w-full bg-indianred-200 hover:bg-red hover:drop-shadow-lg text-white p-2 mt-4 rounded-md ease-in duration-200" type="submit">Submit</button>
              <Link className="text-sm m-2" href="/login">Already have an account. Login Now.</Link>
            </form>
          </div>
        </>
      }
    </section>
  )
};