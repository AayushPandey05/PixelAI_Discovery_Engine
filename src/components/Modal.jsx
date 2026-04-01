import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, Download, Info, Loader2 } from 'lucide-react';

const Modal = ({ image, onClose }) => {
  const [isDownloading, setIsDownloading] = useState(false);
  useEffect(() => {
    if (image) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [image]);

  const handleDownload = async (e) => {
    e.preventDefault();
    if (isDownloading) return;
    
    setIsDownloading(true);
    try {
      // Force direct download utilizing BLOB extraction
      const response = await fetch(image.urls.full);
      if (!response.ok) throw new Error('Network response was not ok');
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = `pixelai-${image.id}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error('Error downloading image:', error);
      // Fallback
      window.open(image.urls.full, '_blank');
    } finally {
      setIsDownloading(false);
    }
  };

  if (!image) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          className="relative flex flex-col w-full max-w-5xl max-h-full overflow-hidden border shadow-2xl rounded-2xl md:flex-row bg-slate-900 border-white/10"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 text-slate-300 transition-colors rounded-full bg-slate-950/50 hover:bg-slate-800 hover:text-white backdrop-blur-sm"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Image Section */}
          <div className="flex items-center justify-center flex-1 bg-black/50 md:w-2/3 min-h-[300px]">
            <img
              src={image.urls.regular}
              alt={image.alt_description || 'High-res viewing'}
              className="object-contain w-full h-full max-h-[75vh]"
            />
          </div>

          {/* Details Section */}
          <div className="flex flex-col p-6 border-t md:w-1/3 md:border-t-0 md:border-l border-white/10 bg-slate-900/90 text-slate-200">
            <h2 className="mb-2 text-2xl font-semibold tracking-tight text-white">
              {image.user.name}
            </h2>
            <p className="mb-6 text-sm italic text-slate-400">
              {image.alt_description ? `"${image.alt_description}"` : 'No description provided.'}
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 border rounded-full bg-white/5 border-white/10">
                  <Heart className="w-4 h-4 text-pink-500" />
                </div>
                <div>
                  <p className="text-xs text-slate-500">Likes</p>
                  <p className="font-medium text-slate-300">{image.likes || Math.floor(Math.random() * 1000) + 50}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 border rounded-full bg-white/5 border-white/10">
                  <Download className="w-4 h-4 text-purple-400" />
                </div>
                <div>
                  <p className="text-xs text-slate-500">Downloads</p>
                  <p className="font-medium text-slate-300">{Math.floor(Math.random() * 5000) + 100}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 border rounded-full bg-white/5 border-white/10">
                  <Info className="w-4 h-4 text-blue-400" />
                </div>
                <div>
                  <p className="text-xs text-slate-500">Resolution</p>
                  <p className="font-medium text-slate-300">{image.width || 4000} x {image.height || 3000}</p>
                </div>
              </div>
            </div>

            <div className="mt-auto pt-6">
              <button
                onClick={handleDownload}
                disabled={isDownloading}
                className="flex items-center justify-center w-full gap-2 px-4 py-3 font-medium text-white transition-all bg-purple-600 rounded-xl hover:bg-purple-500 hover:neon-glow disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isDownloading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Download className="w-5 h-5" />
                )}
                {isDownloading ? 'Downloading...' : 'Download High-Res'}
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Modal;
