import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import '../sass/Login.scss';

const LoginPage = () => {
  const [gender, setGender] = useState('');

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-login-image bg-cover bg-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="login-box max-w-md w-full space-y-8">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-white">Login</h2>
        <form className="mt-8 space-y-6">
          <div className="user-box rounded-md shadow-sm -space-y-px">
            <div>
              <FontAwesomeIcon icon={faUser} className="icon absolute top-3 right-3 text-gray-400" />
              <label htmlFor="fullname" className="sr-only">Fullname</label>
              <input id="fullname" name="fullname" type="text" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Fullname" />
            </div>
          </div>
          <div className="user-box rounded-md shadow-sm -space-y-px">
            <div>
              <FontAwesomeIcon icon={faUser} className="icon absolute top-3 right-3 text-gray-400" />
              <label htmlFor="username" className="sr-only">Username</label>
              <input id="username" name="username" type="text" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Username" />
            </div>
          </div>
          <div className="user-box rounded-md shadow-sm -space-y-px">
            <div>
              <FontAwesomeIcon icon={faLock} className="icon absolute top-3 right-3 text-gray-400" />
              <label htmlFor="password" className="sr-only">Password</label>
              <input id="password" name="password" type="password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password" />
            </div>
          </div>
          <div className="gender-box">
            <h3 className="text-white text-sm font-medium mb-2">Select Gender</h3>
            <div className="flex space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  value="male"
                  checked={gender === 'male'}
                  onChange={handleGenderChange}
                  className="form-checkbox h-4 w-4 text-indigo-600"
                />
                <span className="ml-2 text-white">Male</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  value="female"
                  checked={gender === 'female'}
                  onChange={handleGenderChange}
                  className="form-checkbox h-4 w-4 text-indigo-600"
                />
                <span className="ml-2 text-white">Female</span>
              </label>
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
            <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;