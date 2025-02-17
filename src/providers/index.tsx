import { ReactNode } from 'react';
import { FlightProvider } from './flight-provider';

interface ProvidersProps {
  children: ReactNode;
}

const Providers = ({ children }: ProvidersProps) => {
  return <FlightProvider>{children}</FlightProvider>;
};

export default Providers;
