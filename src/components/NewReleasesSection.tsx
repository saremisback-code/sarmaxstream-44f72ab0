import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Star, Play, Sparkles } from 'lucide-react';
import { Movie, getImageUrl } from '@/lib/tmdb';
import { Button } from '@/components/ui/button';

interface NewReleasesSectionProps {
  movies: Movie[];
}

const NewReleasesSection = ({ movies }: NewReleasesSectionProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  if (!movies.length) return null;

  return (
    <section className="py-8 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/20 rounded-lg">
            <Sparkles className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">New Releases</h2>
            <p className="text-sm text-muted-foreground">Fresh content just added</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => scroll('left')}
            className="hidden md:flex border-border/50 hover:bg-secondary"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => scroll('right')}
            className="hidden md:flex border-border/50 hover:bg-secondary"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Scrollable Cards */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 -mx-4 px-4"
      >
        {movies.slice(0, 10).map((movie, index) => {
          const mediaType = movie.media_type || 'movie';
          const title = movie.title || movie.name || 'Untitled';
          const imageUrl = getImageUrl(movie.backdrop_path || movie.poster_path, 'w780');
          const rating = movie.vote_average?.toFixed(1) || 'N/A';
          const releaseDate = movie.release_date || movie.first_air_date;
          const year = releaseDate ? new Date(releaseDate).getFullYear() : '';

          return (
            <Link
              key={movie.id}
              to={`/watch/${mediaType}/${movie.id}`}
              className="group relative flex-shrink-0 w-[300px] md:w-[380px] aspect-video rounded-xl overflow-hidden"
            >
              {/* Badge */}
              {index < 3 && (
                <div className="absolute top-3 left-3 z-20 px-3 py-1 bg-primary text-primary-foreground text-xs font-bold rounded-full flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  NEW
                </div>
              )}

              {/* Image */}
              <img
                src={imageUrl || '/placeholder.svg'}
                alt={title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center gap-1 text-yellow-400">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-sm font-medium">{rating}</span>
                  </div>
                  {year && (
                    <>
                      <span className="text-muted-foreground">•</span>
                      <span className="text-sm text-muted-foreground">{year}</span>
                    </>
                  )}
                  <span className="text-muted-foreground">•</span>
                  <span className="text-xs uppercase text-muted-foreground">{mediaType}</span>
                </div>
                <h3 className="text-lg font-bold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                  {title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                  {movie.overview}
                </p>
              </div>

              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="p-4 bg-primary rounded-full shadow-lg shadow-primary/25 transform scale-75 group-hover:scale-100 transition-transform">
                  <Play className="w-8 h-8 text-primary-foreground fill-current" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default NewReleasesSection;
