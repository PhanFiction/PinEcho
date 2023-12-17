"use client"
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import '../styles/globals.css';
import Home from '../pages/home/index';
import Landing from '../pages/landing/index';

export default function Page() {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const authTokenString = Cookies.get('authToken');
    const authToken = authTokenString ? JSON.parse(authTokenString) : null;

    if (authToken) {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }
  }, []);

  return (
    <>
      {authenticated ? <Home /> : <Landing />}
    </>
  );
}
