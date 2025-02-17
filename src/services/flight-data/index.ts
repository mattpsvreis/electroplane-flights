import { BasicFlight } from '../../interfaces/flight-data';
import FlightDataMock from '../../mocks/flight-data-mock';

export const GetOutboundFlightData = async (): Promise<BasicFlight[]> => {
  return new Promise((resolve) => setTimeout(() => resolve(FlightDataMock.outbound), 300));
};

export const GetInboundFlightData = async (): Promise<BasicFlight[]> => {
  return new Promise((resolve) => setTimeout(() => resolve(FlightDataMock.inbound), 300));
};
