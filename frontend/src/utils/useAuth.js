// useAuth.js
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

// Grabs authToken from cookie and checks if user is logged in or not
// Redirects user to either home page or landing page
const useAuth = () => {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    // Check if the user is already authenticated
    const authTokenString = Cookies.get('authToken');
    const authToken = authTokenString ? JSON.parse(authTokenString) : null;

    if (authToken) {
      // User is already authenticated, set the state
      setAuthenticated(true);
    } else {
      // User is not authenticated, set the state
      setAuthenticated(false);
      // Redirect to the login page
      router.push('/login');
    }
  }, []);

  return authenticated;
};

export default useAuth;
