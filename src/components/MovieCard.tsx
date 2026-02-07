import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Play, Star, Plus, Info } from 'lucide-react';
import { Movie, getImageUrl } from '@/lib/tmdb';

interface MovieCardProps {
  movie: Movie;
  index?: number;
}

const MovieCard = ({ movie, index = 0 }: MovieCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  const title = movie.title || movie.name || 'Untitled';
  const releaseYear = (movie.release_date || movie.first_air_date)?.split('-')[0];
  const rating = movie.vote_average?.toFixed(1);
  const mediaType = movie.media_type || 'movie';
  const posterUrl = getImageUrl(movie.poster_path, 'w500');

  return (
    <Link 
      to={`/watch/${mediaType}/${movie.id}`}
      className="movie-card block"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="relative aspect-[2/3] bg-secondary overflow-hidden rounded-xl">
        {/* Skeleton loader */}
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 bg-secondary animate-pulse">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
          </div>
        )}
        
        {/* Poster Image */}
        {posterUrl && !imageError ? (
          <img
            src={posterUrl}
            alt={title}
            className={`w-full h-full object-cover transition-all duration-500 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            loading="lazy"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-secondary">
            <Play className="w-12 h-12 text-muted-foreground" />
          </div>
        )}

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="text-lg font-semibold text-foreground line-clamp-2 mb-2">
              {title}
            </h3>
            
            <div className="flex items-center gap-3 text-sm text-muted-foreground mb-3">
              {releaseYear && <span>{releaseYear}</span>}
              {rating && rating !== '0.0' && (
                <span className="flex items-center gap-1">
                  <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                  {rating}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground py-2 rounded-lg flex items-center justify-center gap-2 transition-colors">
                <Play className="w-4 h-4 fill-current" />
                <span className="text-sm font-medium">Watch</span>
              </button>
              <button className="p-2 bg-secondary/80 hover:bg-secondary text-foreground rounded-lg transition-colors">
                <Plus className="w-4 h-4" />
              </button>
              <button className="p-2 bg-secondary/80 hover:bg-secondary text-foreground rounded-lg transition-colors">
                <Info className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Rating Badge */}
        {rating && rating !== '0.0' && (
          <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-sm px-2 py-1 rounded-md flex items-center gap-1 group-hover:opacity-0 transition-opacity">
            <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
            <span className="text-xs font-semibold text-foreground">{rating}</span>
          </div>
        )}

        {/* Media Type Badge */}
        {mediaType === 'tv' && (
          <div className="absolute top-3 right-3 bg-primary/90 backdrop-blur-sm px-2 py-1 rounded-md">
            <span className="text-xs font-semibold text-primary-foreground">TV</span>
          </div>
        )}
      </div>

      {/* Title below card */}
      <div className="mt-3 px-1">
        <h3 className="text-sm font-medium text-foreground line-clamp-1 group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-xs text-muted-foreground mt-1">
          {releaseYear} {rating && rating !== '0.0' && `• ⭐ ${rating}`}
        </p>
      </div>
    </Link>
  );
};

export default MovieCard;
