import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Play, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { fetchTrending, getImageUrl } from '@/lib/tmdb';
import { useState, useEffect } from 'react';

const HeroSection = () => {
  const { data: trending = [] } = useQuery({
    queryKey: ['trending'],
    queryFn: fetchTrending,
    staleTime: 1000 * 60 * 60 * 24,
  });

  const featured = trending.slice(0, 5).filter(m => m.backdrop_path);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (featured.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % featured.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [featured.length]);

  const current = featured[currentIndex];
  const backdropUrl = current ? getImageUrl(current.backdrop_path, 'original') : null;
  const title = current?.title || current?.name || '';
  const overview = current?.overview || '';
  const mediaType = current?.media_type || 'movie';

  return (
    <section className="relative min-h-[85vh] flex items-end pb-20 px-4 md:px-8 overflow-hidden">
      {/* Rotating Backdrop */}
      {backdropUrl && (
        <div className="absolute inset-0">
          <img 
            key={currentIndex}
            src={backdropUrl} 
            alt={title} 
            className="w-full h-full object-cover animate-fade-in"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-transparent" />
        </div>
      )}

      {!backdropUrl && (
        <div className="absolute inset-0 hero-section" />
      )}

      {/* Content */}
      <div className="relative max-w-7xl mx-auto w-full animate-slide-up">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-primary" />
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">Trending Now</span>
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-4 max-w-3xl leading-[1.1]">
          {title || 'UNLIMITED FREE STREAMING'}
        </h1>
        
        <p className="text-base md:text-lg text-muted-foreground mb-8 max-w-xl leading-relaxed line-clamp-3">
          {overview || 'Enjoy thousands of movies in high definition. Fast, reliable, and completely free.'}
        </p>

        <div className="flex flex-wrap items-center gap-4">
          {current ? (
            <Link to={`/watch/${mediaType}/${current.id}`}>
              <Button className="btn-primary text-base gap-2">
                <Play className="w-5 h-5 fill-current" /> Watch Now
              </Button>
            </Link>
          ) : (
            <Link to="/movies">
              <Button className="btn-primary text-base gap-2">
                <Play className="w-5 h-5 fill-current" /> Start Watching
              </Button>
            </Link>
          )}
          <Link to="/movies">
            <Button className="btn-secondary text-base">Browse All</Button>
          </Link>
        </div>

        {/* Dots indicator */}
        {featured.length > 1 && (
          <div className="flex items-center gap-2 mt-8">
            {featured.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`h-1 rounded-full transition-all duration-500 ${
                  i === currentIndex ? 'w-8 bg-primary' : 'w-3 bg-muted-foreground/40'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default HeroSection;
