import React from 'react';
import { checkAuthentication } from '../service/authService';

// https://dev.to/justincy/detecting-a-user-s-authenticated-state-client-side-in-next-js-using-an-httponly-cookie-and-static-optimization-6ib

const AuthContext = React.createContext({
  isAuthenticated: false,
  isLoading: true,
  setAuthenticated: () => {}
});

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setAuthenticated] = React.useState(false);
  const [isLoading, setLoading] = React.useState(true);
  React.useEffect(() => {
    const initializeAuth = async () => {
      const response = await checkAuthentication();
      setAuthenticated(response.status === 200);
      setLoading(false);
    };
    initializeAuth();
  }, []);
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        setAuthenticated
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}