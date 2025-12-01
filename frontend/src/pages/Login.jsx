import AuthBanner from '@/components/AuthBanner';
import React, { use, useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthProvider';
import axiosInstance from '@/axiosInstance';
import { Loader } from 'lucide-react';


const Login = () => {
  const [username, setUsername] = useState('');
  // const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);






  const togglePwd = () => {

    setShowPassword((v) => !v)
  }



  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      toast.error('All fields are required');
      return;
    }

    setIsLoading(true); // 1. ──►  move it here

    try {
      await axiosInstance.post('/token/', { username, password });
      setIsLoggedIn(true);
      navigate('/');
    } catch (err) {
      const msg =
        err.response?.data?.detail ||
        err.response?.data?.message ||
        'Login failed – please try again';
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative">
      <AuthBanner />


      <div className="relative -mt-40 m-4">
        <form
          onSubmit={handleLogin}
          className="bg-white max-w-xl w-full mx-auto shadow-[0_2px_10px_-3px_rgba(14,14,14,0.3)] p-6 sm:p-8 rounded-2xl"
        >
          <div className="mb-12">
            <h1 className="text-slate-900 text-3xl font-medium text-center">
              Register
            </h1>
          </div>

          <div className="space-y-8">
            {/* Username */}
            <div>
              <label className="text-slate-900 text-xs font-medium block mb-2">
                Username
              </label>
              <input
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                placeholder="Enter username"
                className="w-full bg-transparent text-sm text-slate-900 border-b border-slate-300 focus:border-blue-500 pl-2 py-3 outline-none"
              />
            </div>



            {/* Password */}
            <div>
              <label className="text-slate-900 text-xs font-medium block mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter password"
                  className="w-full bg-transparent text-sm text-slate-900 border-b border-slate-300 focus:border-blue-500 pl-2 pr-10 py-3 outline-none"
                />
                <button
                  type="button"
                  onClick={togglePwd}
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-800"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>


          </div>

          {/* Submit */}
          <div className="mt-12">
            <button
              type="submit"
              disabled={isLoading}

              className="w-full shadow-xl py-2.5 px-4 text-sm font-medium tracking-wider rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none cursor-pointer transition-all"
            >
              {isLoading ? (
                'Loading..'
              ) : 'Login'}
            </button>




            <p className="text-slate-600 text-sm mt-6 text-center">
              Already have an account?
              <Link
                to="/register"
                className="text-blue-500 font-medium hover:underline ml-1"
              >
                Register
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;