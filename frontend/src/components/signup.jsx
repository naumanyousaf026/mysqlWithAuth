// import React, { useState } from 'react';
// import { Link } from "react-router-dom";

// export default function SignUpPage() {
//   const [fullName, setFullName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [agreeTerms, setAgreeTerms] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState(false);

//   const handleSignUp = async () => {
//     // Clear previous messages
//     setError('');
//     setSuccess(false);

//     // Validation
//     if (!fullName.trim()) {
//       setError('Please enter your full name');
//       return;
//     }
//     if (!email.trim()) {
//       setError('Please enter your email address');
//       return;
//     }
//     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
//       setError('Please enter a valid email address');
//       return;
//     }
//     if (!password) {
//       setError('Please enter a password');
//       return;
//     }
//     if (password.length < 6) {
//       setError('Password must be at least 6 characters');
//       return;
//     }
//     if (password !== confirmPassword) {
//       setError('Passwords do not match');
//       return;
//     }
//     if (!agreeTerms) {
//       setError('Please agree to the Terms and Conditions');
//       return;
//     }

//     setLoading(true);

//     try {
//       const response = await fetch('http://localhost:5000/api/auth/register', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           name: fullName,
//           email: email,
//           password: password,
//         }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setSuccess(true);
//         setError('');
//         // Clear form
//         setFullName('');
//         setEmail('');
//         setPassword('');
//         setConfirmPassword('');
//         setAgreeTerms(false);
        
//         // Optional: Redirect after successful signup
//         setTimeout(() => {
//           window.location.href = '/login';
//         }, 2000);
//       } else {
//         setError(data.message || 'Registration failed. Please try again.');
//       }
//     } catch (setError) {
//       setError('Unable to connect to server. Please check your connection.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter') {
//       handleSignUp();
//     }
//   };

//   return (
//     <div className="min-h-screen bg-blue-600 flex items-center justify-center p-4 sm:p-6 md:p-8">
//       <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 w-full max-w-md">
//         <h1 className="text-xl sm:text-2xl font-normal text-gray-700 text-center mb-6 sm:mb-8">
//           Sign Up
//         </h1>
        
//         {error && (
//           <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
//             {error}
//           </div>
//         )}
        
//         {success && (
//           <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-600 text-sm">
//             Registration successful! Welcome aboard.
//           </div>
//         )}
        
//         <div className="space-y-3 sm:space-y-4">
//           <div>
//             <input
//               type="text"
//               placeholder="Full name"
//               value={fullName}
//               onChange={(e) => setFullName(e.target.value)}
//               onKeyPress={handleKeyPress}
//               disabled={loading}
//               className="w-full px-4 sm:px-6 py-2.5 sm:py-3 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base text-gray-700 placeholder-gray-400 disabled:bg-gray-50 disabled:cursor-not-allowed"
//             />
//           </div>
          
//           <div>
//             <input
//               type="email"
//               placeholder="Email address"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               onKeyPress={handleKeyPress}
//               disabled={loading}
//               className="w-full px-4 sm:px-6 py-2.5 sm:py-3 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base text-gray-700 placeholder-gray-400 disabled:bg-gray-50 disabled:cursor-not-allowed"
//             />
//           </div>
          
//           <div>
//             <input
//               type="password"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               onKeyPress={handleKeyPress}
//               disabled={loading}
//               className="w-full px-4 sm:px-6 py-2.5 sm:py-3 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base text-gray-700 placeholder-gray-400 disabled:bg-gray-50 disabled:cursor-not-allowed"
//             />
//           </div>
          
//           <div>
//             <input
//               type="password"
//               placeholder="Confirm password"
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//               onKeyPress={handleKeyPress}
//               disabled={loading}
//               className="w-full px-4 sm:px-6 py-2.5 sm:py-3 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base text-gray-700 placeholder-gray-400 disabled:bg-gray-50 disabled:cursor-not-allowed"
//             />
//           </div>
          
//           <div className="flex items-center space-x-2 px-2">
//             <input
//               type="checkbox"
//               id="terms"
//               checked={agreeTerms}
//               onChange={(e) => setAgreeTerms(e.target.checked)}
//               disabled={loading}
//               className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 disabled:cursor-not-allowed"
//             />
//             <label htmlFor="terms" className="text-sm text-gray-600">
//               I agree to the Terms and Conditions
//             </label>
//           </div>
          
//           <button
//             onClick={handleSignUp}
//             disabled={loading}
//             className="w-full bg-blue-600 text-white py-2.5 sm:py-3 font-medium hover:bg-blue-700 transition-colors duration-200 mt-2 disabled:bg-blue-400 disabled:cursor-not-allowed"
//           >
//             {loading ? 'Signing Up...' : 'Sign Up'}
//           </button>
//         </div>
        
//         <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-gray-200">
//           <Link to="/login"  className="text-blue-600 text-sm hover:underline">
//             Already have an Account? Login Here!
//           </Link>
//         </div>
//       </div>
  
