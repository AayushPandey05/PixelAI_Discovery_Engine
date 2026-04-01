import { motion } from "framer-motion";
import { Search, Sparkles } from "lucide-react";
import { useState } from "react";
import UserDropdown from "./UserDropdown";

const tags = [
  "Nature",
  "Tech",
  "Architecture",
  "Neon",
  "Abstract",
  "Cyberpunk",
  "Space",
  "Minimalist",
];

const Header = ({
  onSearch,
  user,
  onLoginClick,
  onLogout,
  showFavorites,
  onToggleFavoritesView,
}) => {
  const [inputVal, setInputVal] = useState("");

  const handleChange = (e) => {
    setInputVal(e.target.value);
    onSearch(e.target.value);
  };

  const handleTagClick = (tag) => {
    setInputVal(tag);
    onSearch(tag);
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="fixed top-0 left-0 right-0 z-50 flex flex-col items-center px-6 py-4 border-b shadow-xl glass-panel border-white/5 bg-slate-950/70 backdrop-blur-xl"
    >
      <div className="flex items-center justify-between w-full max-w-7xl">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-purple-500/20 rounded-xl">
            <Sparkles className="w-6 h-6 text-purple-400" />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-transparent hidden sm:block bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text">
            PixelAI
          </h1>
        </div>

        <div className="relative w-full max-w-2xl mx-4 sm:mx-8">
          <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-400">
            <Search className="w-5 h-5" />
          </div>
          <input
            type="text"
            value={inputVal}
            onChange={handleChange}
            placeholder="Discover futuristic art, neon cities..."
            className="w-full py-3 pl-12 pr-4 transition-all duration-300 border rounded-full outline-none glass-panel text-slate-100 placeholder:text-slate-500 border-white/10 focus:border-purple-500/50 focus:neon-glow bg-white/5 focus:bg-white/10"
          />
        </div>

        <div className="flex items-center gap-4 shrink-0">
          {user ? (
            <UserDropdown
              user={user}
              onSignOut={onLogout}
              showFavorites={showFavorites}
              onToggleFavoritesView={onToggleFavoritesView}
            />
          ) : (
            <button
              onClick={onLoginClick}
              className="hidden sm:block px-5 py-2 text-sm font-semibold tracking-wide text-white transition-colors border rounded-full bg-white/5 border-white/20 hover:bg-white/10 shadow-[0_0_10px_rgba(168,85,247,0.15)] hover:shadow-[0_0_15px_rgba(168,85,247,0.4)] hover:border-purple-500/50"
            >
              Log In
            </button>
          )}
        </div>
      </div>

      {/* Quick Search Tags */}
      <div className="flex flex-wrap items-center w-full gap-2 pt-4 pb-2 mt-2 border-t max-w-7xl border-white/5">
        {/* <span className="mr-2 text-xs font-semibold tracking-wider uppercase text-slate-500 shrink-0">Trending</span> */}
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => handleTagClick(tag)}
            className="px-4 py-1.5 text-sm font-medium transition-all duration-200 border rounded-full text-slate-300 border-white/10 hover:border-purple-500/50 hover:text-purple-300 hover:bg-purple-900/20 whitespace-nowrap"
          >
            {tag}
          </button>
        ))}
      </div>
    </motion.header>
  );
};

export default Header;
