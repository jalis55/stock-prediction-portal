import AuthBanner from '@/components/AuthBanner';
import React, { use, useState } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  // const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate=useNavigate();



  const togglePwd = () => {

    setShowPassword((v) => !v)
  }



  const handleLogin = async (e) => {
    e.preventDefault();


    if (!username || !password) {
      toast.error('All fields are required');
      return;
    }

    const userData = {
      username,
      password,
    }
    try {
      const response = await axios.post("http://localhost:8000/api/v1/token/", userData);
      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);
      navigate('/');

    }
    catch (error) {
      toast.error("Invalid credentials");
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

            {/* Email
            <div>
              <label className="text-slate-900 text-xs font-medium block mb-2">
                Email
              </label>
              <input
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Enter email"
                className="w-full bg-transparent text-sm text-slate-900 border-b border-slate-300 focus:border-blue-500 pl-2 py-3 outline-none"
              />
            </div> */}

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
              className="w-full shadow-xl py-2.5 px-4 text-sm font-medium tracking-wider rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none cursor-pointer transition-all"
            >
              Login
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