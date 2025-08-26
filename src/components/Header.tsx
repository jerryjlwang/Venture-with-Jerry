
import { useState, useCallback } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useInViewport } from '@/hooks/useInViewport';
import { useOptimizedScroll } from '@/hooks/useOptimizedScroll';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { ref: headerRef, isInViewport } = useInViewport({ threshold: 0.1 });

  const isActive = (path: string) => location.pathname === path;

  const handleScroll = useCallback(() => {
    const scrollPosition = window.scrollY;
    setIsScrolled(scrollPosition > 20);
  }, []);

  // Use optimized scroll that only triggers when header is in viewport
  useOptimizedScroll(handleScroll, { isActive: isInViewport });

  return (
    <header 
      ref={headerRef}
      className={`bg-gradient-to-r shadow-lg sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'from-blue-900/70 to-black/70 backdrop-blur-md' : 'from-blue-900 to-black'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="hover:opacity-80 transition-opacity flex items-center">
            <img 
              src="/lovable-uploads/bf7aefe8-1b56-41a9-a239-f2cb492f68f2.png" 
              alt="Venture with Jerry" 
              className="h-16 w-auto filter invert brightness-0 invert object-contain"
            />
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link 
              to="/" 
              className={`text-white hover:text-blue-300 transition-colors ${isActive('/') ? 'text-blue-300' : ''}`}
            >
              Home
            </Link>
            <Link 
              to="/posts" 
              className={`text-white hover:text-blue-300 transition-colors ${isActive('/posts') ? 'text-blue-300' : ''}`}
            >
              Posts
            </Link>
            <Link 
              to="/about" 
              className={`text-white hover:text-blue-300 transition-colors ${isActive('/about') ? 'text-blue-300' : ''}`}
            >
              About
            </Link>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-blue-300 transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden pb-4">
            <div className="flex flex-col space-y-2">
              <Link 
                to="/" 
                className={`text-white hover:text-blue-300 transition-colors py-2 ${isActive('/') ? 'text-blue-300' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/posts" 
                className={`text-white hover:text-blue-300 transition-colors py-2 ${isActive('/posts') ? 'text-blue-300' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Posts
              </Link>
              <Link 
                to="/about" 
                className={`text-white hover:text-blue-300 transition-colors py-2 ${isActive('/about') ? 'text-blue-300' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
