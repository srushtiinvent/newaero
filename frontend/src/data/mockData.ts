import { Flight, FlightDetails, BoardingPass, UserProfile } from '../types';

export const mockFlights: Flight[] = [
  {
    id: 'f1',
    fromCode: 'NAG',
    toCode: 'DXB',
    fromCity: 'Nagpur',
    toCity: 'Dubai',
    date: 'Sep 14, 2026',
    departTime: '09:40',
    arriveTime: '12:55',
    flightNumber: 'EK 5342',
    passengerName: 'Srushti Nerkar',
    seat: '14C',
    gate: 'B7',
    terminal: 'T2',
    status: 'ON_TIME',
  },
  {
    id: 'f2',
    fromCode: 'DXB',
    toCode: 'CDG',
    fromCity: 'Dubai',
    toCity: 'Paris',
    date: 'Sep 15, 2026',
    departTime: '02:15',
    arriveTime: '07:05',
    flightNumber: 'EK 073',
    passengerName: 'Srushti Nerkar',
    seat: '22A',
    gate: 'A3',
    terminal: 'T3',
    status: 'DELAYED',
  },
];

export const mockFlightDetails: Record<string, FlightDetails> = {
  f1: {
    baggage: { cabinKg: 7, checkedKg: 30, notes: 'One cabin bag + one checked bag included.' },
    places: [
      { name: 'Dubai Marina Walk', category: 'Waterfront' },
      { name: 'Al Fahidi Historic District', category: 'Heritage' },
      { name: 'Museum of the Future', category: 'Museum' },
    ],
    restaurants: [
      { name: 'Ravi Restaurant', cuisine: 'Pakistani', distance: '2.1 km from terminal' },
      { name: 'Al Ustad Special Kabab', cuisine: 'Iranian', distance: '4.5 km from terminal' },
    ],
    stays: [
      { name: 'Rove Downtown', checkIn: 'Sep 14, 3:00 PM', address: 'Downtown Dubai', verified: true },
    ],
  },
  f2: {
    baggage: { cabinKg: 7, checkedKg: 23, notes: 'Checked baggage reduced on this connecting leg.' },
    places: [
      { name: 'Musée d\u2019Orsay', category: 'Museum' },
      { name: 'Le Marais', category: 'Neighborhood' },
    ],
    restaurants: [
      { name: 'Chez L\u2019Ami Jean', cuisine: 'French Bistro', distance: '6 km from terminal' },
    ],
    stays: [
      { name: 'Hotel des Grands Boulevards', checkIn: 'Sep 15, 2:00 PM', address: '9th Arrondissement', verified: true },
    ],
  },
};

export const mockBoardingPasses: BoardingPass[] = [
  { id: 'bp1', flightId: 'f1', route: 'NAG \u2192 DXB', date: 'Sep 14, 2026', seat: '14C', gate: 'B7', terminal: 'T2', qrValue: 'AEROPATH-F1-NAGDXB-14C' },
  { id: 'bp2', flightId: 'f2', route: 'DXB \u2192 CDG', date: 'Sep 15, 2026', seat: '22A', gate: 'A3', terminal: 'T3', qrValue: 'AEROPATH-F2-DXBCDG-22A' },
];

export const mockProfile: UserProfile = {
  name: 'Srushti Nerkar',
  initials: 'SN',
  affiliation: 'MNIT Jaipur',
  completion: 60,
  notifications: true,
  darkMode: false,
  privacyMode: false,
};
