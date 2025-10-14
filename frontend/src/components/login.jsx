import React, { useState } from 'react';
import { Link } from "react-router-dom";
export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberPassword, setRememberPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleLogin = async () => {
    // Clear previous messages
    setError('');
    setSuccess('');
    
    // Basic validation
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Login successful!');
        console.log('Login successful:', data);
        
        // Store token if provided
        if (data.token) {
          if (rememberPassword) {
            // Store in memory (could be used for session management)
            window.authToken = data.token;
          }
        }
        
        // Here you could redirect to dashboard or home page
        window.location.href = '/';
      } else {
        setError(data.message || 'Login failed. Please check your credentials.');
      }
    } catch (err) {
      setError('Network error. Please check if the server is running.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div className="min-h-screen bg-blue-600 flex items-center justify-center p-4 sm:p-6 md:p-8">
      <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 w-full max-w-md">
        <h1 className="text-xl sm:text-2xl font-normal text-gray-700 text-center mb-6 sm:mb-8">
          Sign In
        </h1>
        
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
            {error}
          </div>
        )}
        
        {success && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-600 text-sm">
            {success}
          </div>
        )}
        
        <div className="space-y-3 sm:space-y-1">
          <div>
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={loading}
              className="w-full px-4 sm:px-6 py-2.5 sm:py-3 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base text-gray-700 placeholder-gray-400 disabled:bg-gray-50 disabled:cursor-not-allowed"
            />
          </div>
          
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={loading}
              className="w-full px-4 sm:px-6 py-2.5 sm:py-3 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base text-gray-700 placeholder-gray-400 disabled:bg-gray-50 disabled:cursor-not-allowed"
            />
          </div>
          
          <div className="flex items-center space-x-2 px-2">
            <input
              type="checkbox"
              id="remember"
              checked={rememberPassword}
              onChange={(e) => setRememberPassword(e.target.checked)}
              disabled={loading}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 disabled:cursor-not-allowed"
            />
            <label htmlFor="remember" className="text-sm text-gray-600">
              Remember password
            </label>
          </div>
          
          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2.5 sm:py-3 font-medium hover:bg-blue-700 transition-colors duration-200 mt-2 disabled:bg-blue-400 disabled:cursor-not-allowed"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </div>
        
        <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-gray-200">
          <Link to="/Signup" className="text-blue-600 text-sm hover:underline">
            Need an Account? Register Here!
          </Link>
        </div>
      </div>
    </div>
  );
}