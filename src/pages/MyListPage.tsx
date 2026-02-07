import { useState } from 'react';
import { Bookmark, Trash2 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';

const MyListPage = () => {
  const [watchlist] = useState<any[]>([]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-24 pb-12 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-display tracking-wider mb-4 flex items-center gap-4 text-foreground">
            <Bookmark className="w-10 h-10 text-primary" />
            My List
          </h1>
          <p className="text-muted-foreground">
            Your saved movies and TV shows
          </p>
        </div>

        {watchlist.length === 0 ? (
          <div className="text-center py-20 glass-card max-w-lg mx-auto">
            <Bookmark className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-foreground mb-2">Your watchlist is empty</h2>
            <p className="text-muted-foreground mb-6">
              Start adding movies and TV shows to keep track of what you want to watch
            </p>
            <Button className="btn-primary">
              Browse Content
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
            {/* Watchlist items would render here */}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default MyListPage;
