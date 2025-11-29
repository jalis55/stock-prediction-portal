import AuthBanner from '@/components/AuthBanner';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { toast } from 'react-toastify';
import axios from 'axios';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePwd = (which) =>
    which === 'password'
      ? setShowPassword((v) => !v)
      : setShowConfirmPassword((v) => !v);

  const checkValidation = () => {
    if (!username || !email || !password || !confirmPassword) {
      handleToast('All fields are required');
      return false;
    }
    if (password !== confirmPassword) {
      handleToast('Passwords do not match');
      return false;
    }
  }

  const handleToast = (message, type = "error") => {
    if (type === "error") {
      toast.error(message);
    } else {
      toast.success(message);
    }
  }

  const handleRegister = async (e) => {
    e.preventDefault();

    if (checkValidation() === false) return;


    const userData = {
      username,
      email,
      password,
    }
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/v1/register/', userData);
      console.log(response.data);
      handleToast('Registration successful', 'success');
    }
    catch (error) {
      console.error('Full error object:', error);

      const serverMsg=error.response.data;
      if (serverMsg.username) {
        handleToast(`Username: ${serverMsg.username.join(' ')}`);
        return;
      }
      if (serverMsg.email) {
        handleToast(`Email: ${serverMsg.email.join(' ')}`);
        return;
      }
      if (serverMsg.password) {
        handleToast(`Password: ${serverMsg.password.join(' ')}`);
        return;
      }

        handleToast(serverMsg);
    }

  };

  return (
    <div className="relative">
      <AuthBanner />

      <div className="relative -mt-40 m-4">
        <form
          onSubmit={handleRegister}
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

                value={username}
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                placeholder="Enter username"
                className="w-full bg-transparent text-sm text-slate-900 border-b border-slate-300 focus:border-blue-500 pl-2 py-3 outline-none"
              />
            </div>

            {/* Email */}
            <div>
              <label className="text-slate-900 text-xs font-medium block mb-2">
                Email
              </label>
              <input

                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Enter email"
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

                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter password"
                  className="w-full bg-transparent text-sm text-slate-900 border-b border-slate-300 focus:border-blue-500 pl-2 pr-10 py-3 outline-none"
                />
                <button
                  type="button"
                  onClick={() => togglePwd('password')}
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-800"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="text-slate-900 text-xs font-medium block mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <input

                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirm password"
                  className="w-full bg-transparent text-sm text-slate-900 border-b border-slate-300 focus:border-blue-500 pl-2 pr-10 py-3 outline-none"
                />
                <button
                  type="button"
                  onClick={() => togglePwd('confirm')}
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-800"
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
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
              Register
            </button>
            <p className="text-slate-600 text-sm mt-6 text-center">
              Already have an account?
              <Link
                to="/login"
                className="text-blue-500 font-medium hover:underline ml-1"
              >
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;