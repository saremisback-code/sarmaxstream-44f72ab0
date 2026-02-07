import { Link } from 'react-router-dom';

interface LogoProps {
  className?: string;
  showText?: boolean;
}

const Logo = ({ className = '', showText = true }: LogoProps) => {
  return (
    <Link to="/" className={`flex items-center gap-3 ${className}`}>
      {/* Custom Sarmax Logo */}
      <div className="relative w-11 h-11">
        {/* Outer glow */}
        <div className="absolute inset-0 bg-primary/30 rounded-xl blur-md" />
        
        {/* Main logo container */}
        <div className="relative w-full h-full bg-gradient-to-br from-primary via-red-500 to-red-700 rounded-xl flex items-center justify-center shadow-lg shadow-primary/30">
          {/* S letter stylized */}
          <svg 
            viewBox="0 0 24 24" 
            className="w-7 h-7 text-white"
            fill="currentColor"
          >
            <path d="M12 2C9.5 2 7.5 3.5 7.5 5.5C7.5 7.5 9 8.5 11.5 9.5C14 10.5 16.5 11.5 16.5 14.5C16.5 17.5 14 19 11.5 19C9 19 7 17.5 6 15.5L4 17C5.5 19.5 8.5 21 12 21C15 21 18.5 19 18.5 14.5C18.5 10 15.5 9 13 8C10.5 7 9.5 6.5 9.5 5.5C9.5 4.5 10.5 4 12 4C13.5 4 14.5 4.5 15.5 5.5L17 4C15.5 2.5 14 2 12 2Z" />
          </svg>
          
          {/* Play accent */}
          <div className="absolute -right-0.5 -bottom-0.5 w-4 h-4 bg-white rounded-full flex items-center justify-center shadow-md">
            <svg viewBox="0 0 24 24" className="w-2.5 h-2.5 text-primary ml-0.5" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      </div>
      
      {showText && (
        <div className="flex flex-col">
          <span className="text-2xl font-bold font-display tracking-[0.2em] text-foreground leading-none">
            SARMAX
          </span>
          <span className="text-[10px] text-primary font-medium tracking-widest">
            STREAM FREE
          </span>
        </div>
      )}
    </Link>
  );
};

export default Logo;
