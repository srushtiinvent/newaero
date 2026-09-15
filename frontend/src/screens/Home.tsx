import { useState } from 'react';
import { Luggage, MapPin, UtensilsCrossed, Building2, Plane } from 'lucide-react';
import { Flight, Screen } from '../types';
import { mockFlights, mockFlightDetails } from '../data/mockData';
import StoryModal from '../components/StoryModal';

interface HomeProps {
  onNavigate: (screen: Screen) => void;
}

const STATUS_STYLE: Record<Flight['status'], string> = {
  ON_TIME: 'bg-status-onTime/10 text-status-onTime',
  DELAYED: 'bg-status-delayed/10 text-status-delayed',
  AT_RISK: 'bg-status-atRisk/10 text-status-atRisk',
};

type BentoKey = 'baggage' | 'places' | 'restaurants' | 'stays';
const BENTO_ITEMS: { key: BentoKey; label: string; emoji: string; icon: typeof Luggage }[] = [
  { key: 'baggage', label: 'Baggage Allowed', emoji: '\uD83E\uDDF3', icon: Luggage },
  { key: 'places', label: 'Places to Visit', emoji: '\uD83D\uDCCD', icon: MapPin },
  { key: 'restaurants', label: 'Restaurants', emoji: '\uD83C\uDF7D\uFE0F', icon: UtensilsCrossed },
  { key: 'stays', label: 'Stays', emoji: '\uD83C\uDFE8', icon: Building2 },
];

export default function Home({ onNavigate }: HomeProps) {
  const flights = mockFlights; // swap for GET /api/trips/home
  const [openCardId, setOpenCardId] = useState<string | null>(null);
  const [storyKey, setStoryKey] = useState<BentoKey | null>(null);

  const hasFlights = flights.length > 0;

  return (
    <div className="max-w-2xl mx-auto px-5 py-8">
      {!hasFlights ? (
        <div className="flex flex-col items-center text-center py-24">
          <Plane className="text-aero-muted dark:text-midnight-muted mb-4" size={40} strokeWidth={1.2} />
          <p className="text-aero-muted dark:text-midnight-muted mb-5">No upcoming flights found.</p>
          <button
            onClick={() => onNavigate('addTrip')}
            className="px-5 py-3 rounded-full text-white font-semibold text-sm bg-gradient-to-br from-aero-primary to-aero-light hover:-translate-y-0.5 hover:shadow-lg hover:shadow-aero-primary/30 transition-all"
          >
            Want to book your next destination?
          </button>
        </div>
      ) : (
        <div className="space-y-5">
          {flights.map((f) => {
            const isOpen = openCardId === f.id;
            const details = mockFlightDetails[f.id];
            return (
              <div key={f.id} className="rounded-card border border-aero-fog dark:border-midnight-border bg-white dark:bg-midnight-panel overflow-hidden shadow-sm dark:shadow-lg dark:shadow-black/30">
                <button
                  onClick={() => setOpenCardId(isOpen ? null : f.id)}
                  className="w-full flex items-stretch text-left"
                >
                  <div className="flex-1 grid grid-cols-[1fr_auto_1fr] items-center gap-3 px-5 py-5">
                    <div>
                      <div className="text-2xl font-bold text-aero-ink dark:text-midnight-text tracking-tight">{f.fromCode}</div>
                      <div className="text-xs text-aero-muted dark:text-midnight-muted mt-1">{f.date}</div>
                      <div className="text-xs text-aero-muted dark:text-midnight-muted">{f.departTime}</div>
                    </div>
                    <div className="flex flex-col items-center px-2">
                      <Plane size={18} className="text-aero-primary dark:text-aero-light rotate-90" />
                      <div className="w-16 border-t border-dashed border-aero-fog dark:border-midnight-border mt-1" />
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-aero-ink dark:text-midnight-text tracking-tight">{f.toCode}</div>
                      <div className="text-xs text-aero-muted dark:text-midnight-muted mt-1">{f.date}</div>
                      <div className="text-xs text-aero-muted dark:text-midnight-muted">{f.arriveTime}</div>
                    </div>
                  </div>
                </button>

                <div className="px-5 pb-4 flex flex-wrap gap-x-4 gap-y-1 text-xs text-aero-muted dark:text-midnight-muted border-t border-aero-fog/70 dark:border-midnight-border/70 pt-3">
                  <span>{f.passengerName}</span>
                  <span>Flight {f.flightNumber}</span>
                  <span>Seat {f.seat}</span>
                  <span>Gate {f.gate}</span>
                  <span>Terminal {f.terminal}</span>
                  <span className={`ml-auto px-2 py-0.5 rounded-full font-medium ${STATUS_STYLE[f.status]}`}>
                    {f.status.replace('_', ' ')}
                  </span>
                </div>

                {isOpen && (
                  <div className="animate-slideDown grid grid-cols-2 sm:grid-cols-4 gap-px bg-aero-fog dark:bg-midnight-border border-t border-aero-fog dark:border-midnight-border">
                    {BENTO_ITEMS.map(({ key, label, emoji, icon: Icon }) => (
                      <button
                        key={key}
                        onClick={() => setStoryKey(key)}
                        className="bg-white dark:bg-midnight-panel px-3 py-4 flex flex-col items-center gap-1.5 text-center hover:bg-aero-mist/40 dark:hover:bg-midnight-bg transition-colors"
                      >
                        <Icon size={18} className="text-aero-primary dark:text-aero-light" />
                        <span className="text-[11px] font-medium text-aero-ink dark:text-midnight-text leading-tight">{label}</span>
                      </button>
                    ))}
                  </div>
                )}

                {isOpen && storyKey && (
                  <StoryModal
                    title={BENTO_ITEMS.find((b) => b.key === storyKey)!.label}
                    emoji={BENTO_ITEMS.find((b) => b.key === storyKey)!.emoji}
                    onClose={() => setStoryKey(null)}
                  >
                    {storyKey === 'baggage' && (
                      <div className="space-y-2 text-sm text-aero-ink dark:text-midnight-text">
                        <p>Cabin allowance: <strong>{details.baggage.cabinKg} kg</strong></p>
                        <p>Checked allowance: <strong>{details.baggage.checkedKg} kg</strong></p>
                        <p className="text-aero-muted dark:text-midnight-muted text-xs mt-3">{details.baggage.notes}</p>
                      </div>
                    )}
                    {storyKey === 'places' && (
                      <ul className="space-y-3">
                        {details.places.map((p, i) => (
                          <li key={i} className="flex items-center justify-between text-sm">
                            <span className="text-aero-ink dark:text-midnight-text">{p.name}</span>
                            <span className="text-xs text-aero-muted dark:text-midnight-muted">{p.category}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    {storyKey === 'restaurants' && (
                      <ul className="space-y-3">
                        {details.restaurants.map((r, i) => (
                          <li key={i} className="text-sm">
                            <div className="text-aero-ink dark:text-midnight-text font-medium">{r.name}</div>
                            <div className="text-xs text-aero-muted dark:text-midnight-muted">{r.cuisine} · {r.distance}</div>
                          </li>
                        ))}
                      </ul>
                    )}
                    {storyKey === 'stays' && (
                      <ul className="space-y-3">
                        {details.stays.map((s, i) => (
                          <li key={i} className="text-sm">
                            <div className="text-aero-ink dark:text-midnight-text font-medium">{s.name} {s.verified && <span className="text-status-onTime text-xs">\u2713 verified</span>}</div>
                            <div className="text-xs text-aero-muted dark:text-midnight-muted">Check-in {s.checkIn} · {s.address}</div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </StoryModal>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}