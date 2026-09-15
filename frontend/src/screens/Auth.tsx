import { useState } from 'react';
import { Eye, EyeOff, Moon, Sun } from 'lucide-react';
import { AuthMode } from '../types';

interface AuthProps {
  onAuthenticated: () => void;
  darkMode: boolean;
  onToggleDark: () => void;
}

export default function Auth({ onAuthenticated, darkMode, onToggleDark }: AuthProps) {
  const [mode, setMode] = useState<AuthMode>('login');
  const [error, setError] = useState('');
  const [resetSent, setResetSent] = useState(false);
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showSignupPassword, setShowSignupPassword] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    // TODO: replace with Firebase signInWithEmailAndPassword, then onAuthenticated()
    onAuthenticated();
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    // TODO: replace with Firebase createUserWithEmailAndPassword, then POST /api/auth/sync
    onAuthenticated();
  };

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    // TODO: replace with Firebase sendPasswordResetEmail
    setResetSent(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-5 relative">
      <button
        onClick={onToggleDark}
        aria-label="Toggle dark mode"
        className="absolute top-6 right-6 w-10 h-10 rounded-full flex items-center justify-center bg-white/60 dark:bg-midnight-panel/80 border border-aero-fog dark:border-midnight-border text-aero-ink dark:text-midnight-text hover:scale-105 transition-transform"
      >
        {darkMode ? <Sun size={17} /> : <Moon size={17} />}
      </button>

      <div className="w-full max-w-sm bg-aero-paper dark:bg-midnight-panel/95 border border-aero-fog dark:border-midnight-border/60 rounded-2xl shadow-xl shadow-black/10 dark:shadow-black/40 p-9">
        <div className="flex items-center justify-center gap-2 mb-7">
          <svg width="34" height="34" viewBox="0 0 24 24" fill="none" className="text-aero-primary">
            <path d="M2 12.5 L20 5 L14 12.5 L20 20 Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" fill="none" />
          </svg>
          <span className="text-2xl">
            <span className="font-bold text-aero-ink dark:text-midnight-text">Aero</span>
            <span className="font-light text-aero-muted dark:text-midnight-muted">Path</span>
          </span>
        </div>

        {mode === 'login' && (
          <form onSubmit={handleLogin} className="animate-storyIn">
            <h1 className="text-2xl font-semibold text-aero-ink dark:text-midnight-text mb-1">Login</h1>
            <p className="text-sm text-aero-muted dark:text-midnight-muted mb-6">Sign in to your account</p>

            <input type="email" placeholder="Email address" required
              className="w-full mb-3 px-4 py-3 rounded-lg border border-aero-fog dark:border-midnight-border bg-white dark:bg-midnight-bg text-aero-ink dark:text-midnight-text text-sm focus:outline-none focus:ring-2 focus:ring-aero-primary/30 focus:border-aero-primary" />
            <div className="relative mb-2">
              <input type={showLoginPassword ? 'text' : 'password'} placeholder="Password" required
                className="w-full px-4 py-3 pr-11 rounded-lg border border-aero-fog dark:border-midnight-border bg-white dark:bg-midnight-bg text-aero-ink dark:text-midnight-text text-sm focus:outline-none focus:ring-2 focus:ring-aero-primary/30 focus:border-aero-primary" />
              <button
                type="button"
                onClick={() => setShowLoginPassword((v) => !v)}
                aria-label={showLoginPassword ? 'Hide password' : 'Show password'}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-aero-muted dark:text-midnight-muted hover:text-aero-ink dark:hover:text-midnight-text"
              >
                {showLoginPassword ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>

            <div className="text-right mb-5">
              <button type="button" onClick={() => { setMode('forgot'); setResetSent(false); }}
                className="text-xs font-medium text-aero-link dark:text-aero-light hover:underline">
                Forgot password?
              </button>
            </div>

            {error && <div className="mb-4 px-3 py-2 rounded-md bg-red-50 text-red-600 text-xs">{error}</div>}

            <button type="submit"
              className="w-full py-3 rounded-lg text-white font-semibold text-sm bg-gradient-to-br from-aero-primary to-aero-light hover:-translate-y-0.5 hover:shadow-lg hover:shadow-aero-primary/30 transition-all mb-5">
              Login
            </button>

            <p className="text-center text-sm text-aero-muted dark:text-midnight-muted">
              Don't have an account?{' '}
              <button type="button" onClick={() => setMode('signup')} className="font-semibold text-aero-link dark:text-aero-light hover:underline">
                Sign up
              </button>
            </p>
          </form>
        )}

        {mode === 'signup' && (
          <form onSubmit={handleSignup} className="animate-storyIn">
            <h1 className="text-2xl font-semibold text-aero-ink dark:text-midnight-text mb-1">Sign Up</h1>
            <p className="text-sm text-aero-muted dark:text-midnight-muted mb-6">Create a new account</p>

            {['Full name', 'Email address', 'Password', 'Tagline (e.g., Travel Enthusiast)'].map((ph, i) =>
              ph === 'Password' ? (
                <div key={i} className="relative mb-3">
                  <input type={showSignupPassword ? 'text' : 'password'} placeholder="Password" required
                    className="w-full px-4 py-3 pr-11 rounded-lg border border-aero-fog dark:border-midnight-border bg-white dark:bg-midnight-bg text-aero-ink dark:text-midnight-text text-sm focus:outline-none focus:ring-2 focus:ring-aero-primary/30 focus:border-aero-primary" />
                  <button
                    type="button"
                    onClick={() => setShowSignupPassword((v) => !v)}
                    aria-label={showSignupPassword ? 'Hide password' : 'Show password'}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-aero-muted dark:text-midnight-muted hover:text-aero-ink dark:hover:text-midnight-text"
                  >
                    {showSignupPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                </div>
              ) : (
                <input key={i} type={ph === 'Email address' ? 'email' : 'text'} placeholder={ph} required={ph !== 'Tagline (e.g., Travel Enthusiast)'}
                  className="w-full mb-3 px-4 py-3 rounded-lg border border-aero-fog dark:border-midnight-border bg-white dark:bg-midnight-bg text-aero-ink dark:text-midnight-text text-sm focus:outline-none focus:ring-2 focus:ring-aero-primary/30 focus:border-aero-primary" />
              )
            )}

            {error && <div className="mb-4 px-3 py-2 rounded-md bg-red-50 text-red-600 text-xs">{error}</div>}

            <button type="submit"
              className="w-full py-3 rounded-lg text-white font-semibold text-sm bg-gradient-to-br from-aero-primary to-aero-light hover:-translate-y-0.5 hover:shadow-lg hover:shadow-aero-primary/30 transition-all mb-5 mt-2">
              Sign Up
            </button>

            <p className="text-center text-sm text-aero-muted dark:text-midnight-muted">
              Already have an account?{' '}
              <button type="button" onClick={() => setMode('login')} className="font-semibold text-aero-link dark:text-aero-light hover:underline">
                Login
              </button>
            </p>
          </form>
        )}

        {mode === 'forgot' && (
          <div className="animate-storyIn">
            <h1 className="text-2xl font-semibold text-aero-ink dark:text-midnight-text mb-1">Reset password</h1>
            <p className="text-sm text-aero-muted dark:text-midnight-muted mb-6">
              {resetSent
                ? 'Check your inbox for a link to reset your password.'
                : "Enter the email on your account and we'll send a reset link."}
            </p>

            {!resetSent ? (
              <form onSubmit={handleForgotPassword}>
                <input type="email" placeholder="Email address" required
                  className="w-full mb-5 px-4 py-3 rounded-lg border border-aero-fog dark:border-midnight-border bg-white dark:bg-midnight-bg text-aero-ink dark:text-midnight-text text-sm focus:outline-none focus:ring-2 focus:ring-aero-primary/30 focus:border-aero-primary" />
                <button type="submit"
                  className="w-full py-3 rounded-lg text-white font-semibold text-sm bg-gradient-to-br from-aero-primary to-aero-light hover:-translate-y-0.5 hover:shadow-lg hover:shadow-aero-primary/30 transition-all mb-5">
                  Send reset link
                </button>
              </form>
            ) : (
              <div className="mb-5 px-4 py-3 rounded-lg bg-aero-mist/50 dark:bg-midnight-bg text-sm text-aero-ink dark:text-midnight-text">
                Link sent. It may take a minute to arrive.
              </div>
            )}

            <p className="text-center text-sm text-aero-muted dark:text-midnight-muted">
              <button type="button" onClick={() => { setMode('login'); setResetSent(false); }} className="font-semibold text-aero-link dark:text-aero-light hover:underline">
                Back to login
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}