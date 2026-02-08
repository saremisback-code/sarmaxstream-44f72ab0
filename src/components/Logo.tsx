import { Link } from 'react-router-dom';
import { Play } from 'lucide-react';

interface LogoProps {
  className?: string;
  showText?: boolean;
}

const Logo = ({ className = '', showText = true }: LogoProps) => {
  return (
    <Link to="/" className={`flex items-center gap-2.5 group ${className}`}>
      {/* Clean Modern Logo */}
      <div className="relative flex items-center justify-center w-10 h-10 bg-primary rounded-xl overflow-hidden shadow-lg shadow-primary/30 group-hover:shadow-primary/50 transition-shadow duration-300">
        {/* Background gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
        
        {/* Play icon */}
        <Play className="w-5 h-5 text-primary-foreground fill-current ml-0.5 relative z-10" />
      </div>
      
      {showText && (
        <span className="text-xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors duration-300">
          Sarmax
        </span>
      )}
    </Link>
  );
};

export default Logo;
