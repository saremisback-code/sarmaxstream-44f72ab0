import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  return (
    <section className="hero-section min-h-[70vh] flex items-center justify-center px-4 pt-20">
      <div className="text-center max-w-3xl mx-auto animate-fade-in">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gradient mb-6 leading-tight">
          UNLIMITED FREE STREAMING
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
          Enjoy thousands of movies in high definition. Fast, reliable, and completely free. Start watching your next favorite film today.
        </p>
        <Link to="/movies">
          <Button className="btn-outline text-lg px-10 py-6">
            Start Watching
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;
