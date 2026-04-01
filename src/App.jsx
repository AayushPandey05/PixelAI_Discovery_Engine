import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import ImageCard from './components/ImageCard';
import Skeleton from './components/Skeleton';
import BackToTop from './components/BackToTop';
import Modal from './components/Modal';
import LoginPage from './components/LoginPage';

function App() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const defaultQueries = [
    'neon futuristic', 'cyberpunk city', 'space exploration', 
    'abstract 3d', 'vaporwave', 'synthwave landscape', 'bioluminescence'
  ];
  const [query, setQuery] = useState(() => defaultQueries[Math.floor(Math.random() * defaultQueries.length)]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showFavorites, setShowFavorites] = useState(false);
  
  // Auth state with persisted localStorage logic
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error('Failed to parse user', e);
      }
    }
  }, []);

  // Favorites state with persisted localStorage logic
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('pixelai_favorites');
    return saved ? JSON.parse(saved) : [];
  });

  // Sync state to local storage
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('pixelai_favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (image) => {
    setFavorites(prev => {
      const exists = prev.find(img => img.id === image.id);
      if (exists) {
        return prev.filter(img => img.id !== image.id);
      } else {
        return [image, ...prev];
      }
    });
  };

  // Main Fetch Logic mapped with Infinite Scroll constraints
  useEffect(() => {
    if (!user || showFavorites) return;

    const fetchImages = async () => {
      if (page === 1) {
        setLoading(true);
      } else {
        setIsFetchingMore(true);
      }
      
      setError(null);
      
      try {
        const apiKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
        if (!apiKey) {
          throw new Error('No API key found. Using mock data.');
        }

        const res = await axios.get('https://api.unsplash.com/search/photos', {
          params: { query, per_page: 20, page },
          headers: {
            Authorization: `Client-ID ${apiKey}`
          }
        });
        
        setImages(prev => page === 1 ? res.data.results : [...prev, ...res.data.results]);
      } catch (err) {
        console.warn('Falling back to mock images:', err.message);
        
        // Build mock data uniquely keyed per page
        const fallbackImages = Array.from({ length: 20 }).map((_, i) => ({
          id: `mock-${query.replace(/\s/g, '')}-p${page}-${i}`,
          urls: { 
            regular: `https://picsum.photos/seed/${page * 20 + i + query.replace(/\s/g, '')}/400/${Math.floor(Math.random() * (600 - 300) + 300)}`,
            full: `https://picsum.photos/seed/${page * 20 + i + query.replace(/\s/g, '')}/1200/${Math.floor(Math.random() * (1600 - 800) + 800)}`
          },
          alt_description: `Mock image for ${query}`,
          user: { name: `Creator ${page * 20 + i}` }
        }));
        
        setImages(prev => page === 1 ? fallbackImages : [...prev, ...fallbackImages]);
      } finally {
        setTimeout(() => {
          setLoading(false);
          setIsFetchingMore(false);
        }, 800);
      }
    };

    const debounceTimer = setTimeout(() => {
      fetchImages();
    }, page === 1 ? 500 : 0);

    return () => clearTimeout(debounceTimer);
  }, [query, user, showFavorites, page]);

  // Infinite Scroll Listener
  useEffect(() => {
    if (!user || showFavorites || loading || isFetchingMore) return;

    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >= 
        document.documentElement.offsetHeight - 500
      ) {
        setPage(prevPage => prevPage + 1);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [user, showFavorites, loading, isFetchingMore]);

  // Conditional Architecture Rendering
  if (!user) {
    return <LoginPage onLogin={(userData) => setUser(userData)} />;
  }

  const displayImages = showFavorites ? favorites : images;

  return (
    <div className="relative min-h-screen pb-12 overflow-hidden bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))]">
      <Header 
        onSearch={(v) => {
          setQuery(v || 'neon futuristic');
          setPage(1);
          setShowFavorites(false); // Snap back to feed on new search
        }} 
        user={user}
        onLoginClick={() => {}}
        onLogout={() => setUser(null)}
        showFavorites={showFavorites}
        onToggleFavoritesView={() => setShowFavorites(!showFavorites)}
      />
      
      <main className="container px-4 mx-auto mt-40 sm:mt-36 lg:px-8">
        
        {showFavorites && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10"
          >
            <h2 className="text-3xl font-bold tracking-tight text-white/90">My Favorites</h2>
            <p className="mt-2 text-slate-400">You have {favorites.length} saved images.</p>
          </motion.div>
        )}

        {loading && !showFavorites && page === 1 ? (
          <div className="masonry-grid">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="mb-6 break-inside-avoid">
                <Skeleton />
              </div>
            ))}
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="masonry-grid"
          >
            <AnimatePresence mode="popLayout">
              {displayImages.map((img, i) => (
                <div key={`${img.id}-${i}`} className="masonry-item">
                  <ImageCard 
                    image={img} 
                    index={i % 20} 
                    onClick={() => setSelectedImage(img)}
                    isFavorite={!!favorites.find(f => f.id === img.id)}
                    onToggleFavorite={toggleFavorite}
                  />
                </div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
        
        {isFetchingMore && !showFavorites && (
          <div className="flex items-center justify-center py-10 mt-4">
            <div className="flex items-center gap-3 px-6 py-3 border rounded-full glass-panel border-white/10 bg-slate-900/50">
              <div className="w-5 h-5 border-2 rounded-full border-purple-500/30 border-t-purple-500 animate-spin"></div>
              <span className="text-sm font-medium tracking-wide text-transparent bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text">Loading more...</span>
            </div>
          </div>
        )}

        {!loading && displayImages.length === 0 && (
          <div className="py-20 text-center text-slate-400">
            <p>{showFavorites ? "You haven't saved any favorites yet." : "No images found. Try a different search term."}</p>
          </div>
        )}
      </main>

      <BackToTop />
      <Modal image={selectedImage} onClose={() => setSelectedImage(null)} />
    </div>
  );
}

export default App;
