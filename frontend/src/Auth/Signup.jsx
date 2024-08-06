import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../sass/Auth.scss';

const SignupPage = () => {
  const [fullname, setFullname] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [gender, setGender] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      const response = await axios.post('http://localhost:5000/api/auth/signup', {
        fullname,
        username,
        password,
        confirmPassword,
        gender
      });
      console.log('Signup successful', response.data);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred during signup');
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-12 bg-center bg-cover bg-login-image sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 login-box">
        <h2 className="mt-6 text-3xl font-extrabold text-center text-white">Signup</h2>
        {error && <p className="text-center text-red-500">{error}</p>}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="-space-y-px rounded-md shadow-sm user-box">
            <div>
              <FontAwesomeIcon icon={faUser} className="absolute text-gray-400 icon top-3 right-3" />
              <label htmlFor="fullname" className="sr-only">Fullname</label>
              <input 
                id="fullname" 
                name="fullname" 
                type="text" 
                required 
                className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" 
                placeholder="Fullname" 
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
              />
            </div>
          </div>
          <div className="-space-y-px rounded-md shadow-sm user-box">
            <div>
              <FontAwesomeIcon icon={faUser} className="absolute text-gray-400 icon top-3 right-3" />
              <label htmlFor="username" className="sr-only">Username</label>
              <input 
                id="username" 
                name="username" 
                type="text" 
                required 
                className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" 
                placeholder="Username" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>
          <div className="-space-y-px rounded-md shadow-sm user-box">
            <div>
              <FontAwesomeIcon icon={faLock} className="absolute text-gray-400 icon top-3 right-3" />
              <label htmlFor="password" className="sr-only">Password</label>
              <input 
                id="password" 
                name="password" 
                type="password" 
                required 
                className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" 
                placeholder="Password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="-space-y-px rounded-md shadow-sm user-box">
            <div>
              <FontAwesomeIcon icon={faLock} className="absolute text-gray-400 icon top-3 right-3" />
              <label htmlFor="confirmPassword" className="sr-only">Confirm Password</label>
              <input 
                id="confirmPassword" 
                name="confirmPassword" 
                type="password" 
                required 
                className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" 
                placeholder="Confirm Password" 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="gender-box">
            <h3 className="mb-2 text-sm font-medium text-white">Select Gender</h3>
            <div className="flex space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  value="male"
                  checked={gender === 'male'}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-4 h-4 text-indigo-600 form-radio"
                />
                <span className="ml-2 text-white">Male</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  value="female"
                  checked={gender === 'female'}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-4 h-4 text-indigo-600 form-radio"
                />
                <span className="ml-2 text-white">Female</span>
              </label>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-sm">
              <a href="/login" className="font-medium text-white hover:text-red-300">
                Already Have an account?
                <span className="ml-2 font-bold">Login here</span>
              </a>
            </div>
          </div>
          <div>
            <button type="submit" className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md group hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;