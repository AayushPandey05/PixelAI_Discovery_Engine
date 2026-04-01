import { AnimatePresence, motion } from "framer-motion";
import { Lock, Mail, User, X } from "lucide-react";
import { useEffect, useState } from "react";
// Added these two imports for real Google Auth
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

const LoginModal = ({ isOpen, onClose, onLogin }) => {
  const [isSignUp, setIsSignUp] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const name = formData.get("name") || email.split("@")[0];
    onLogin({ name, email });
  };

  // Updated placeholder function to handle real Google Data
  const handleGoogleSuccess = (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    onLogin({
      name: decoded.name,
      email: decoded.email,
      picture: decoded.picture,
    });
    onClose();
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
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-md p-8 overflow-hidden border shadow-2xl rounded-3xl bg-slate-900 border-purple-500/30 shadow-[0_0_40px_rgba(168,85,247,0.15)]"
        >
          {/* Close button - Unchanged */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 text-slate-300 transition-colors rounded-full bg-slate-950/50 hover:bg-slate-800 hover:text-white backdrop-blur-sm"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="text-center mb-8 mt-2">
            <h2 className="text-3xl font-bold tracking-tight text-transparent bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text">
              {isSignUp ? "Create Account" : "Welcome Back"}
            </h2>

            <p className="mt-2 text-sm text-slate-400">
              {isSignUp
                ? "Join PixelAI today."
                : "Enter your details to access your dashboard."}
            </p>
          </div>

          {/* Form - Unchanged */}
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
              {isSignUp ? "Sign Up" : "Log In"}
            </button>
          </form>

          <div className="flex items-center my-6">
            <div className="flex-grow border-t border-white/10"></div>
            <span className="px-3 text-xs font-semibold tracking-wider text-slate-500 uppercase">
              Or
            </span>
            <div className="flex-grow border-t border-white/10"></div>
          </div>

          {/* This is the ONLY part I changed: Integrating the official GoogleLogin component */}
          <div className="flex justify-center w-full">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => console.log("Login Failed")}
              theme="filled_black"
              shape="pill"
              text="continue_with"
              size="large"
              logo_alignment="left"
              width="320"
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
      </motion.div>
    </AnimatePresence>
  );
};

export default LoginModal;
