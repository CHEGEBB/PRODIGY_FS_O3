import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import '../sass/Auth.scss';

const LoginPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-12 bg-center bg-cover bg-login-image sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 login-box">
        <h2 className="text-3xl font-extrabold text-center text-white">Login</h2>
        <div className="welcome-message">
          <p>Welcome back! Please log in to access your account.</p>
        </div>
        <form className="mt-8 space-y-6">
          <div className="-space-y-px rounded-md shadow-sm user-box">
            <div>
              <FontAwesomeIcon icon={faUser} className="absolute text-gray-400 icon top-3 right-3" />
              <label htmlFor="username" className="sr-only">Username</label>
              <input id="username" name="username" type="text" required className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Username" />
            </div>
          </div>
          <div className="-space-y-px rounded-md shadow-sm user-box">
            <div>
              <FontAwesomeIcon icon={faLock} className="absolute text-gray-400 icon top-3 right-3" />
              <label htmlFor="password" className="sr-only">Password</label>
              <input id="password" name="password" type="password" required className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password" />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-sm">
              <a href="#" className="font-medium text-indigo-300 hover:text-indigo-500">
                Forgot Password?
              </a>
            </div>
          </div>
          <div>
            <button type="submit" className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md group hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;