import { useQuery } from '@tanstack/react-query';
import { Tv } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MovieCard from '@/components/MovieCard';
import { fetchPopularTV } from '@/lib/tmdb';

const TVPage = () => {
  const { data: tvShows = [] } = useQuery({
    queryKey: ['allTVShows'],
    queryFn: fetchPopularTV,
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-24 pb-12 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-display tracking-wider mb-4 flex items-center gap-4 text-foreground">
            <Tv className="w-10 h-10 text-primary" />
            TV Shows
          </h1>
          <p className="text-muted-foreground">
            Discover popular TV series to binge-watch
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
          {tvShows.map((show, index) => (
            <MovieCard key={show.id} movie={{ ...show, media_type: 'tv' }} index={index} />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default TVPage;
