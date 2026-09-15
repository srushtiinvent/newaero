import { Home, PlaneTakeoff, Ticket, User, HelpCircle, Moon, Sun } from 'lucide-react';
import { Screen } from '../types';

interface NavbarProps {
  active: Screen;
  onNavigate: (screen: Screen) => void;
  darkMode: boolean;
  onToggleDark: () => void;
}

const NAV_ITEMS: { id: Screen; label: string; icon: typeof Home }[] = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'addTrip', label: 'Add Trip', icon: PlaneTakeoff },
  { id: 'boardingPass', label: 'Boarding Pass', icon: Ticket },
  { id: 'help', label: 'Help', icon: HelpCircle },
  { id: 'profile', label: 'Profile', icon: User },
];

export default function Navbar({ active, onNavigate, darkMode, onToggleDark }: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-white/70 dark:bg-midnight-panel/80 border-b border-aero-fog dark:border-midnight-border">
      <div className="w-full flex items-center justify-between px-6 py-3">
        <div className="flex items-center gap-2">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-aero-primary dark:text-aero-light">
            <path
              d="M2 12.5 L20 5 L14 12.5 L20 20 Z"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
          <span className="text-lg tracking-tight">
            <span className="font-bold text-aero-ink dark:text-midnight-text">Aero</span>
            <span className="font-light text-aero-muted dark:text-midnight-muted">Path</span>
          </span>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <nav className="flex items-center gap-1">
            {NAV_ITEMS.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => onNavigate(id)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-sm transition-colors ${
                  active === id
                    ? 'bg-aero-primary text-white dark:bg-aero-primary'
                    : 'text-aero-muted hover:bg-aero-mist dark:text-midnight-muted dark:hover:bg-midnight-border/50'
                }`}
              >
                <Icon size={16} />
                {label}
              </button>
            ))}
          </nav>

          <button
            onClick={onToggleDark}
            aria-label="Toggle dark mode"
            className="w-10 h-10 rounded-full flex items-center justify-center bg-aero-mist/60 dark:bg-midnight-border/40 text-aero-ink dark:text-midnight-text hover:scale-105 transition-transform"
          >
            {darkMode ? <Sun size={17} /> : <Moon size={17} />}
          </button>
        </div>

        {/* dark mode toggle still needs to show on mobile, since the nav links move to the bottom bar */}
        <button
          onClick={onToggleDark}
          aria-label="Toggle dark mode"
          className="md:hidden w-10 h-10 rounded-full flex items-center justify-center bg-aero-mist/60 dark:bg-midnight-border/40 text-aero-ink dark:text-midnight-text hover:scale-105 transition-transform"
        >
          {darkMode ? <Sun size={17} /> : <Moon size={17} />}
        </button>
      </div>

      {/* mobile bottom-style tab bar */}
      <nav className="md:hidden flex items-center justify-around border-t border-aero-fog dark:border-midnight-border px-2 py-1.5">
        {NAV_ITEMS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => onNavigate(id)}
            className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded-lg text-[11px] ${
              active === id ? 'text-aero-primary dark:text-aero-light' : 'text-aero-muted dark:text-midnight-muted'
            }`}
          >
            <Icon size={18} />
            {label}
          </button>
        ))}
      </nav>
    </header>
  );
}