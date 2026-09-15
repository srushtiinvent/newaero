import { Plane, Loader2, AlertCircle, Info } from 'lucide-react';

export interface FlightOffer {
  id: string;
  flightNumber: string;
  airline: string;
  status: string;
  departure: { iata?: string; time?: string; terminal?: string };
  arrival: { iata?: string; time?: string; terminal?: string };
  aircraft?: string;
}

interface FlightResultsProps {
  loading: boolean;
  error: string | null;
  offers: FlightOffer[];
  searched: boolean;
}

function formatTime(iso?: string) {
  if (!iso) return '--:--';
  return new Date(iso).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

const STATUS_STYLE: Record<string, string> = {
  Scheduled: 'bg-status-onTime/10 text-status-onTime',
  Departed: 'bg-status-onTime/10 text-status-onTime',
  EnRoute: 'bg-status-onTime/10 text-status-onTime',
  Delayed: 'bg-status-delayed/10 text-status-delayed',
  Cancelled: 'bg-status-atRisk/10 text-status-atRisk',
};

export default function FlightResults({ loading, error, offers, searched }: FlightResultsProps) {
  if (!searched) return null;

  if (loading) {
    return (
      <div className="mt-6 flex items-center justify-center gap-2 py-10 text-aero-muted dark:text-midnight-muted text-sm">
        <Loader2 size={16} className="animate-spin" /> Searching real flight schedules...
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
        No scheduled flights found for that route and date. Try a different date - not every route flies daily.
      </div>
    );
  }

  return (
    <div className="mt-6 space-y-3">
      <div className="flex items-center justify-between px-1">
        <h3 className="text-sm font-semibold text-aero-ink dark:text-midnight-text">
          {offers.length} flight{offers.length !== 1 ? 's' : ''} found
        </h3>
        <span className="flex items-center gap-1 text-[11px] text-aero-muted dark:text-midnight-muted">
          <Info size={12} /> Real schedules, no fares on this data source
        </span>
      </div>

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
              <Plane size={14} className="text-aero-primary dark:text-aero-light mb-1" />
              <div className="w-14 border-t border-dashed border-aero-fog dark:border-midnight-border" />
            </div>

            <div className="text-center shrink-0">
              <div className="font-bold text-aero-ink dark:text-midnight-text">{formatTime(offer.arrival.time)}</div>
              <div className="text-xs text-aero-muted dark:text-midnight-muted">{offer.arrival.iata}</div>
            </div>

            <div className="hidden sm:block text-xs text-aero-muted dark:text-midnight-muted pl-3 border-l border-aero-fog dark:border-midnight-border truncate">
              <div>{offer.airline} · {offer.flightNumber}</div>
              {offer.aircraft && <div className="text-[11px]">{offer.aircraft}</div>}
            </div>
          </div>

          <span className={`shrink-0 px-2.5 py-1 rounded-full text-[11px] font-medium ${STATUS_STYLE[offer.status] || 'bg-aero-mist text-aero-muted dark:bg-midnight-bg dark:text-midnight-muted'}`}>
            {offer.status}
          </span>
        </div>
      ))}
    </div>
  );
}