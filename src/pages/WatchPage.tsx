import { useState } from 'react';
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
  Download,
  ChevronDown,
  Server
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { fetchMovieDetails, getImageUrl, MovieDetails } from '@/lib/tmdb';
import { Button } from '@/components/ui/button';

const WatchPage = () => {
  const { type, id } = useParams<{ type: string; id: string }>();
  const [selectedServer, setSelectedServer] = useState(0);
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [selectedEpisode, setSelectedEpisode] = useState(1);

  const { data: movie, isLoading } = useQuery({
    queryKey: ['movie', type, id],
    queryFn: () => fetchMovieDetails(Number(id), type as 'movie' | 'tv'),
    enabled: !!id,
  });

  const servers = [
    { name: 'Server 1', url: `https://vidsrc.xyz/embed/${type}/${id}` },
    { name: 'Server 2', url: `https://vidsrc.to/embed/${type}/${id}` },
    { name: 'Server 3', url: `https://2embed.org/embed/${type}/${id}` },
  ];

  const getStreamUrl = () => {
    const baseUrl = servers[selectedServer].url;
    if (type === 'tv') {
      return `${baseUrl}?s=${selectedSeason}&e=${selectedEpisode}`;
    }
    return baseUrl;
  };

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
              className="w-full h-full object-cover opacity-20"
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
            <div className="aspect-video bg-black relative">
              <iframe
                src={getStreamUrl()}
                className="w-full h-full"
                allowFullScreen
                allow="autoplay; encrypted-media"
                title={title}
              />
            </div>

            {/* Server Selection */}
            <div className="p-4 border-t border-white/5">
              <div className="flex flex-wrap items-center gap-4">
                <span className="text-sm text-muted-foreground flex items-center gap-2">
                  <Server className="w-4 h-4" />
                  Select Server:
                </span>
                <div className="flex flex-wrap gap-2">
                  {servers.map((server, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedServer(index)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        selectedServer === index
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-secondary text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      {server.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Episode Selection for TV Shows */}
              {type === 'tv' && movie.number_of_seasons && (
                <div className="flex flex-wrap items-center gap-4 mt-4 pt-4 border-t border-white/5">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Season:</span>
                    <select
                      value={selectedSeason}
                      onChange={(e) => setSelectedSeason(Number(e.target.value))}
                      className="bg-secondary text-foreground px-3 py-2 rounded-lg text-sm"
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
                      className="bg-secondary text-foreground px-3 py-2 rounded-lg text-sm"
                    >
                      {Array.from({ length: 20 }, (_, i) => (
                        <option key={i + 1} value={i + 1}>
                          Episode {i + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Movie Info */}
          <div className="grid lg:grid-cols-[300px_1fr] gap-8 pb-12">
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
              <h1 className="text-3xl md:text-5xl font-bold font-display tracking-wider mb-4 text-foreground">
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
                  <span className="flex items-center gap-1.5 bg-accent/20 text-accent px-3 py-1.5 rounded-full">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="font-semibold">{rating}</span>
                  </span>
                )}
                {releaseYear && (
                  <span className="flex items-center gap-1.5 text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    {releaseYear}
                  </span>
                )}
                {runtime && (
                  <span className="flex items-center gap-1.5 text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    {runtime}
                  </span>
                )}
                {type === 'tv' && movie.number_of_seasons && (
                  <span className="text-muted-foreground">
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
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                {movie.overview}
              </p>

              {/* Actions */}
              <div className="flex flex-wrap gap-4 mb-8">
                <Button className="btn-secondary gap-2">
                  <Plus className="w-4 h-4" />
                  Add to Watchlist
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
                      Watch Trailer
                    </Button>
                  </a>
                )}
              </div>

              {/* Cast */}
              {movie.credits?.cast && movie.credits.cast.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-4">Top Cast</h3>
                  <div className="flex flex-wrap gap-4">
                    {movie.credits.cast.slice(0, 6).map((actor) => (
                      <div key={actor.id} className="flex items-center gap-3">
                        {actor.profile_path ? (
                          <img
                            src={getImageUrl(actor.profile_path, 'w200')!}
                            alt={actor.name}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-muted-foreground text-sm">
                            {actor.name.charAt(0)}
                          </div>
                        )}
                        <div>
                          <p className="text-sm font-medium text-foreground">{actor.name}</p>
                          <p className="text-xs text-muted-foreground">{actor.character}</p>
                        </div>
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
