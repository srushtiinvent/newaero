import { Plane, Loader2, AlertCircle } from 'lucide-react';

export interface FlightOffer {
  id: string;
  price: string;
  currency: string;
  stops: number;
  durationISO: string;
  departure: { iata: string; time: string };
  arrival: { iata: string; time: string };
  carrierCode: string;
  flightNumber: string;
}

interface FlightResultsProps {
  loading: boolean;
  error: string | null;
  offers: FlightOffer[];
  searched: boolean;
}

function formatDuration(iso: string) {
  // Amadeus returns ISO 8601 durations like "PT5H25M"
  const match = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?/);
  const hours = match?.[1] ? `${match[1]}h ` : '';
  const minutes = match?.[2] ? `${match[2]}m` : '';
  return `${hours}${minutes}`.trim() || iso;
}

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString([], { month: 'short', day: 'numeric' });
}

export default function FlightResults({ loading, error, offers, searched }: FlightResultsProps) {
  if (!searched) return null;

  if (loading) {
    return (
      <div className="mt-6 flex items-center justify-center gap-2 py-10 text-aero-muted dark:text-midnight-muted text-sm">
        <Loader2 size={16} className="animate-spin" /> Searching live flights...
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-6 flex items-center gap-2 px-4 py-3 rounded-lg bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 text-sm">
        <AlertCircle size={16} className="shrink-0" /> {error}
      </div>
    );
  }

  if (offers.length === 0) {
    return (
      <div className="mt-6 text-center py-10 text-aero-muted dark:text-midnight-muted text-sm">
        No flights found for that route and date. Try a different date or nearby airports.
      </div>
    );
  }

  return (
    <div className="mt-6 space-y-3">
      <h3 className="text-sm font-semibold text-aero-ink dark:text-midnight-text px-1">
        {offers.length} flight{offers.length !== 1 ? 's' : ''} found
      </h3>
      {offers.map((offer) => (
        <div
          key={offer.id}
          className="rounded-card border border-aero-fog dark:border-midnight-border bg-white dark:bg-midnight-panel px-5 py-4 shadow-sm dark:shadow-lg dark:shadow-black/30 flex items-center justify-between gap-4"
        >
          <div className="flex items-center gap-4 min-w-0">
            <div className="text-center shrink-0">
              <div className="font-bold text-aero-ink dark:text-midnight-text">{formatTime(offer.departure.time)}</div>
              <div className="text-xs text-aero-muted dark:text-midnight-muted">{offer.departure.iata}</div>
            </div>

            <div className="flex flex-col items-center px-2 shrink-0">
              <span className="text-[11px] text-aero-muted dark:text-midnight-muted">{formatDuration(offer.durationISO)}</span>
              <div className="w-14 border-t border-dashed border-aero-fog dark:border-midnight-border my-1 relative">
                <Plane size={12} className="absolute -top-1.5 right-0 text-aero-primary dark:text-aero-light" />
              </div>
              <span className="text-[11px] text-aero-muted dark:text-midnight-muted">
                {offer.stops === 0 ? 'Direct' : `${offer.stops} stop${offer.stops > 1 ? 's' : ''}`}
              </span>
            </div>

            <div className="text-center shrink-0">
              <div className="font-bold text-aero-ink dark:text-midnight-text">{formatTime(offer.arrival.time)}</div>
              <div className="text-xs text-aero-muted dark:text-midnight-muted">{offer.arrival.iata}</div>
            </div>

            <div className="hidden sm:block text-xs text-aero-muted dark:text-midnight-muted pl-3 border-l border-aero-fog dark:border-midnight-border truncate">
              {offer.flightNumber} · {formatDate(offer.departure.time)}
            </div>
          </div>

          <div className="text-right shrink-0">
            <div className="font-bold text-aero-ink dark:text-midnight-text">
              {offer.currency} {offer.price}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}