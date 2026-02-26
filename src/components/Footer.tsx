import { Mail, Twitter, Instagram, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

const Footer = () => {
  return (
    <footer className="bg-card/50 border-t border-white/5 mt-16">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="mb-4">
              <Logo showText={true} />
            </div>
            <p className="text-muted-foreground text-sm mb-6">
              A search engine for publicly available media links. We do not host any content.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><Twitter className="w-5 h-5" /></a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><Youtube className="w-5 h-5" /></a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><Mail className="w-5 h-5" /></a>
            </div>
          </div>

          {/* Browse */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Browse</h4>
            <ul className="space-y-2">
              <li><Link to="/movies" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Movies</Link></li>
              <li><Link to="/tv" className="text-sm text-muted-foreground hover:text-foreground transition-colors">TV Shows</Link></li>
              <li><Link to="/search" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Search</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><Link to="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Terms of Service</Link></li>
              <li><Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</Link></li>
              <li><Link to="/dmca" className="text-sm text-muted-foreground hover:text-foreground transition-colors">DMCA</Link></li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Account</h4>
            <ul className="space-y-2">
              <li><Link to="/my-list" className="text-sm text-muted-foreground hover:text-foreground transition-colors">My List</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/5 flex flex-col gap-4 items-center text-center">
          <p className="text-xs text-muted-foreground max-w-2xl">
            <strong className="text-foreground">Disclaimer:</strong> SarmaxStream does not host, store, or upload any video files. All content is provided by non-affiliated third-party sources. We are a search engine that indexes publicly available links. We are not responsible for the content, accuracy, or legality of material hosted on third-party websites. If you believe any content infringes your copyright, please visit our <Link to="/dmca" className="text-primary hover:underline">DMCA page</Link>.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-xs text-muted-foreground">
            <Link to="/terms" className="hover:text-foreground transition-colors">Terms</Link>
            <span>·</span>
            <Link to="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
            <span>·</span>
            <Link to="/dmca" className="hover:text-foreground transition-colors">DMCA</Link>
          </div>
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} SarmaxStream. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
