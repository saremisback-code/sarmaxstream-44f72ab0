import { useQuery } from '@tanstack/react-query';
import { Film } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MovieCard from '@/components/MovieCard';
import { fetchPopularMovies, fetchTopRated, fetchUpcoming } from '@/lib/tmdb';

const MoviesPage = () => {
  const { data: popular = [] } = useQuery({
    queryKey: ['popularMovies'],
    queryFn: fetchPopularMovies,
  });

  const { data: topRated = [] } = useQuery({
    queryKey: ['topRatedMovies'],
    queryFn: fetchTopRated,
  });

  const { data: upcoming = [] } = useQuery({
    queryKey: ['upcomingMovies'],
    queryFn: fetchUpcoming,
  });

  const allMovies = [...popular, ...topRated, ...upcoming].filter(
    (movie, index, self) => 
      index === self.findIndex((m) => m.id === movie.id)
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-24 pb-12 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-display tracking-wider mb-4 flex items-center gap-4 text-foreground">
            <Film className="w-10 h-10 text-primary" />
            Movies
          </h1>
          <p className="text-muted-foreground">
            Browse our collection of popular, top-rated, and upcoming movies
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
          {allMovies.map((movie, index) => (
            <MovieCard key={movie.id} movie={{ ...movie, media_type: 'movie' }} index={index} />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default MoviesPage;
