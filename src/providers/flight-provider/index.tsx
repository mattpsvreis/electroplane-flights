import { BasicFlight } from '@interfaces/flight-data';
import React, { createContext, ReactNode, useState } from 'react';

interface FlightContextProps {
  selectedFlights?: BasicFlight[];
  totalCost: number;
  hasSelectedFlight: boolean;
  handleSelectedFlight: (type: 'add' | 'remove' | 'change', flight: BasicFlight, value: 'premium' | 'standard') => void;
}

interface FlightProviderProps {
  children: ReactNode;
}

const FlightContext = createContext<FlightContextProps>({
  totalCost: 0,
  hasSelectedFlight: false,
  handleSelectedFlight: () => {},
});

const FlightProvider: React.FC<FlightProviderProps> = ({ children }) => {
  const [selectedFlights, setSelectedFlights] = useState<BasicFlight[]>([]);
  const [totalCost, setTotalCost] = useState<number>(0);
  const [hasSelectedFlight, setHasSelectedFlight] = useState<boolean>(false);

  const handleSelectedFlight = (
    type: 'add' | 'remove' | 'change',
    flight: BasicFlight,
    value: 'premium' | 'standard'
  ) => {
    console.log('oldTotalCost:', totalCost);

    let updatedFlights;

    if (type === 'add') {
      if (selectedFlights.some((selectedFlight) => selectedFlight.id === flight.id)) {
        updatedFlights = selectedFlights;
      } else {
        updatedFlights = [...selectedFlights, flight];

        if (value === 'premium') {
          setTotalCost((prev) => (prev += Number((flight.price * 0.95).toFixed(2))));
          console.log('newTotalCost:', totalCost + Number((flight.price * 0.95).toFixed(2)));
        } else {
          setTotalCost((prev) => (prev += flight.price));
          console.log('newTotalCost:', totalCost + flight.price);
        }
      }

      setHasSelectedFlight(updatedFlights.length > 0);

      setSelectedFlights(updatedFlights);
    } else if (type === 'remove') {
      updatedFlights = selectedFlights.filter((selectedFlight) => selectedFlight.id !== flight.id);

      if (value === 'premium') {
        setTotalCost((prev) => (prev -= Number((flight.price * 0.95).toFixed(2))));
        console.log('newTotalCost:', totalCost - Number((flight.price * 0.95).toFixed(2)));
      } else {
        setTotalCost((prev) => (prev -= flight.price));
        console.log('newTotalCost:', totalCost - flight.price);
      }

      setHasSelectedFlight(updatedFlights.length > 0);

      setSelectedFlights(updatedFlights);
    } else {
      if (value === 'premium') {
        setTotalCost((prev) => (prev -= flight.price - Number((flight.price * 0.95).toFixed(2))));
        console.log('newTotalCost:', totalCost + (flight.price - Number((flight.price * 0.95).toFixed(2))));
      } else {
        setTotalCost((prev) => (prev += flight.price - Number((flight.price * 0.95).toFixed(2))));
      }
    }
  };

  return (
    <FlightContext.Provider value={{ selectedFlights, totalCost, hasSelectedFlight, handleSelectedFlight }}>
      {children}
    </FlightContext.Provider>
  );
};

export { FlightProvider, FlightContext };
