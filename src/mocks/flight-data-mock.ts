import { FlightData } from '@interfaces/flight-data';

const FlightDataMock: FlightData = {
  outbound: [
    {
      id: 1,
      departure_city: 'OAK',
      arrival_city: 'PDX',
      departure_time: '2025-02-17T10:05:00Z',
      arrival_time: '2025-02-17T19:15:00Z',
      stops: 1,
      seatsLeftPremium: 5,
      seatsLeft: 12,
      price: 344,
    },
    {
      id: 2,
      departure_city: 'OAK',
      arrival_city: 'PDX',
      departure_time: '2025-02-17T03:05:00Z',
      arrival_time: '2025-02-17T19:15:00Z',
      stops: 1,
      seatsLeftPremium: 7,
      seatsLeft: 16,
      price: 221,
    },
  ],
  inbound: [
    {
      id: 3,
      departure_city: 'PDX',
      arrival_city: 'OAK',
      departure_time: '2025-02-17T21:45:00Z',
      arrival_time: '2025-02-18T10:15:00Z',
      stops: 1,
      seatsLeftPremium: 3,
      seatsLeft: 9,
      price: 344,
    },
    {
      id: 4,
      departure_city: 'PDX',
      arrival_city: 'OAK',
      departure_time: '2025-02-17T09:05:00Z',
      arrival_time: '2025-02-17T14:15:00Z',
      stops: 1,
      seatsLeftPremium: 6,
      seatsLeft: 13,
      price: 221,
    },
  ],
};

export default FlightDataMock;
