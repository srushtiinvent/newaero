import { useState } from 'react';
import { Bell, Moon, Shield, LogOut, ChevronRight } from 'lucide-react';
import { mockProfile } from '../data/mockData';

interface ProfileProps {
  darkMode: boolean;
  onToggleDark: () => void;
}

export default function Profile({ darkMode, onToggleDark }: ProfileProps) {
  const [notifications, setNotifications] = useState(mockProfile.notifications);
  const [privacy, setPrivacy] = useState(mockProfile.privacyMode);

  const completion = mockProfile.completion;
  const radius = 46;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (completion / 100) * circumference;

  const rows: { icon: typeof Bell; title: string; subtitle: string; toggle: boolean; onPress: () => void }[] = [
    { icon: Bell, title: 'Notifications', subtitle: 'Daily reminders', toggle: notifications, onPress: () => setNotifications((v) => !v) },
    { icon: Moon, title: 'Dark Mode', subtitle: 'Appearance', toggle: darkMode, onPress: onToggleDark },
    { icon: Shield, title: 'Privacy', subtitle: 'Data & security', toggle: privacy, onPress: () => setPrivacy((v) => !v) },
  ];

  return (
    <div className="max-w-xl mx-auto px-5 py-8">
      <div className="rounded-card bg-aero-mist/50 text-aero-ink dark:bg-midnight-bg dark:text-white p-8 flex flex-col items-center mb-6 border border-aero-fog dark:border-midnight-border">
        <div className="w-16 h-16 rounded-full bg-aero-primary flex items-center justify-center text-lg font-bold text-white mb-3">
          {mockProfile.initials}
        </div>
        <div className="font-semibold text-lg">{mockProfile.name}</div>
        <div className="text-xs text-aero-muted dark:text-midnight-muted mt-0.5">{mockProfile.affiliation}</div>
      </div>

      <div className="flex flex-col items-center mb-6">
        <svg width="120" height="120" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r={radius} fill="none" stroke="currentColor" strokeWidth="8" className="text-aero-mist dark:text-midnight-border" />
          <circle
            cx="60" cy="60" r={radius} fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round"
            className="text-aero-primary dark:text-aero-light"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            transform="rotate(-90 60 60)"
          />
          <text x="60" y="66" textAnchor="middle" className="fill-aero-ink dark:fill-midnight-text text-xl font-bold">
            {completion}%
          </text>
        </svg>
        <p className="text-xs text-aero-muted dark:text-midnight-muted mt-2">Countries logged toward your travel goal</p>
      </div>

      <div className="rounded-card border border-aero-fog dark:border-midnight-border bg-white dark:bg-midnight-panel divide-y divide-aero-fog dark:divide-midnight-border overflow-hidden shadow-sm dark:shadow-lg dark:shadow-black/30">
        {rows.map(({ icon: Icon, title, subtitle, onPress }) => (
          <button
            key={title}
            onClick={onPress}
            className="w-full flex items-center gap-3 px-5 py-4 hover:bg-aero-mist/30 dark:hover:bg-midnight-bg transition-colors text-left"
          >
            <Icon size={18} className="text-aero-primary dark:text-aero-light shrink-0" />
            <div className="flex-1">
              <div className="text-sm font-medium text-aero-ink dark:text-midnight-text">{title}</div>
              <div className="text-xs text-aero-muted dark:text-midnight-muted">{subtitle}</div>
            </div>
            <ChevronRight size={16} className="text-aero-muted dark:text-midnight-muted" />
          </button>
        ))}
        <button className="w-full flex items-center gap-3 px-5 py-4 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors text-left">
          <LogOut size={18} className="text-red-500 shrink-0" />
          <div className="flex-1">
            <div className="text-sm font-medium text-red-500">Logout</div>
            <div className="text-xs text-aero-muted dark:text-midnight-muted">Sign out of AeroPath</div>
          </div>
          <ChevronRight size={16} className="text-aero-muted dark:text-midnight-muted" />
        </button>
      </div>
    </div>
  );
}