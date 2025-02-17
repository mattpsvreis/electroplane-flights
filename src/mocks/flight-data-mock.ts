import { FlightData } from '../interfaces/flight-data';

const FlightDataMock: FlightData = {
  outbound: [
    {
      id: 1,
      departure_city: 'OAK',
      arrival_city: 'PDX',
      departure_time: '10:05AM',
      arrival_time: '7:15PM',
      price: 344,
    },
    {
      id: 2,
      departure_city: 'OAK',
      arrival_city: 'PDX',
      departure_time: '3:05AM',
      arrival_time: '7:15PM',
      price: 221,
    },
  ],
  inbound: [
    {
      id: 3,
      departure_city: 'PDX',
      arrival_city: 'OAK',
      departure_time: '3:45PM',
      arrival_time: '7:15PM',
      price: 344,
    },
    {
      id: 4,
      departure_city: 'PDX',
      arrival_city: 'OAK',
      departure_time: '9:05AM',
      arrival_time: '2:15PM',
      price: 221,
    },
  ],
};

export default FlightDataMock;
