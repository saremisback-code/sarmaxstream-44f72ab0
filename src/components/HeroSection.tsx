import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Play, Info, Star, Clock } from 'lucide-react';
import { Movie, getImageUrl } from '@/lib/tmdb';
import { Button } from '@/components/ui/button';

interface HeroSectionProps {
  movies: Movie[];
}

const HeroSection = ({ movies }: HeroSectionProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const featuredMovies = movies.slice(0, 5);
  const currentMovie = featuredMovies[currentIndex];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % featuredMovies.length);
        setIsTransitioning(false);
      }, 500);
    }, 8000);

    return () => clearInterval(interval);
  }, [featuredMovies.length]);

  if (!currentMovie) return null;

  const title = currentMovie.title || currentMovie.name || 'Untitled';
  const releaseYear = (currentMovie.release_date || currentMovie.first_air_date)?.split('-')[0];
  const rating = currentMovie.vote_average?.toFixed(1);
  const backdropUrl = getImageUrl(currentMovie.backdrop_path, 'original');
  const mediaType = currentMovie.media_type || 'movie';

  return (
    <section className="relative h-[85vh] min-h-[600px] overflow-hidden">
      {/* Background Image */}
      <div 
        className={`absolute inset-0 transition-opacity duration-1000 ${
          isTransitioning ? 'opacity-0' : 'opacity-100'
        }`}
      >
        {backdropUrl && (
          <img
            src={backdropUrl}
            alt={title}
            className="w-full h-full object-cover"
          />
        )}
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
      </div>

      {/* Content */}
      <div className="relative h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 md:px-8 w-full">
          <div className={`max-w-2xl transition-all duration-700 ${
            isTransitioning ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'
          }`}>
            {/* Featured Badge */}
            <div className="inline-flex items-center gap-2 bg-primary/20 border border-primary/30 px-4 py-2 rounded-full mb-6">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span className="text-sm font-medium text-primary">Featured Today</span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-display tracking-wider mb-4 text-foreground">
              {title}
            </h1>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-4 mb-6 text-muted-foreground">
              {rating && rating !== '0.0' && (
                <span className="flex items-center gap-1.5 bg-yellow-500/20 text-yellow-500 px-3 py-1 rounded-full">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="font-semibold">{rating}</span>
                </span>
              )}
              {releaseYear && (
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  {releaseYear}
                </span>
              )}
              <span className="px-3 py-1 bg-secondary rounded-full text-sm capitalize">
                {mediaType === 'tv' ? 'TV Series' : 'Movie'}
              </span>
            </div>

            {/* Overview */}
            <p className="text-lg text-muted-foreground line-clamp-3 mb-8 leading-relaxed">
              {currentMovie.overview}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
              <Link to={`/watch/${mediaType}/${currentMovie.id}`}>
                <Button className="btn-primary text-lg px-8 py-6 gap-2">
                  <Play className="w-5 h-5 fill-current" />
                  Watch Now
                </Button>
              </Link>
              <Link to={`/watch/${mediaType}/${currentMovie.id}`}>
                <Button className="btn-secondary text-lg px-8 py-6 gap-2">
                  <Info className="w-5 h-5" />
                  More Info
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Carousel Indicators */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-3">
        {featuredMovies.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setIsTransitioning(true);
              setTimeout(() => {
                setCurrentIndex(index);
                setIsTransitioning(false);
              }, 300);
            }}
            className={`h-1 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'w-8 bg-primary' 
                : 'w-4 bg-muted-foreground/30 hover:bg-muted-foreground/50'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
