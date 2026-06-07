
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

type HeaderProps = {
  terminal?: boolean;
};

const Header = ({ terminal = false }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;
  const linkColor = terminal
    ? "text-terminal-text hover:text-terminal-accent"
    : "text-white hover:text-blue-300";
  const activeColor = terminal ? "text-terminal-accent" : "text-blue-300";

  return (
    <header className="absolute top-0 left-0 right-0 z-50 p-4 flex justify-between items-center">
      {/* Logo/Home Link - Left Side */}
      <Link 
        to="/" 
        className={`${linkColor} transition-colors font-courier font-medium text-2xl ml-10 mt-10 tracking-wide ${isActive('/') ? activeColor : ''}`}
      >
        Venture with Jerry
      </Link>

      {/* Desktop Navigation - Right Side */}
      <nav className="hidden md:flex space-x-8 mr-10 mt-10">
        <Link 
          to="/posts" 
          className={`${linkColor} transition-colors text-lg font-courier tracking-wide ${isActive('/posts') ? activeColor : ''}`}
        >
          Posts
        </Link>
        <Link 
          to="/resume" 
          className={`${linkColor} transition-colors text-lg font-courier tracking-wide ${isActive('/resume') ? activeColor : ''}`}
        >
          Resume
        </Link>
      </nav>

      {/* Mobile menu button */}
      <div className="md:hidden">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`${linkColor} transition-colors`}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav
          className={`md:hidden absolute top-full right-0 backdrop-blur-md p-4 rounded-lg mt-2 ${
            terminal
              ? "border border-terminal-border bg-terminal-panel"
              : "bg-black/90"
          }`}
        >
          <div className="flex flex-col space-y-2">
            <Link 
              to="/posts" 
              className={`${linkColor} transition-colors py-2 font-courier ${isActive('/posts') ? activeColor : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Posts
            </Link>
            <Link 
              to="/resume" 
              className={`${linkColor} transition-colors py-2 font-courier ${isActive('/resume') ? activeColor : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Resume
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
