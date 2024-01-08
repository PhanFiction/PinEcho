import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import '../styles/globals.css';
import { fetchCredentials } from '../utils/auth';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(fetchCredentials());

  useEffect(() => {
    if (authenticated) {
      // User is authenticated
      setAuthenticated(true);
    }
  }, []);

  return (
    <div>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
