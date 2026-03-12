import { Link } from 'react-router-dom';
import Logo from './Logo';

const Footer = () => {
  return (
    <footer className="bg-card/30 border-t border-white/5 mt-16">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-8">
          <div className="col-span-2 sm:col-span-1">
            <Logo showText />
            <p className="text-muted-foreground text-xs mt-3 leading-relaxed">
              A search engine for publicly available media links. We do not host any content.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-foreground text-sm mb-3">Browse</h4>
            <ul className="space-y-1.5">
              <li><Link to="/movies" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Movies</Link></li>
              <li><Link to="/tv" className="text-xs text-muted-foreground hover:text-foreground transition-colors">TV Shows</Link></li>
              <li><Link to="/search" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Search</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground text-sm mb-3">Legal</h4>
            <ul className="space-y-1.5">
              <li><Link to="/terms" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Terms of Service</Link></li>
              <li><Link to="/privacy" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</Link></li>
              <li><Link to="/dmca" className="text-xs text-muted-foreground hover:text-foreground transition-colors">DMCA</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground text-sm mb-3">Account</h4>
            <ul className="space-y-1.5">
              <li><Link to="/my-list" className="text-xs text-muted-foreground hover:text-foreground transition-colors">My List</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-white/5 space-y-3 text-center">
          <p className="text-[11px] text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            <strong className="text-foreground">Disclaimer:</strong> SARMAX does not host, store, or upload any video files. All content is provided by non-affiliated third-party sources. We are a search engine that indexes publicly available links. If you believe any content infringes your copyright, please visit our <Link to="/dmca" className="text-primary hover:underline">DMCA page</Link>.
          </p>
          <div className="flex flex-wrap justify-center gap-3 text-[11px] text-muted-foreground">
            <Link to="/terms" className="hover:text-foreground transition-colors">Terms</Link>
            <span className="text-muted-foreground/30">·</span>
            <Link to="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
            <span className="text-muted-foreground/30">·</span>
            <Link to="/dmca" className="hover:text-foreground transition-colors">DMCA</Link>
          </div>
          <p className="text-[11px] text-muted-foreground/60">
            © {new Date().getFullYear()} SARMAX. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
