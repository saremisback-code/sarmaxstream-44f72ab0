import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Play, Star } from 'lucide-react';
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
      className="movie-card group block"
    >
      <div className="relative aspect-[2/3] bg-secondary overflow-hidden rounded-xl">
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 bg-secondary animate-pulse" />
        )}
        
        {posterUrl && !imageError ? (
          <img
            src={posterUrl}
            alt={title}
            className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-110 ${
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
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end p-4">
          <div className="w-full">
            <h3 className="text-sm font-semibold text-foreground line-clamp-2 mb-2">{title}</h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                {releaseYear && <span>{releaseYear}</span>}
                {rating && rating !== '0.0' && (
                  <span className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-primary fill-primary" /> {rating}
                  </span>
                )}
              </div>
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <Play className="w-3.5 h-3.5 text-primary-foreground fill-current" />
              </div>
            </div>
          </div>
        </div>

        {/* Rating Badge */}
        {rating && rating !== '0.0' && (
          <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-sm px-1.5 py-0.5 rounded flex items-center gap-1 group-hover:opacity-0 transition-opacity">
            <Star className="w-3 h-3 text-primary fill-primary" />
            <span className="text-[11px] font-semibold text-foreground">{rating}</span>
          </div>
        )}

        {mediaType === 'tv' && (
          <div className="absolute top-2 right-2 bg-primary/90 px-1.5 py-0.5 rounded">
            <span className="text-[10px] font-bold text-primary-foreground">TV</span>
          </div>
        )}
      </div>

      <div className="mt-2 px-0.5">
        <h3 className="text-xs font-medium text-foreground line-clamp-1 group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-[11px] text-muted-foreground mt-0.5">
          {releaseYear}
        </p>
      </div>
    </Link>
  );
};

export default MovieCard;
