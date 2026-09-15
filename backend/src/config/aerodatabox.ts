// Thin client for the AeroDataBox API (via RapidAPI).
// Chosen because Amadeus's free self-service portal was decommissioned on July 17, 2026,
// and Kiwi/Skyscanner now require partnership applications. AeroDataBox remains genuinely
// self-serve and free (small monthly quota), but gives real flight SCHEDULES, not fares -
// no price data. That trade-off is why this project shows real flights without prices.
//
// Sign up: https://rapidapi.com/aedbx-aedbx/api/aerodatabox
// Subscribe to the free "Basic" plan, then copy your RapidAPI key into backend/.env as RAPIDAPI_KEY.
//
// NOTE: this integration has not been tested against the live API from this environment
// (RapidAPI isn't reachable from the sandbox this was written in). The FIDS schedule endpoint
// below is well-documented and should work as written; the airport-search endpoint is a
// best-effort based on public docs - if it 404s, check the exact path in the RapidAPI
// "Test Endpoint" playground and it's a one-line fix here.

const RAPIDAPI_HOST = 'aerodatabox.p.rapidapi.com';
const BASE_URL = `https://${RAPIDAPI_HOST}`;

function getHeaders(): Record<string, string> {
  const apiKey = process.env.RAPIDAPI_KEY;
  if (!apiKey) {
    throw new Error('RAPIDAPI_KEY is not set in backend/.env');
  }
  return {
    'X-RapidAPI-Key': apiKey,
    'X-RapidAPI-Host': RAPIDAPI_HOST,
  };
}

export interface RawFlight {
  number: string;
  callSign?: string;
  status?: string;
  airline?: { name?: string; iata?: string };
  departure: {
    airport: { iata?: string; icao?: string; name?: string };
    scheduledTime?: { local?: string; utc?: string };
    terminal?: string;
  };
  arrival: {
    airport: { iata?: string; icao?: string; name?: string };
    scheduledTime?: { local?: string; utc?: string };
    terminal?: string;
  };
  aircraft?: { model?: string };
}

// Fetches scheduled departures from `originIata` within a local time window.
// AeroDataBox's free tier caps each FIDS request to a 12-hour window, so a full
// day requires two calls - this function makes one call for the given window.
async function getDeparturesWindow(originIata: string, fromLocalISO: string, toLocalISO: string): Promise<RawFlight[]> {
  const url = `${BASE_URL}/flights/airports/iata/${originIata}/${fromLocalISO}/${toLocalISO}` +
    `?withLeg=true&direction=Departure&withCancelled=false&withCodeshared=true&withCargo=false&withPrivate=false&withLocation=false`;

  const response = await fetch(url, { headers: getHeaders() });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`AeroDataBox FIDS request failed (${response.status}): ${text}`);
  }

  const data = (await response.json()) as { departures?: RawFlight[] };
  return data.departures || [];
}

export interface ScheduleSearchParams {
  origin: string;      // IATA code
  destination: string; // IATA code
  date: string;        // YYYY-MM-DD, interpreted in the origin airport's local time
}

// Searches real scheduled flights between two airports on a given date.
// Since AeroDataBox doesn't offer a direct origin+destination search, this pulls
// all departures from the origin airport for the day (in two 12h windows) and
// filters client-side for ones arriving at the requested destination.
export async function searchScheduledFlights(params: ScheduleSearchParams): Promise<RawFlight[]> {
  const morningWindow = await getDeparturesWindow(
    params.origin,
    `${params.date}T00:00`,
    `${params.date}T12:00`
  );
  const eveningWindow = await getDeparturesWindow(
    params.origin,
    `${params.date}T12:00`,
    `${params.date}T23:59`
  );

  const allDepartures = [...morningWindow, ...eveningWindow];

  return allDepartures.filter(
    (flight) => flight.arrival?.airport?.iata?.toUpperCase() === params.destination.toUpperCase()
  );
}

export interface RawAirportSearchResult {
  iata?: string;
  icao?: string;
  name?: string;
  municipalityName?: string;
  countryCode?: string;
}

// Best-effort airport/city autocomplete - verify this path against the RapidAPI
// playground for AeroDataBox; adjust if the actual param name/path differs.
export async function searchAirports(term: string): Promise<RawAirportSearchResult[]> {
  const url = `${BASE_URL}/airports/search/term?q=${encodeURIComponent(term)}&limit=8`;

  const response = await fetch(url, { headers: getHeaders() });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`AeroDataBox airport search failed (${response.status}): ${text}`);
  }

  const data = (await response.json()) as { items?: RawAirportSearchResult[] };
  return data.items || [];
}