//     </div>
//   );
// }
import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    // Clear previous messages
    setError('');
    setSuccess(false);

    // Validation
    if (!fullName.trim()) {
      setError('Please enter your full name');
      return;
    }
    if (!email.trim()) {
      setError('Please enter your email address');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }
    if (!password) {
      setError('Please enter a password');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    if (!agreeTerms) {
      setError('Please agree to the Terms and Conditions');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: fullName,
          email: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        setError('');
        // Clear form
        setFullName('');
        setEmail('');
        setPassword('');
        setAgreeTerms(false);
        
        // Optional: Redirect after successful signup
        setTimeout(() => {
          window.location.href = '/login';
        }, 2000);
      } else {
        setError(data.message || 'Registration failed. Please try again.');
      }
    } catch (setError) {
      setError('Unable to connect to server. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSignUp();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 lg:p-8">
      <div className="flex flex-col lg:flex-row max-w-5xl w-full bg-white rounded-xl shadow-xl overflow-hidden" style={{ maxHeight: '95vh' }}>
        
        {/* Left Side - Form */}
        <div className="flex-1 flex items-center justify-center p-6 lg:p-8 bg-white">
          <div className="w-full max-w-sm">
            <div className="mt-4 mb-4 lg:mt-10 lg:mb-6">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-base">C</span>
                </div>
                <span className="text-xl font-semibold">DAILY</span>
              </div>
            </div>

            <div>
              <h1 className="text-2xl font-semibold mb-5">Create an account</h1>

              {/* Error Message */}
              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg">
                  {error}
                </div>
              )}

              {/* Success Message */}
              {success && (
                <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-600 text-sm rounded-lg">
                  Account created successfully! Redirecting to login...
                </div>
              )}

              <div className="mb-4">
                <label className="block text-sm font-medium mb-1.5">Name</label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="w-full px-3 py-2 text-sm bg-gray-50 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-1.5">Email</label>
                <input
                  type="email"
                  placeholder="Enter your mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="w-full px-3 py-2 text-sm bg-gray-50 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-1.5">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="w-full px-3 py-2 text-sm bg-gray-50 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div className="mb-4 flex items-center gap-2">
                <input
                  type="checkbox"
                  id="terms"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="w-4 h-4 text-blue-600 cursor-pointer"
                  style={{ accentColor: '#2563eb' }}
                />
                <label htmlFor="terms" className="text-xs cursor-pointer">
                  I agree to all the Terms & Conditions
                </label>
              </div>

              <button 
                onClick={handleSignUp}
                disabled={loading}
                className="w-full py-2 text-sm bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition mb-4 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Signing up...' : 'Sign up'}
              </button>

              <div className="relative mb-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">Or</span>
                </div>
              </div>

              <div className="flex gap-3 mb-5">
                <button className="flex-1 py-2 text-sm border border-gray-200 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition">
                  <svg width="16" height="16" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span className="font-medium text-sm">Google</span>
                </button>
                <button className="flex-1 py-2 text-sm border border-gray-200 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="#1877F2">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <span className="font-medium text-sm">Facebook</span>
                </button>
              </div>

              <div className="text-center text-xs">
                <span className="text-gray-600">Already have an account? </span>
                <a href="/login" className="text-blue-600 font-medium hover:underline">Log in</a>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Analytics Cards */}
        <div className="hidden lg:flex flex-1 bg-gradient-to-br from-blue-600 to-blue-700 p-6 flex-col items-center justify-center relative overflow-hidden">
          {/* Decorative Shapes */}
          <div className="absolute top-12 right-12 w-10 h-10 bg-blue-500 opacity-30 rounded"></div>
          <div className="absolute top-20 right-20 w-6 h-6 bg-blue-500 opacity-20 rounded"></div>
          <div className="absolute top-16 right-32 w-5 h-5 bg-blue-500 opacity-25 rounded"></div>
          <div className="absolute bottom-20 left-12 w-12 h-12 bg-blue-500 opacity-20 rounded"></div>
          <div className="absolute bottom-24 left-24 w-8 h-8 bg-blue-500 opacity-25 rounded"></div>
          <div className="absolute bottom-28 left-36 w-5 h-5 bg-blue-500 opacity-30 rounded"></div>

          {/* Analytics Chart Card */}
          <div className="bg-white rounded-xl p-4 shadow-xl max-w-sm w-full mb-4 relative z-10">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-base font-semibold">Analytics</h2>
              <div className="flex gap-1">
                <button className="px-2 py-0.5 text-xs bg-gray-100 rounded-full">Weekly</button>
                <button className="px-2 py-0.5 text-xs text-gray-600 rounded-full">Monthly</button>
                <button className="px-2 py-0.5 text-xs text-gray-600 rounded-full">Yearly</button>
              </div>
            </div>

            <div className="mb-2 relative h-24">
              <svg className="w-full h-full" viewBox="0 0 300 100" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="gradient1" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#94a3b8" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#94a3b8" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d="M 0 60 Q 30 50 60 55 T 120 45 T 180 50 T 240 40 T 300 35" stroke="#94a3b8" strokeWidth="2" fill="url(#gradient1)" />
                <path d="M 0 70 Q 30 65 60 60 T 120 55 T 180 65 T 240 55 T 300 50" stroke="#cbd5e1" strokeWidth="2" fill="none" />
              </svg>
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>MON</span>
                <span>TUE</span>
                <span>WED</span>
                <span>THU</span>
              </div>
            </div>
          </div>

          {/* Circular Progress Card */}
          <div className="bg-white rounded-xl p-4 shadow-xl max-w-sm w-full mb-4 relative z-10">
            <div className="flex items-center justify-center h-32">
              <div className="relative w-28 h-28">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                  <circle cx="60" cy="60" r="50" fill="none" stroke="#e5e7eb" strokeWidth="10" />
                  <circle 
                    cx="60" cy="60" r="50" 
                    fill="none" 
                    stroke="#2563eb" 
                    strokeWidth="10"
                    strokeDasharray="314"
                    strokeDashoffset="182"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="text-xs text-gray-600">Total</div>
                  <div className="text-xl font-bold">42%</div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Text */}
          <div className="text-center text-white mt-4 relative z-10 px-4">
            <h2 className="text-lg font-semibold mb-1.5">Very simple way you can engage</h2>
            <p className="text-blue-100 text-xs max-w-xs">
              Welcome to (DAILY) Inventory Management System! Efficiently track and manage your inventory with ease.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}