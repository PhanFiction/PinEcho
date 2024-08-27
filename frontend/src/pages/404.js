import { useEffect } from 'react';
import { fetchCredentials } from '../src/utils/auth';

export default function Custom404() {
  useEffect(() => {
    const isAuthenticated = fetchCredentials();
    if (!isAuthenticated) {
      router.push('/landing');
    }
  }, []);

  return <h1>404 - Page Not Found</h1>
}