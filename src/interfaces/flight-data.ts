export interface FlightData {
  outbound: BasicFlight[];
  inbound: BasicFlight[];
}

export interface BasicFlight {
  id: number;
  departure_city: string;
  arrival_city: string;
  departure_time: string;
  arrival_time: string;
  stops: number;
  seatsLeftPremium: number;
  seatsLeft: number;
  price: number;
}
