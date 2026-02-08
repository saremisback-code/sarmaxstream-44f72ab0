import { Link } from 'react-router-dom';

interface LogoProps {
  className?: string;
  showText?: boolean;
  showTagline?: boolean;
}

const Logo = ({ className = '', showText = true, showTagline = false }: LogoProps) => {
  return (
    <Link to="/" className={`flex flex-col ${className}`}>
      {showText && (
        <span className="text-2xl font-bold tracking-wide text-foreground">
          SARMAX
        </span>
      )}
      {showTagline && (
        <span className="text-[10px] text-muted-foreground tracking-widest uppercase">
          Premium Streaming Platform
        </span>
      )}
    </Link>
  );
};

export default Logo;
