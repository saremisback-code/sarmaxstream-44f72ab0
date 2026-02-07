import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Search as SearchIcon, Film, Tv } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MovieCard from '@/components/MovieCard';
import { searchMovies, Movie } from '@/lib/tmdb';

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
      if (query) {
        setSearchParams({ q: query });
      } else {
        setSearchParams({});
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [query, setSearchParams]);

  const { data: results = [], isLoading } = useQuery({
    queryKey: ['search', debouncedQuery],
    queryFn: () => searchMovies(debouncedQuery),
    enabled: debouncedQuery.length > 0,
  });

  const movies = results.filter((r: Movie) => r.media_type === 'movie');
  const tvShows = results.filter((r: Movie) => r.media_type === 'tv');

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-24 pb-12 px-4 md:px-8 max-w-7xl mx-auto">
        {/* Search Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-display tracking-wider mb-4 text-foreground">
            Search
          </h1>
          <p className="text-muted-foreground mb-8">
            Find your favorite movies and TV shows
          </p>

          {/* Search Input */}
          <div className="max-w-2xl mx-auto relative">
            <SearchIcon className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search for movies, TV shows..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="search-input w-full pl-14 pr-6 py-4 text-lg"
              autoFocus
            />
          </div>
        </div>

        {/* Results */}
        {isLoading && debouncedQuery && (
          <div className="flex justify-center py-20">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {!isLoading && debouncedQuery && results.length === 0 && (
          <div className="text-center py-20">
            <SearchIcon className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-foreground mb-2">No results found</h2>
            <p className="text-muted-foreground">
              Try searching for something else
            </p>
          </div>
        )}

        {!debouncedQuery && (
          <div className="text-center py-20">
            <SearchIcon className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-foreground mb-2">Start searching</h2>
            <p className="text-muted-foreground">
              Enter a movie or TV show name above
            </p>
          </div>
        )}

        {/* Movies Results */}
        {movies.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
              <Film className="w-6 h-6 text-primary" />
              Movies ({movies.length})
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
              {movies.map((movie: Movie, index: number) => (
                <MovieCard key={movie.id} movie={movie} index={index} />
              ))}
            </div>
          </section>
        )}

        {/* TV Shows Results */}
        {tvShows.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
              <Tv className="w-6 h-6 text-primary" />
              TV Shows ({tvShows.length})
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
              {tvShows.map((show: Movie, index: number) => (
                <MovieCard key={show.id} movie={show} index={index} />
              ))}
            </div>
          </section>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default SearchPage;
