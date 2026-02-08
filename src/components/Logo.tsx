import { Link } from 'react-router-dom';

interface LogoProps {
  className?: string;
  showText?: boolean;
}

const Logo = ({ className = '', showText = true }: LogoProps) => {
  return (
    <Link to="/" className={`flex items-center gap-3 group ${className}`}>
      {/* Modern Sarmax Logo */}
      <div className="relative w-12 h-12">
        {/* Animated glow ring */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-red-400 to-primary rounded-2xl blur-lg opacity-60 group-hover:opacity-100 transition-opacity duration-500 animate-pulse" />
        
        {/* Main hexagonal container */}
        <div className="relative w-full h-full">
          {/* Hexagon background */}
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-2xl">
            <defs>
              <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="hsl(0, 85%, 55%)" />
                <stop offset="50%" stopColor="hsl(0, 75%, 45%)" />
                <stop offset="100%" stopColor="hsl(0, 90%, 35%)" />
              </linearGradient>
              <linearGradient id="innerGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="white" stopOpacity="0.3" />
                <stop offset="100%" stopColor="white" stopOpacity="0" />
              </linearGradient>
            </defs>
            
            {/* Outer hexagon */}
            <polygon 
              points="50,2 95,25 95,75 50,98 5,75 5,25" 
              fill="url(#logoGradient)"
              className="drop-shadow-lg"
            />
            
            {/* Inner shine */}
            <polygon 
              points="50,8 88,28 88,72 50,92 12,72 12,28" 
              fill="url(#innerGlow)"
            />
            
            {/* S letter - modern geometric */}
            <g transform="translate(25, 20)">
              <path 
                d="M25 5 L40 5 Q50 5 50 15 Q50 25 40 25 L20 25 Q10 25 10 35 Q10 45 20 45 L35 45 L35 40 L20 40 Q15 40 15 35 Q15 30 20 30 L40 30 Q50 30 50 20 Q50 10 40 10 L25 10 Z"
                fill="white"
                className="drop-shadow-sm"
              />
            </g>
            
            {/* Play triangle accent */}
            <g transform="translate(60, 55)">
              <polygon 
                points="0,0 20,12 0,24" 
                fill="white"
                opacity="0.9"
              />
            </g>
          </svg>
        </div>
      </div>
      
      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1">
            <span className="text-2xl font-black tracking-tight text-foreground leading-none group-hover:text-primary transition-colors duration-300">
              SAR
            </span>
            <span className="text-2xl font-black tracking-tight text-primary leading-none">
              MAX
            </span>
          </div>
          <div className="flex items-center gap-1 mt-0.5">
            <div className="w-2 h-0.5 bg-primary rounded-full" />
            <span className="text-[9px] text-muted-foreground font-semibold tracking-[0.3em] uppercase">
              Stream Free
            </span>
            <div className="w-2 h-0.5 bg-primary rounded-full" />
          </div>
        </div>
      )}
    </Link>
  );
};

export default Logo;
