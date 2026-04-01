import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LogOut, Heart, User } from 'lucide-react';

const UserDropdown = ({ user, onSignOut, showFavorites, onToggleFavoritesView }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        title="Open User Menu"
        className="flex items-center justify-center w-10 h-10 font-bold text-white transition-transform border rounded-full border-white/10 bg-gradient-to-tr from-purple-600 to-pink-500 hover:scale-105 hover:neon-glow focus:outline-none"
      >
        {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="absolute right-0 w-64 mt-3 overflow-hidden border shadow-2xl glass-panel bg-slate-900/90 rounded-2xl border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.5)] z-[60]"
          >
            <div className="p-4 border-b border-white/10 bg-white/5">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 font-bold text-white rounded-full bg-gradient-to-tr from-purple-600 to-pink-500 shrink-0">
                  {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                </div>
                <div className="overflow-hidden">
                  <p className="font-medium text-white truncate">{user?.name || 'User'}</p>
                  <p className="text-sm truncate text-slate-400">{user?.email || 'user@example.com'}</p>
                </div>
              </div>
            </div>

            <div className="p-2 space-y-1">
              <button
                onClick={() => {
                  onToggleFavoritesView();
                  setIsOpen(false);
                }}
                className={`flex items-center w-full gap-3 px-3 py-2.5 text-sm font-medium transition-colors rounded-xl ${showFavorites ? 'bg-purple-500/20 text-purple-300' : 'text-slate-300 hover:bg-white/5 hover:text-white'}`}
              >
                <Heart className={`w-4 h-4 ${showFavorites ? 'text-pink-500 fill-pink-500' : 'text-slate-400'}`} />
                {showFavorites ? 'View All Images' : 'My Favorites'}
              </button>
            </div>

            <div className="p-2 border-t border-white/10">
              <button
                onClick={() => {
                  onSignOut();
                  setIsOpen(false);
                }}
                className="flex items-center w-full gap-3 px-3 py-2.5 text-sm font-medium transition-colors rounded-xl text-red-400 hover:bg-red-500/10 hover:text-red-300"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserDropdown;
