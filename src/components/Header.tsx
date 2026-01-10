
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="fixed top-0 right-0 z-50 p-4">
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

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="md:hidden absolute top-full right-0 bg-black/90 backdrop-blur-md p-4 rounded-lg mt-2">
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
    </header>
  );
};

export default Header;
