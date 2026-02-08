import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { 
  Play, 
  Star, 
  Clock, 
  Calendar, 
  ArrowLeft, 
  Plus, 
  Share2,
  AlertCircle
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { fetchMovieDetails, getImageUrl } from '@/lib/tmdb';
import { Button } from '@/components/ui/button';

const WatchPage = () => {
  const { type, id } = useParams<{ type: string; id: string }>();
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [selectedEpisode, setSelectedEpisode] = useState(1);
  const [streamError, setStreamError] = useState(false);

  const { data: movie, isLoading } = useQuery({
    queryKey: ['movie', type, id],
    queryFn: () => fetchMovieDetails(Number(id), type as 'movie' | 'tv'),
    enabled: !!id,
  });

  // Auto-select best working server - using vidsrc.to as primary
  const getStreamUrl = () => {
    if (type === 'tv') {
      return `https://vidsrc.to/embed/tv/${id}/${selectedSeason}/${selectedEpisode}`;
    }
    return `https://vidsrc.to/embed/movie/${id}`;
  };

  // Reset error on content change
  useEffect(() => {
    setStreamError(false);
  }, [id, selectedSeason, selectedEpisode]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-24 flex items-center justify-center h-[60vh]">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-24 text-center py-20">
          <h1 className="text-2xl font-bold text-foreground">Content not found</h1>
          <Link to="/" className="text-primary hover:underline mt-4 inline-block">
            Go back home
          </Link>
        </div>
      </div>
    );
  }

  const title = movie.title || movie.name || 'Untitled';
  const releaseYear = (movie.release_date || movie.first_air_date)?.split('-')[0];
  const rating = movie.vote_average?.toFixed(1);
  const runtime = movie.runtime ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m` : null;
  const backdropUrl = getImageUrl(movie.backdrop_path, 'original');
  const posterUrl = getImageUrl(movie.poster_path, 'w500');
  const trailer = movie.videos?.results.find(v => v.type === 'Trailer' && v.site === 'YouTube');

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Background */}
      <div className="relative pt-16">
        {backdropUrl && (
          <div className="absolute inset-0 h-[500px]">
            <img
              src={backdropUrl}
              alt={title}
              className="w-full h-full object-cover opacity-15"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />
          </div>
        )}

        <div className="relative max-w-7xl mx-auto px-4 md:px-8 pt-8">
          {/* Back Button */}
          <Link 
            to="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Browse
          </Link>

          {/* Video Player */}
          <div className="glass-card overflow-hidden mb-8">
            <div className="aspect-video bg-card relative">
              {streamError ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                  <AlertCircle className="w-16 h-16 text-muted-foreground mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">Stream Unavailable</h3>
                  <p className="text-muted-foreground mb-4">This content is currently unavailable. Please try again later.</p>
                  {trailer && (
                    <a
                      href={`https://www.youtube.com/watch?v=${trailer.key}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button className="btn-primary gap-2">
                        <Play className="w-4 h-4" />
                        Watch Trailer Instead
                      </Button>
                    </a>
                  )}
                </div>
              ) : (
                <iframe
                  src={getStreamUrl()}
                  className="w-full h-full"
                  allowFullScreen
                  allow="autoplay; encrypted-media; fullscreen"
                  title={title}
                  onError={() => setStreamError(true)}
                />
              )}
            </div>

            {/* Episode Selection for TV Shows */}
            {type === 'tv' && movie.number_of_seasons && (
              <div className="p-4 border-t border-white/5 flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Season:</span>
                  <select
                    value={selectedSeason}
                    onChange={(e) => setSelectedSeason(Number(e.target.value))}
                    className="bg-secondary text-foreground px-3 py-2 rounded-lg text-sm border-none focus:ring-2 focus:ring-primary"
                  >
                    {Array.from({ length: movie.number_of_seasons }, (_, i) => (
                      <option key={i + 1} value={i + 1}>
                        Season {i + 1}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Episode:</span>
                  <select
                    value={selectedEpisode}
                    onChange={(e) => setSelectedEpisode(Number(e.target.value))}
                    className="bg-secondary text-foreground px-3 py-2 rounded-lg text-sm border-none focus:ring-2 focus:ring-primary"
                  >
                    {Array.from({ length: 24 }, (_, i) => (
                      <option key={i + 1} value={i + 1}>
                        Episode {i + 1}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}
          </div>

          {/* Movie Info */}
          <div className="grid lg:grid-cols-[280px_1fr] gap-8 pb-12">
            {/* Poster */}
            <div className="hidden lg:block">
              {posterUrl ? (
                <img
                  src={posterUrl}
                  alt={title}
                  className="w-full rounded-xl shadow-2xl"
                />
              ) : (
                <div className="aspect-[2/3] bg-secondary rounded-xl flex items-center justify-center">
                  <Play className="w-16 h-16 text-muted-foreground" />
                </div>
              )}
            </div>

            {/* Details */}
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-3 text-foreground">
                {title}
              </h1>

              {movie.tagline && (
                <p className="text-lg text-muted-foreground italic mb-4">
                  "{movie.tagline}"
                </p>
              )}

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-4 mb-6">
                {rating && rating !== '0.0' && (
                  <span className="flex items-center gap-1.5 bg-primary/20 text-primary px-3 py-1.5 rounded-full text-sm font-medium">
                    <Star className="w-4 h-4 fill-current" />
                    {rating}
                  </span>
                )}
                {releaseYear && (
                  <span className="flex items-center gap-1.5 text-muted-foreground text-sm">
                    <Calendar className="w-4 h-4" />
                    {releaseYear}
                  </span>
                )}
                {runtime && (
                  <span className="flex items-center gap-1.5 text-muted-foreground text-sm">
                    <Clock className="w-4 h-4" />
                    {runtime}
                  </span>
                )}
                {type === 'tv' && movie.number_of_seasons && (
                  <span className="text-muted-foreground text-sm">
                    {movie.number_of_seasons} Season{movie.number_of_seasons > 1 ? 's' : ''}
                  </span>
                )}
              </div>

              {/* Genres */}
              {movie.genres && movie.genres.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {movie.genres.map((genre) => (
                    <span
                      key={genre.id}
                      className="px-3 py-1 bg-secondary text-muted-foreground rounded-full text-sm"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              )}

              {/* Overview */}
              <p className="text-muted-foreground leading-relaxed mb-8">
                {movie.overview}
              </p>

              {/* Actions */}
              <div className="flex flex-wrap gap-3 mb-8">
                <Button className="btn-secondary gap-2">
                  <Plus className="w-4 h-4" />
                  Add to List
                </Button>
                <Button className="btn-secondary gap-2">
                  <Share2 className="w-4 h-4" />
                  Share
                </Button>
                {trailer && (
                  <a
                    href={`https://www.youtube.com/watch?v=${trailer.key}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="btn-secondary gap-2">
                      <Play className="w-4 h-4" />
                      Trailer
                    </Button>
                  </a>
                )}
              </div>

              {/* Cast */}
              {movie.credits?.cast && movie.credits.cast.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">Cast</h3>
                  <div className="flex flex-wrap gap-3">
                    {movie.credits.cast.slice(0, 6).map((actor) => (
                      <div key={actor.id} className="flex items-center gap-2 bg-secondary/50 rounded-full pr-4">
                        {actor.profile_path ? (
                          <img
                            src={getImageUrl(actor.profile_path, 'w200')!}
                            alt={actor.name}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground text-sm font-medium">
                            {actor.name.charAt(0)}
                          </div>
                        )}
                        <span className="text-sm text-foreground">{actor.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default WatchPage;
