import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { SpeedInsights } from "@vercel/speed-insights/react";
import Index from "./pages/Index";
import WatchPage from "./pages/WatchPage";
import SearchPage from "./pages/SearchPage";
import MoviesPage from "./pages/MoviesPage";
import TVPage from "./pages/TVPage";
import MyListPage from "./pages/MyListPage";
import NotFound from "./pages/NotFound";
import TermsPage from "./pages/TermsPage";
import PrivacyPage from "./pages/PrivacyPage";
import DMCAPage from "./pages/DMCAPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/watch/:type/:id" element={<WatchPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/movies" element={<MoviesPage />} />
            <Route path="/tv" element={<TVPage />} />
            <Route path="/my-list" element={<MyListPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/dmca" element={<DMCAPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        <SpeedInsights />
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
