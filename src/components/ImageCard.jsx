import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bookmark, ArrowDownToLine, Heart } from 'lucide-react';

const ImageCard = ({ image, index, onClick, isFavorite, onToggleFavorite }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ 
        type: 'spring', 
        stiffness: 100, 
        damping: 15, 
        delay: index * 0.05 > 1 ? 0 : index * 0.05 
      }}
      className="relative overflow-hidden cursor-zoom-in rounded-2xl glass-panel"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <motion.img
        src={image.urls.regular}
        alt={image.alt_description || 'Unsplash Image'}
        className="w-full h-auto origin-center object-cover block"
        animate={{ scale: isHovered ? 1.05 : 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        loading="lazy"
      />
      
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/40"
          >
            {/* Top actions */}
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="absolute right-4 top-4 flex gap-2"
            >
              <motion.button 
                whileTap={{ scale: 0.8 }}
                className={`flex items-center justify-center p-2.5 transition-colors border rounded-full backdrop-blur-md ${isFavorite ? 'bg-pink-500/20 border-pink-500/50' : 'bg-white/10 border-white/20 hover:bg-white/20'}`}
                onClick={(e) => {
                  e.stopPropagation();
                  if(onToggleFavorite) onToggleFavorite(image);
                }}
              >
                <Heart className={`w-4 h-4 transition-colors ${isFavorite ? 'text-pink-500 fill-pink-500' : 'text-slate-100'}`} />
              </motion.button>
              
              <button 
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors border rounded-full bg-white/10 backdrop-blur-md border-white/20 hover:bg-purple-600 hover:border-purple-500 text-slate-100 hover:neon-glow"
                onClick={(e) => {
                  e.stopPropagation();
                  // Save logic mock
                }}
              >
                <Bookmark className="w-4 h-4" />
                Save
              </button>
            </motion.div>

            {/* Bottom details */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="absolute bottom-0 left-0 right-0 p-5"
            >
              <div className="flex items-end justify-between">
                <div className="flex items-center gap-3 truncate">
                  <div className="flex items-center justify-center w-8 h-8 font-bold text-white rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 shrink-0">
                    {image.user.name.charAt(0)}
                  </div>
                  <div className="truncate">
                    <p className="font-medium text-white truncate drop-shadow-md">
                      {image.user.name}
                    </p>
                    <p className="text-sm font-light truncate text-slate-300 drop-shadow-md">
                      Photographer
                    </p>
                  </div>
                </div>
                
                <a 
                  href={image.links?.download || image.urls.full} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 transition-colors bg-white border rounded-full text-slate-900 border-white/20 hover:bg-slate-200 shrink-0"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ArrowDownToLine className="w-5 h-5" />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ImageCard;