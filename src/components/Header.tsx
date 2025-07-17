
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-gradient-to-r from-blue-900 to-black shadow-lg sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-2xl font-bold text-white hover:text-blue-300 transition-colors">
            Jerry Wang
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
              to="/vc-funds" 
              className={`text-white hover:text-blue-300 transition-colors ${isActive('/vc-funds') ? 'text-blue-300' : ''}`}
            >
              VC Funds
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
                to="/vc-funds" 
                className={`text-white hover:text-blue-300 transition-colors py-2 ${isActive('/vc-funds') ? 'text-blue-300' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                VC Funds
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
