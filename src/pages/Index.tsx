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

const STALE_TIME = 1000 * 60 * 60 * 24; // 24 hours

const Index = () => {
  const { data: trending = [] } = useQuery({
    queryKey: ['trending'],
    queryFn: fetchTrending,
    staleTime: STALE_TIME,
  });

  const { data: popular = [] } = useQuery({
    queryKey: ['popular'],
    queryFn: fetchPopularMovies,
    staleTime: STALE_TIME,
  });

  const { data: topRated = [] } = useQuery({
    queryKey: ['topRated'],
    queryFn: fetchTopRated,
    staleTime: STALE_TIME,
  });

  const { data: tvShows = [] } = useQuery({
    queryKey: ['tvShows'],
    queryFn: fetchPopularTV,
    staleTime: STALE_TIME,
  });

  const { data: upcoming = [] } = useQuery({
    queryKey: ['upcoming'],
    queryFn: fetchUpcoming,
    staleTime: STALE_TIME,
  });

  const { data: nowPlaying = [] } = useQuery({
    queryKey: ['nowPlaying'],
    queryFn: fetchNowPlaying,
    staleTime: STALE_TIME,
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
