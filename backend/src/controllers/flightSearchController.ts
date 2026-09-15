import { Request, Response } from 'express';
import { searchScheduledFlights, searchAirports, RawFlight } from '../config/aerodatabox';

export const search = async (req: Request, res: Response) => {
  try {
    const { origin, destination, departureDate } = req.query;

    if (!origin || !destination || !departureDate) {
      return res.status(400).json({ error: 'origin, destination, and departureDate are required' });
    }

    const flights: RawFlight[] = await searchScheduledFlights({
      origin: String(origin),
      destination: String(destination),
      date: String(departureDate),
    });

    const offers = flights.map((flight) => ({
      id: `${flight.number}-${flight.departure.scheduledTime?.utc || ''}`,
      flightNumber: flight.number,
      airline: flight.airline?.name || flight.airline?.iata || 'Unknown airline',
      status: flight.status || 'Scheduled',
      departure: {
        iata: flight.departure.airport.iata,
        time: flight.departure.scheduledTime?.local,
        terminal: flight.departure.terminal,
      },
      arrival: {
        iata: flight.arrival.airport.iata,
        time: flight.arrival.scheduledTime?.local,
        terminal: flight.arrival.terminal,
      },
      aircraft: flight.aircraft?.model,
    }));

    return res.status(200).json({ count: offers.length, offers, note: 'Real scheduled flights - no fare/price data available on the free tier' });
  } catch (err: any) {
    console.error(err);
    return res.status(502).json({ error: 'Flight search failed', detail: err.message });
  }
};

export const autocomplete = async (req: Request, res: Response) => {
  try {
    const { keyword } = req.query;
    if (!keyword || String(keyword).length < 2) {
      return res.status(200).json({ locations: [] });
    }

    const raw = await searchAirports(String(keyword));
    const locations = raw
      .filter((a) => a.iata)
      .map((a) => ({
        iata: a.iata,
        name: a.name,
        city: a.municipalityName,
        country: a.countryCode,
        type: 'AIRPORT',
      }));

    return res.status(200).json({ locations });
  } catch (err: any) {
    console.error(err);
    return res.status(502).json({ error: 'Location search failed', detail: err.message });
  }
};

export default { search, autocomplete };