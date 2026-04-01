import { GoogleLogin } from "@react-oauth/google";
import { motion } from "framer-motion";
import { jwtDecode } from "jwt-decode";
import { Lock, Mail, Sparkles, User } from "lucide-react";
import { useState } from "react";

const LoginPage = ({ onLogin }) => {
  const [isSignUp, setIsSignUp] = useState(false);

  // Handle Standard Email/Pass Form
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const name = formData.get("name") || email.split("@")[0];
    onLogin({ name, email, picture: null });
  };

  // Handle Real Google Authentication
  const handleGoogleSuccess = (credentialResponse) => {
    // Decoding the Google JWT to get real user data
    const decoded = jwtDecode(credentialResponse.credential);
    onLogin({
      name: decoded.name,
      email: decoded.email,
      picture: decoded.picture, // Real Google Profile Picture
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-slate-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))]">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="w-full max-w-md p-8 shadow-2xl rounded-3xl glass-panel bg-slate-900 border-purple-500/30 shadow-[0_0_40px_rgba(168,85,247,0.15)]"
      >
        {/* Logo Section */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="p-2 bg-purple-500/20 rounded-xl">
            <Sparkles className="w-6 h-6 text-purple-400" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-transparent bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text">
            PixelAI
          </h1>
        </div>

        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white">
            {isSignUp ? "Create Account" : "Welcome Back"}
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            {isSignUp
              ? "Join PixelAI today."
              : "Enter your details to access your dashboard."}
          </p>
        </div>

        {/* Traditional Login Form */}
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
                className="w-full py-3 pl-12 pr-4 transition-all duration-300 border rounded-xl outline-none glass-panel text-slate-100 placeholder:text-slate-500 border-white/10 focus:border-purple-500/50 focus:neon-glow bg-white/5 focus:bg-white/10"
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
              className="w-full py-3 pl-12 pr-4 transition-all duration-300 border rounded-xl outline-none glass-panel text-slate-100 placeholder:text-slate-500 border-white/10 focus:border-purple-500/50 focus:neon-glow bg-white/5 focus:bg-white/10"
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
              className="w-full py-3 pl-12 pr-4 transition-all duration-300 border rounded-xl outline-none glass-panel text-slate-100 placeholder:text-slate-500 border-white/10 focus:border-purple-500/50 focus:neon-glow bg-white/5 focus:bg-white/10"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 mt-2 font-bold text-white transition-all bg-purple-600 rounded-xl hover:bg-purple-500 hover:shadow-[0_0_20px_rgba(168,85,247,0.4)]"
          >
            {isSignUp ? "Sign Up" : "Log In"}
          </button>
        </form>

        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-white/10"></div>
          <span className="px-3 text-xs font-semibold tracking-wider uppercase text-slate-500">
            Or
          </span>
          <div className="flex-grow border-t border-white/10"></div>
        </div>

        {/* THE FIX: Real Google Login Component with Account Picker */}
        <div className="flex justify-center w-full">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => console.log("Login Failed")}
            theme="filled_black"
            shape="pill"
            text="continue_with"
            size="large"
            width="320"
            prompt="select_account"
            useOneTap
          />
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-sm font-medium transition-colors text-slate-400 hover:text-purple-400"
          >
            {isSignUp
              ? "Already have an account? Log In"
              : "Don't have an account? Sign Up"}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
