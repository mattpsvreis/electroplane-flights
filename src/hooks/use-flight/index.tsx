import { FlightContext } from '@providers/flight-provider';
import { useContext } from 'react';

const useFlight = () => {
  const context = useContext(FlightContext);

  if (!context) {
    throw new Error('useFlight must be used within a FlightProvider!');
  }

  return context;
};

export default useFlight;
