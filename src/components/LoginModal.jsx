import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User } from 'lucide-react';

const LoginModal = ({ isOpen, onClose, onLogin }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get('email');
    const name = formData.get('name') || email.split('@')[0];
    onLogin({ name, email });
  };

  const handleGoogleLogin = () => {
    // Placeholder GSI logic using dummy clientId
    const clientId = "1234567890-mockclientid.apps.googleusercontent.com";
    console.log(`Initialized Google SignIn with ClientID: ${clientId}`);
    onLogin({ name: 'Google User', email: 'google.auth@user.com' });
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-xl"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-md p-8 overflow-hidden border shadow-2xl rounded-3xl bg-slate-900 border-purple-500/30 shadow-[0_0_40px_rgba(168,85,247,0.15)]"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 text-slate-300 transition-colors rounded-full bg-slate-950/50 hover:bg-slate-800 hover:text-white backdrop-blur-sm"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="text-center mb-8 mt-2">
            <h2 className="text-3xl font-bold tracking-tight text-transparent bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text">
              {isSignUp ? 'Create Account' : 'Welcome Back'}
            </h2>
            <p className="mt-2 text-sm text-slate-400">
              {isSignUp ? 'Join PixelAI today.' : 'Enter your details to access your dashboard.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-400">
                  <User className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  name="name"
                  autoComplete="name"
                  required
                  placeholder="Full Name"
                  className="w-full py-3 pl-12 pr-4 transition-all duration-300 border rounded-xl outline-none glass-panel text-slate-100 placeholder:text-slate-500 border-white/10 focus:border-purple-500/50 focus:neon-glow bg-slate-950/50 focus:bg-slate-950/80"
                />
              </div>
            )}

            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-400">
                <Mail className="w-5 h-5" />
              </div>
              <input
                type="email"
                name="email"
                autoComplete="email"
                required
                placeholder="Email Address"
                className="w-full py-3 pl-12 pr-4 transition-all duration-300 border rounded-xl outline-none glass-panel text-slate-100 placeholder:text-slate-500 border-white/10 focus:border-purple-500/50 focus:neon-glow bg-slate-950/50 focus:bg-slate-950/80"
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-400">
                <Lock className="w-5 h-5" />
              </div>
              <input
                type="password"
                name="password"
                autoComplete={isSignUp ? "new-password" : "current-password"}
                required
                placeholder="Password"
                className="w-full py-3 pl-12 pr-4 transition-all duration-300 border rounded-xl outline-none glass-panel text-slate-100 placeholder:text-slate-500 border-white/10 focus:border-purple-500/50 focus:neon-glow bg-slate-950/50 focus:bg-slate-950/80"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 mt-2 font-bold text-white transition-all bg-purple-600 rounded-xl hover:bg-purple-500 hover:shadow-[0_0_20px_rgba(168,85,247,0.4)]"
            >
              {isSignUp ? 'Sign Up' : 'Log In'}
            </button>
          </form>

          <div className="flex items-center my-6">
            <div className="flex-grow border-t border-white/10"></div>
            <span className="px-3 text-xs font-semibold tracking-wider text-slate-500 uppercase">Or</span>
            <div className="flex-grow border-t border-white/10"></div>
          </div>

          <button
            type="button"
            onClick={handleGoogleLogin}
            className="flex items-center justify-center w-full gap-3 py-3 font-medium transition-all border rounded-xl bg-slate-950/30 border-white/10 hover:bg-white/10 text-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5" xmlns="http://www.w3.org/2000/svg">
              <path fill="#EA4335" d="M5.266 9.765A7.077 7.077 0 0112 4.909c1.69 0 3.218.6 4.418 1.582L19.91 3C17.782 1.145 15.055 0 12 0 7.27 0 3.198 2.698 1.24 6.65l4.026 3.115z"/>
              <path fill="#34A853" d="M16.04 18.013c-1.09.703-2.474 1.078-4.04 1.078a7.077 7.077 0 01-6.723-4.823l-4.04 3.067A11.965 11.965 0 0012 24c2.933 0 5.735-1.043 7.834-3l-3.793-2.987z"/>
              <path fill="#4A90E2" d="M19.834 21c2.195-2.048 3.62-5.096 3.62-9 0-.71-.109-1.473-.272-2.182H12v4.637h6.436c-.317 1.559-1.17 2.766-2.395 3.558L19.834 21z"/>
              <path fill="#FBBC05" d="M5.277 14.268A7.12 7.12 0 014.909 12c0-.782.125-1.533.357-2.235L1.24 6.65A11.934 11.934 0 000 12c0 1.92.445 3.73 1.237 5.335l4.04-3.067z"/>
            </svg>
            Sign in with Google
          </button>

          <div className="mt-8 text-center">
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-sm font-medium transition-colors text-slate-400 hover:text-purple-400"
            >
              {isSignUp ? 'Already have an account? Log In' : "Don't have an account? Sign Up"}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LoginModal;
