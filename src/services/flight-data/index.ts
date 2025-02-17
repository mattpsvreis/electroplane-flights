import { BasicFlight } from '../../interfaces/flight-data';
import FlightDataMock from '../../mocks/flight-data-mock';

export const getOutboundFlightData = async (): Promise<BasicFlight[]> => {
  return new Promise((resolve) => setTimeout(() => resolve(FlightDataMock.outbound), 1150));
};

export const getInboundFlightData = async (): Promise<BasicFlight[]> => {
  return new Promise((resolve) => setTimeout(() => resolve(FlightDataMock.inbound), 1150));
};
