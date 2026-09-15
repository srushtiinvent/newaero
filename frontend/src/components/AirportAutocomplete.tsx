import { useEffect, useRef, useState } from 'react';
import { MapPin, Loader2 } from 'lucide-react';

export interface AirportOption {
  iata: string;
  name: string;
  city?: string;
  country?: string;
  type: string;
}

interface AirportAutocompleteProps {
  placeholder: string;
  value: AirportOption | null;
  onChange: (option: AirportOption | null) => void;
  excludeIata?: string; // prevent picking the same airport as the other field
}

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000';

export default function AirportAutocomplete({ placeholder, value, onChange, excludeIata }: AirportAutocompleteProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<AirportOption[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (query.trim().length < 2) {
      setResults([]);
      return;
    }

    debounceRef.current = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_BASE}/api/locations/autocomplete?keyword=${encodeURIComponent(query)}`);
        const data = await res.json();
        setResults((data.locations || []).filter((l: AirportOption) => l.iata !== excludeIata));
      } catch (err) {
        console.error('Airport autocomplete failed', err);
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query, excludeIata]);

  const selectOption = (option: AirportOption) => {
    onChange(option);
    setQuery('');
    setOpen(false);
  };

  const clearSelection = () => {
    onChange(null);
    setQuery('');
  };

  return (
    <div className="relative flex-1" ref={containerRef}>
      {value ? (
        <button
          type="button"
          onClick={clearSelection}
          className="w-full text-left px-4 py-3 rounded-lg bg-white border border-aero-fog dark:bg-white/5 dark:border-white/10 text-sm flex items-center justify-between group"
        >
          <span className="flex items-center gap-2 truncate">
            <MapPin size={14} className="text-aero-primary dark:text-aero-light shrink-0" />
            <span className="font-medium">{value.iata}</span>
            <span className="text-aero-muted dark:text-midnight-muted truncate">{value.city || value.name}</span>
          </span>
          <span className="text-[11px] text-aero-muted dark:text-midnight-muted opacity-0 group-hover:opacity-100 shrink-0 ml-2">
            change
          </span>
        </button>
      ) : (
        <input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => query.length >= 2 && setOpen(true)}
          placeholder={placeholder}
          className="w-full px-4 py-3 rounded-lg bg-white border border-aero-fog dark:bg-white/5 dark:border-white/10 text-sm focus:outline-none focus:border-aero-primary dark:focus:border-aero-light"
        />
      )}

      {open && !value && (
        <div className="absolute z-20 mt-1 w-full max-h-64 overflow-y-auto rounded-lg border border-aero-fog dark:border-midnight-border bg-white dark:bg-midnight-panel shadow-lg dark:shadow-black/40">
          {loading && (
            <div className="flex items-center gap-2 px-4 py-3 text-sm text-aero-muted dark:text-midnight-muted">
              <Loader2 size={14} className="animate-spin" /> Searching airports...
            </div>
          )}

          {!loading && query.trim().length >= 2 && results.length === 0 && (
            <div className="px-4 py-3 text-sm text-aero-muted dark:text-midnight-muted">
              No airports found for "{query}"
            </div>
          )}

          {!loading && query.trim().length < 2 && (
            <div className="px-4 py-3 text-sm text-aero-muted dark:text-midnight-muted">
              Keep typing a city or airport name...
            </div>
          )}

          {!loading &&
            results.map((option) => (
              <button
                key={option.iata}
                type="button"
                onClick={() => selectOption(option)}
                className="w-full text-left px-4 py-2.5 hover:bg-aero-mist/50 dark:hover:bg-midnight-bg/60 flex items-center gap-3 text-sm"
              >
                <MapPin size={14} className="text-aero-primary dark:text-aero-light shrink-0" />
                <div className="min-w-0">
                  <div className="font-medium text-aero-ink dark:text-midnight-text truncate">
                    {option.city || option.name} <span className="text-aero-muted dark:text-midnight-muted">({option.iata})</span>
                  </div>
                  <div className="text-xs text-aero-muted dark:text-midnight-muted truncate">
                    {option.name}{option.country ? `, ${option.country}` : ''}
                  </div>
                </div>
              </button>
            ))}
        </div>
      )}
    </div>
  );
}