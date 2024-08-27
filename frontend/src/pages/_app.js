import '../src/styles/globals.css';
import { AuthProvider } from '../src/providers/Auth';

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
