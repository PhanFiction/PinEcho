import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const authTokenString = Cookies.get('authToken');
    // Check the user's authentication status using cookies
    const authToken = authTokenString ? JSON.parse(authTokenString) : null;
    console.log(authToken);

    if (authToken) {
      // User is authenticated
      setAuthenticated(true);
    } else {
      // User is not authenticated
      setAuthenticated(false);
      // Redirect to the login page
      router.push('/login');
    }
  }, []);

  return (
    <div className={`app ${authenticated ? 'authenticated' : 'unauthenticated'}`}>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
