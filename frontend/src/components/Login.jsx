import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Heart, Brain, Users, Shield } from 'lucide-react';

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    university: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { login, register, loading } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    const result = isLogin 
      ? await login(formData.email, formData.password)
      : await register(formData);
    
    if (result.success) {
      if (!isLogin) {
        setSuccess('🎉 Registration successful! Please switch to Login tab to sign in.');
        // Clear the form after successful registration
        setFormData({
          email: '',
          password: '',
          firstName: '',
          lastName: '',
          university: ''
        });
        // Switch to login tab after 2 seconds
        setTimeout(() => {
          setIsLogin(true);
          setSuccess('');
        }, 2000);
      }
    } else {
      setError(result.error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center items-center space-x-2 mb-4">
            <Heart className="h-8 w-8 text-pink-500" />
            <Brain className="h-8 w-8 text-blue-500" />
            <Users className="h-8 w-8 text-purple-500" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">
            Mindful Campus
          </h2>
          <p className="mt-2 text-gray-600">
            Your mental health support companion for higher education
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="p-3 bg-white rounded-lg shadow-sm">
            <Brain className="h-6 w-6 text-blue-500 mx-auto mb-1" />
            <p className="text-xs text-gray-600">AI Chat Support</p>
          </div>
          <div className="p-3 bg-white rounded-lg shadow-sm">
            <Heart className="h-6 w-6 text-pink-500 mx-auto mb-1" />
            <p className="text-xs text-gray-600">Mood Tracking</p>
          </div>
          <div className="p-3 bg-white rounded-lg shadow-sm">
            <Users className="h-6 w-6 text-purple-500 mx-auto mb-1" />
            <p className="text-xs text-gray-600">Peer Support</p>
          </div>
          <div className="p-3 bg-white rounded-lg shadow-sm">
            <Shield className="h-6 w-6 text-green-500 mx-auto mb-1" />
            <p className="text-xs text-gray-600">Safe & Private</p>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex mb-6">
            <button
              type="button"
              className={`flex-1 py-2 px-4 text-sm font-medium rounded-lg transition-colors ${
                isLogin 
                  ? 'bg-primary-600 text-white' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => { setIsLogin(true); setError(''); setSuccess(''); }}
            >
              Login
            </button>
            <button
              type="button"
              className={`flex-1 py-2 px-4 text-sm font-medium rounded-lg transition-colors ${
                !isLogin 
                  ? 'bg-primary-600 text-white' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => { setIsLogin(false); setError(''); setSuccess(''); }}
            >
              Register
            </button>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-4">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-lg mb-4">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    name="firstName"
                    type="text"
                    required={!isLogin}
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                  <input
                    name="lastName"
                    type="text"
                    required={!isLogin}
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <input
                  name="university"
                  type="text"
                  required={!isLogin}
                  placeholder="University"
                  value={formData.university}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </>
            )}
            
            <input
              name="email"
              type="email"
              required
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            
            <input
              name="password"
              type="password"
              required
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary py-3 text-lg font-medium"
            >
              {loading ? 'Please wait...' : (isLogin ? 'Sign In' : 'Create Account')}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              By continuing, you agree to our{' '}
              <a href="#" className="text-primary-600 hover:underline">
                Privacy Policy
              </a>{' '}
              and{' '}
              <a href="#" className="text-primary-600 hover:underline">
                Terms of Service
              </a>
            </p>
          </div>
        </div>

        {/* Crisis Support */}
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Need immediate help? Call{' '}
            <a href="tel:988" className="text-red-600 font-medium hover:underline">
              988
            </a>{' '}
            (Suicide & Crisis Lifeline)
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
