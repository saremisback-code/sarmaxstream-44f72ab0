import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Menu, X, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AuthModal from './AuthModal';
import Logo from './Logo';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Movies', path: '/movies' },
    { name: 'TV Shows', path: '/tv' },
    { name: 'My List', path: '/my-list' },
  ];

  return (
    <>
      <nav className="glass-nav fixed top-0 left-0 right-0 z-50 px-4 md:px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Logo */}
          <Logo showText={true} />

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-muted-foreground hover:text-foreground transition-colors duration-300 font-medium"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md">
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search movies, TV shows..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input w-full pl-11 pr-4"
              />
            </div>
          </form>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-muted-foreground hover:text-foreground"
              onClick={() => navigate('/search')}
            >
              <Search className="w-5 h-5" />
            </Button>

            <Button
              onClick={() => setIsAuthOpen(true)}
              className="btn-primary hidden sm:flex items-center gap-2"
            >
              <User className="w-4 h-4" />
              <span>Sign In</span>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-muted-foreground hover:text-foreground"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-xl border-b border-white/5 animate-slide-up">
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-lg text-muted-foreground hover:text-foreground transition-colors py-2"
                >
                  {link.name}
                </Link>
              ))}
              <Button
                onClick={() => {
                  setIsMenuOpen(false);
                  setIsAuthOpen(true);
                }}
                className="btn-primary w-full mt-4"
              >
                <User className="w-4 h-4 mr-2" />
                Sign In
              </Button>
            </div>
          </div>
        )}
      </nav>

      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </>
  );
};

export default Navbar;
