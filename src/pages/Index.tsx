import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import MovieRow from '@/components/MovieRow';
import Footer from '@/components/Footer';
import { 
  fetchTrending, 
  fetchPopularMovies, 
  fetchTopRated, 
  fetchPopularTV, 
  fetchUpcoming,
  genres,
  fetchByGenre
} from '@/lib/tmdb';

const Index = () => {
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);

  const { data: trending = [] } = useQuery({
    queryKey: ['trending'],
    queryFn: fetchTrending,
  });

  const { data: popular = [] } = useQuery({
    queryKey: ['popular'],
    queryFn: fetchPopularMovies,
  });

  const { data: topRated = [] } = useQuery({
    queryKey: ['topRated'],
    queryFn: fetchTopRated,
  });

  const { data: tvShows = [] } = useQuery({
    queryKey: ['tvShows'],
    queryFn: fetchPopularTV,
  });

  const { data: upcoming = [] } = useQuery({
    queryKey: ['upcoming'],
    queryFn: fetchUpcoming,
  });

  const { data: genreMovies = [] } = useQuery({
    queryKey: ['genre', selectedGenre],
    queryFn: () => fetchByGenre(selectedGenre!),
    enabled: !!selectedGenre,
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <HeroSection movies={trending} />

      {/* Genre Pills */}
      <section className="py-6 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setSelectedGenre(null)}
            className={`category-pill ${
              !selectedGenre ? 'category-pill-active' : 'category-pill-inactive'
            }`}
          >
            All
          </button>
          {genres.map((genre) => (
            <button
              key={genre.id}
              onClick={() => setSelectedGenre(genre.id)}
              className={`category-pill ${
                selectedGenre === genre.id ? 'category-pill-active' : 'category-pill-inactive'
              }`}
            >
              {genre.name}
            </button>
          ))}
        </div>
      </section>

      {/* Genre Results */}
      {selectedGenre && genreMovies.length > 0 && (
        <MovieRow 
          title={genres.find(g => g.id === selectedGenre)?.name || 'Movies'} 
          movies={genreMovies} 
        />
      )}

      {/* Content Rows */}
      {!selectedGenre && (
        <>
          <MovieRow title="Trending Now" movies={trending} />
          <MovieRow title="Popular Movies" movies={popular} />
          <MovieRow title="Top Rated" movies={topRated} />
          <MovieRow title="Popular TV Shows" movies={tvShows} />
          <MovieRow title="Coming Soon" movies={upcoming} />
        </>
      )}

      <Footer />
    </div>
  );
};

export default Index;
