import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Eye, EyeOff } from 'lucide-react';

export default function InventoryLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
          if (rememberMe) {
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
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl bg-white shadow-2xl overflow-hidden">
        <div className="grid md:grid-cols-2 min-h-[250px]">
          {/* Left Side - Login Form */}
          <div className="p-6 md:p-8 lg:p-10 flex flex-col justify-center">
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-7 h-7 bg-blue-600 rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 border-2 border-white rounded-full"></div>
                </div>
                <span className="text-xl font-bold text-gray-800">DAILY</span>
              </div>
              
              <h1 className="text-2xl font-bold text-gray-800 mb-2">Welcome Back!</h1>
              <p className="text-gray-500 text-sm">Please enter log in details below</p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* Success Message */}
            {success && (
              <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm">
                {success}
              </div>
            )}

            <div className="space-y-5">
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Enter your mail"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Enter your password"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition pr-12"
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    disabled={loading}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-600 focus:ring-2"
                    disabled={loading}
                  />
                  <span className="ml-2 text-sm text-gray-700">Remember me</span>
                </label>
                <Link to="#" className="text-sm text-blue-600 hover:underline">
                  Forgot password?
                </Link>
              </div>

              <button 
                onClick={handleLogin}
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Logging in...' : 'Log in'}
              </button>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">Or</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button className="flex items-center justify-center gap-2 px-4 py-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition">
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span className="text-sm font-medium text-gray-700">Google</span>
                </button>
                <button className="flex items-center justify-center gap-2 px-4 py-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition">
                  <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <span className="text-sm font-medium text-gray-700">Facebook</span>
                </button>
              </div>

              <p className="text-center text-sm text-gray-600 mt-6">
                Don't have an account?{' '}
                <Link to="/Signup" className="text-blue-600 font-medium hover:underline">
                  Sign Up
                </Link>
              </p>
            </div>
          </div>

          {/* Right Side - Inventory Management Info */}
          <div className="relative bg-gradient-to-br from-blue-600 to-blue-700 p-6 md:p-8 lg:p-10 flex flex-col justify-center overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-10 right-10 w-20 h-20 border-4 border-white rounded-lg"></div>
              <div className="absolute top-32 right-32 w-16 h-16 border-4 border-white rounded-lg"></div>
              <div className="absolute bottom-32 left-10 w-12 h-12 bg-white rounded"></div>
              <div className="absolute bottom-48 left-24 w-16 h-16 bg-white rounded"></div>
            </div>

            <div className="relative z-10 mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Inventory Management
              </h2>
              <p className="text-blue-100 text-sm md:text-base leading-relaxed">
                Join our platform to streamline your inventory processes,<br />
                reduce costs, and enhance productivity.
              </p>
            </div>

            {/* Dashboard Preview Card */}
            <div className="relative z-10 mt-8">
              <div className="bg-white rounded-2xl shadow-2xl p-6 transform rotate-3 hover:rotate-0 transition-transform duration-300">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                    <div className="w-3 h-3 border-2 border-white rounded-full"></div>
                  </div>
                  <span className="text-lg font-bold text-gray-800">DAILY</span>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="h-8 bg-blue-600 rounded"></div>
                  <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex items-end justify-between mb-2">
                    <span className="text-lg font-semibold text-gray-700">Analytics</span>
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                      <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                    </div>
                  </div>
                  
                  {/* Chart */}
                  <div className="flex items-end gap-2 h-24">
                    <div className="flex-1 flex flex-col justify-end">
                      <div className="bg-gray-200 rounded-t" style={{height: '40%'}}></div>
                      <span className="text-xs text-gray-500 text-center mt-1">MON</span>
                    </div>
                    <div className="flex-1 flex flex-col justify-end">
                      <div className="bg-blue-200 rounded-t" style={{height: '65%'}}></div>
                      <span className="text-xs text-gray-500 text-center mt-1">TUE</span>
                    </div>
                    <div className="flex-1 flex flex-col justify-end">
                      <div className="bg-blue-300 rounded-t" style={{height: '50%'}}></div>
                      <span className="text-xs text-gray-500 text-center mt-1">WED</span>
                    </div>
                    <div className="flex-1 flex flex-col justify-end">
                      <div className="bg-gray-200 rounded-t" style={{height: '75%'}}></div>
                      <span className="text-xs text-gray-500 text-center mt-1">THU</span>
                    </div>
                    <div className="flex-1 flex flex-col justify-end">
                      <div className="bg-gray-200 rounded-t" style={{height: '55%'}}></div>
                      <span className="text-xs text-gray-500 text-center mt-1">FRI</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}