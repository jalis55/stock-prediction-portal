import { useState, createContext, useEffect } from 'react';
import axiosInstance from './axiosInstance'; // Import your configured axios instance
import { Loader2 } from 'lucide-react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // New loading state

  useEffect(() => {
    const verifyAuthStatus = async () => {
      try {
        // This is a dummy endpoint you need to create in Django that just returns 200 if authenticated
        await axiosInstance.get('/verify-auth/');
        setIsLoggedIn(true);
      } catch (error) {
        // If the call fails (e.g., 401 Unauthorized), the user is not logged in or cookie expired
        setIsLoggedIn(false);
        // The error interceptor might handle the refresh transparently here first
      } finally {
        setIsLoading(false);
      }
    };

    verifyAuthStatus();
  }, []); // Run once on mount

  // If you are using this in a router, you might want to show a loading spinner here
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="flex items-center justify-center h-screen">
          <Loader2 className="animate-spin w-20 h-20 text-green-700" />
          <Loader2 className="animate-spin w-20 h-20 text-green-900" />
        </div>

      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };
export default AuthProvider;
