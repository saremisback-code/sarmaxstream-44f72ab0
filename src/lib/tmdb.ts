// TMDB API Configuration
const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY || '';
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p';

export interface Movie {
  id: number;
  title: string;
  name?: string;
  poster_path: string | null;
  backdrop_path: string | null;
  overview: string;
  release_date?: string;
  first_air_date?: string;
  vote_average: number;
  genre_ids: number[];
  media_type?: string;
}

export interface MovieDetails extends Movie {
  genres: { id: number; name: string }[];
  runtime?: number;
  number_of_seasons?: number;
  tagline?: string;
  status: string;
  production_companies: { id: number; name: string; logo_path: string | null }[];
  videos?: {
    results: { key: string; type: string; site: string }[];
  };
  credits?: {
    cast: { id: number; name: string; character: string; profile_path: string | null }[];
  };
}

export const getImageUrl = (path: string | null, size: 'w200' | 'w300' | 'w500' | 'w780' | 'original' = 'w500') => {
  if (!path) return null;
  return `${TMDB_IMAGE_BASE}/${size}${path}`;
};

export const fetchTrending = async (): Promise<Movie[]> => {
  const response = await fetch(
    `${TMDB_BASE_URL}/trending/all/week?api_key=${TMDB_API_KEY}`
  );
  const data = await response.json();
  return data.results;
};

export const fetchPopularMovies = async (): Promise<Movie[]> => {
  const response = await fetch(
    `${TMDB_BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}`
  );
  const data = await response.json();
  return data.results;
};

export const fetchTopRated = async (): Promise<Movie[]> => {
  const response = await fetch(
    `${TMDB_BASE_URL}/movie/top_rated?api_key=${TMDB_API_KEY}`
  );
  const data = await response.json();
  return data.results;
};

export const fetchPopularTV = async (): Promise<Movie[]> => {
  const response = await fetch(
    `${TMDB_BASE_URL}/tv/popular?api_key=${TMDB_API_KEY}`
  );
  const data = await response.json();
  return data.results;
};

export const fetchUpcoming = async (): Promise<Movie[]> => {
  const response = await fetch(
    `${TMDB_BASE_URL}/movie/upcoming?api_key=${TMDB_API_KEY}`
  );
  const data = await response.json();
  return data.results;
};

export const fetchNowPlaying = async (): Promise<Movie[]> => {
  const response = await fetch(
    `${TMDB_BASE_URL}/movie/now_playing?api_key=${TMDB_API_KEY}`
  );
  const data = await response.json();
  return data.results;
};

export const fetchAiringToday = async (): Promise<Movie[]> => {
  const response = await fetch(
    `${TMDB_BASE_URL}/tv/airing_today?api_key=${TMDB_API_KEY}`
  );
  const data = await response.json();
  return data.results;
};

export const fetchMovieDetails = async (id: number, type: 'movie' | 'tv' = 'movie'): Promise<MovieDetails> => {
  const response = await fetch(
    `${TMDB_BASE_URL}/${type}/${id}?api_key=${TMDB_API_KEY}&append_to_response=videos,credits`
  );
  const data = await response.json();
  return data;
};

export const sanitizeSearchQuery = (query: string): string => {
  return query.trim().slice(0, 100);
};

export const searchMovies = async (query: string): Promise<Movie[]> => {
  const sanitized = sanitizeSearchQuery(query);
  if (!sanitized) return [];
  const response = await fetch(
    `${TMDB_BASE_URL}/search/multi?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(sanitized)}`
  );
  const data = await response.json();
  return data.results.filter((item: Movie) => 
    item.media_type === 'movie' || item.media_type === 'tv'
  );
};

export const fetchByGenre = async (genreId: number, type: 'movie' | 'tv' = 'movie'): Promise<Movie[]> => {
  const response = await fetch(
    `${TMDB_BASE_URL}/discover/${type}?api_key=${TMDB_API_KEY}&with_genres=${genreId}`
  );
  const data = await response.json();
  return data.results;
};

export const genres = [
  { id: 28, name: 'Action' },
  { id: 12, name: 'Adventure' },
  { id: 16, name: 'Animation' },
  { id: 35, name: 'Comedy' },
  { id: 80, name: 'Crime' },
  { id: 18, name: 'Drama' },
  { id: 14, name: 'Fantasy' },
  { id: 27, name: 'Horror' },
  { id: 10749, name: 'Romance' },
  { id: 878, name: 'Sci-Fi' },
  { id: 53, name: 'Thriller' },
];
