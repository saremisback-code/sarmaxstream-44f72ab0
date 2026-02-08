import { useState } from 'react';
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
  fetchNowPlaying,
} from '@/lib/tmdb';

const Index = () => {
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

  const { data: nowPlaying = [] } = useQuery({
    queryKey: ['nowPlaying'],
    queryFn: fetchNowPlaying,
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <HeroSection />

      {/* Content Rows */}
      <div className="py-8">
        <MovieRow title="Trending Now" movies={trending} />
        <MovieRow title="New Releases" movies={nowPlaying} />
        <MovieRow title="Popular Movies" movies={popular} />
        <MovieRow title="Top Rated" movies={topRated} />
        <MovieRow title="TV Shows" movies={tvShows} />
        <MovieRow title="Coming Soon" movies={upcoming} />
      </div>

      <Footer />
    </div>
  );
};

export default Index;
