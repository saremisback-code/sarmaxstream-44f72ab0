import { useState, useEffect } from 'react';
import { X, Mail, Lock, User, Eye, EyeOff, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { fetchTrending, getImageUrl } from '@/lib/tmdb';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal = ({ isOpen, onClose }: AuthModalProps) => {
  const { signIn, signUp } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const { data: trending = [] } = useQuery({
    queryKey: ['trending'],
    queryFn: fetchTrending,
  });

  // Get backdrop images for the scrolling background
  const backdropImages = trending
    .filter(m => m.backdrop_path)
    .slice(0, 12)
    .map(m => getImageUrl(m.backdrop_path, 'w780'));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      if (isLogin) {
        const { error } = await signIn(formData.email, formData.password);
        if (error) {
          setError(error);
          toast.error(error);
        } else {
          toast.success('Welcome back!');
          onClose();
          setFormData({ name: '', email: '', password: '' });
        }
      } else {
        if (formData.password.length < 6) {
          setError('Password must be at least 6 characters');
          setIsSubmitting(false);
          return;
        }
        const { error } = await signUp(formData.email, formData.password, formData.name);
        if (error) {
          setError(error);
          toast.error(error);
        } else {
          toast.success('Check your email to verify your account!');
          onClose();
          setFormData({ name: '', email: '', password: '' });
        }
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop with movie posters */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      
      {/* Scrolling movie posters background */}
      <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
        <div className="grid grid-cols-4 md:grid-cols-6 gap-1 animate-scroll-slow">
          {[...backdropImages, ...backdropImages].map((url, i) => (
            url && (
              <img
                key={i}
                src={url}
                alt=""
                className="w-full aspect-video object-cover rounded"
              />
            )
          ))}
        </div>
      </div>
      
      {/* Modal */}
      <div className="relative w-full max-w-md glass-card p-8 animate-scale-in">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold font-display tracking-wider mb-2">
            {isLogin ? 'Welcome Back' : 'Join Sarmax'}
          </h2>
          <p className="text-muted-foreground">
            {isLogin 
              ? 'Sign in to access your watchlist' 
              : 'Create an account to start watching'}
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-sm text-destructive text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {!isLogin && (
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="search-input w-full pl-12 rounded-lg"
                required
              />
            </div>
          )}

          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="search-input w-full pl-12 rounded-lg"
              required
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="search-input w-full pl-12 pr-12 rounded-lg"
              required
              minLength={6}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          <Button type="submit" className="btn-primary w-full text-lg py-6" disabled={isSubmitting}>
            {isSubmitting ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              isLogin ? 'Sign In' : 'Create Account'
            )}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-muted-foreground">
            {isLogin ? "Don't have an account? " : 'Already have an account? '}
            <button
              onClick={() => { setIsLogin(!isLogin); setError(null); }}
              className="text-primary hover:underline font-medium"
            >
              {isLogin ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
        </div>

        <p className="mt-6 text-xs text-center text-muted-foreground">
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
};

export default AuthModal;
