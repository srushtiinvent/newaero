export type FlightStatus = 'ON_TIME' | 'DELAYED' | 'AT_RISK';

export interface Flight {
  id: string;
  fromCode: string;
  toCode: string;
  fromCity: string;
  toCity: string;
  date: string;
  departTime: string;
  arriveTime: string;
  flightNumber: string;
  passengerName: string;
  seat: string;
  gate: string;
  terminal: string;
  status: FlightStatus;
}

export interface BaggageInfo {
  cabinKg: number;
  checkedKg: number;
  notes: string;
}

export interface PlaceItem {
  name: string;
  category: string;
}

export interface RestaurantItem {
  name: string;
  cuisine: string;
  distance: string;
}

export interface StayItem {
  name: string;
  checkIn: string;
  address: string;
  verified: boolean;
}

export interface FlightDetails {
  baggage: BaggageInfo;
  places: PlaceItem[];
  restaurants: RestaurantItem[];
  stays: StayItem[];
}

export interface BoardingPass {
  id: string;
  flightId: string;
  route: string;
  date: string;
  seat: string;
  gate: string;
  terminal: string;
  qrValue: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
}

export interface UserProfile {
  name: string;
  initials: string;
  affiliation: string;
  completion: number;
  notifications: boolean;
  darkMode: boolean;
  privacyMode: boolean;
}

export type Screen = 'home' | 'addTrip' | 'boardingPass' | 'help' | 'profile';
export type AuthMode = 'login' | 'signup' | 'forgot';
