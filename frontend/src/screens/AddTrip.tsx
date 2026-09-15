import { useState } from 'react';
import { ArrowLeftRight, Search, AlertCircle } from 'lucide-react';
import AirportAutocomplete, { AirportOption } from '../components/AirportAutocomplete';
import FlightResults, { FlightOffer } from '../components/FlightResults';

type RouteType = 'Return' | 'One-way' | 'Multi-city';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000';

export default function AddTrip() {
  const [routeType, setRouteType] = useState<RouteType>('Return');
  const [from, setFrom] = useState<AirportOption | null>(null);
  const [to, setTo] = useState<AirportOption | null>(null);
  const [depart, setDepart] = useState('');
  const [ret, setRet] = useState('');
  const [nearbyAirports, setNearbyAirports] = useState(false);
  const [directOnly, setDirectOnly] = useState(false);
  const [addStay, setAddStay] = useState(true);

  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [offers, setOffers] = useState<FlightOffer[]>([]);
  const [formError, setFormError] = useState<string | null>(null);

  const swap = () => {
    const prevFrom = from;
    setFrom(to);
    setTo(prevFrom);
  };

  const canSearch = from && to && depart;

  const handleSearch = async () => {
    setFormError(null);

    if (!from || !to) {
      setFormError('Pick both a departure and destination airport from the suggestions.');
      return;
    }
    if (!depart) {
      setFormError('Pick a departure date.');
      return;
    }
    if (routeType === 'Return' && !ret) {
      setFormError('Pick a return date, or switch to One-way.');
      return;
    }

    setSearched(true);
    setLoading(true);
    setError(null);
    setOffers([]);

    try {
      const params = new URLSearchParams({
        origin: from.iata,
        destination: to.iata,
        departureDate: depart,
      });
      if (routeType === 'Return' && ret) params.set('returnDate', ret);
      if (directOnly) params.set('nonStop', 'true');

      const res = await fetch(`${API_BASE}/api/flights/search?${params.toString()}`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Flight search failed');
      }

      setOffers(data.offers || []);
    } catch (err: any) {
      setError(err.message || 'Something went wrong searching flights. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto px-5 py-8">
      <div className="rounded-card bg-aero-mist/40 text-aero-ink dark:bg-midnight-panel dark:text-midnight-text p-6 sm:p-8 shadow-xl dark:shadow-lg dark:shadow-black/30 border border-aero-fog dark:border-midnight-border">
        <h2 className="text-lg font-semibold mb-5">Plan a new trip</h2>

        <div className="flex gap-2 mb-5">
          {(['Return', 'One-way', 'Multi-city'] as RouteType[]).map((rt) => (
            <button
              key={rt}
              onClick={() => setRouteType(rt)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                routeType === rt
                  ? 'bg-aero-primary text-white'
                  : 'bg-black/5 text-aero-muted hover:bg-black/10 dark:bg-white/5 dark:text-midnight-muted dark:hover:bg-white/10'
              }`}
            >
              {rt}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 mb-4">
          <AirportAutocomplete
            placeholder="From: city or airport"
            value={from}
            onChange={setFrom}
            excludeIata={to?.iata}
          />
          <button
            onClick={swap}
            aria-label="Swap origin and destination"
            className="w-10 h-10 shrink-0 rounded-full bg-black/5 hover:bg-black/10 dark:bg-white/10 dark:hover:bg-white/20 flex items-center justify-center transition-colors"
          >
            <ArrowLeftRight size={15} />
          </button>
          <AirportAutocomplete
            placeholder="To: city or airport"
            value={to}
            onChange={setTo}
            excludeIata={from?.iata}
          />
        </div>

        <div className="grid grid-cols-2 gap-3 mb-5">
          <label className="block">
            <span className="text-xs text-aero-muted dark:text-midnight-muted mb-1 block">Depart</span>
            <input type="date" value={depart} onChange={(e) => setDepart(e.target.value)}
              className="w-full px-3 py-2.5 rounded-lg bg-white border border-aero-fog dark:bg-white/5 dark:border-white/10 text-sm focus:outline-none focus:border-aero-primary dark:focus:border-aero-light" />
          </label>
          <label className="block">
            <span className="text-xs text-aero-muted dark:text-midnight-muted mb-1 block">Return</span>
            <input type="date" value={ret} onChange={(e) => setRet(e.target.value)} disabled={routeType === 'One-way'}
              className="w-full px-3 py-2.5 rounded-lg bg-white border border-aero-fog dark:bg-white/5 dark:border-white/10 text-sm focus:outline-none focus:border-aero-primary dark:focus:border-aero-light disabled:opacity-40" />
          </label>
        </div>

        <div className="space-y-2.5 mb-6">
          {[
            { label: 'Add nearby airports', checked: nearbyAirports, set: setNearbyAirports },
            { label: 'Direct flights', checked: directOnly, set: setDirectOnly },
            { label: 'Add a place to stay', checked: addStay, set: setAddStay },
          ].map(({ label, checked, set }) => (
            <label key={label} className="flex items-center gap-2.5 text-sm cursor-pointer">
              <input type="checkbox" checked={checked} onChange={(e) => set(e.target.checked)}
                className="w-4 h-4 rounded accent-aero-primary" />
              {label}
            </label>
          ))}
        </div>

        {formError && (
          <div className="mb-4 flex items-center gap-2 px-4 py-2.5 rounded-lg bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 text-xs">
            <AlertCircle size={14} className="shrink-0" /> {formError}
          </div>
        )}

        <div className="flex justify-end">
          <button
            onClick={handleSearch}
            disabled={!canSearch || loading}
            className="flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold transition-colors"
          >
            <Search size={15} /> Search
          </button>
        </div>
      </div>

      <FlightResults loading={loading} error={error} offers={offers} searched={searched} />
    </div>
  );
}