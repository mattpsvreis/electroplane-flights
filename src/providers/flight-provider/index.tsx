import { BasicFlight } from '@interfaces/flight-data';
import React, { createContext, ReactNode, useState } from 'react';

interface FlightContextProps {
  outboundFlightSelected?: BasicFlight;
  inboundFlightSelected?: BasicFlight;
  selectedFlights: BasicFlight[];
  totalCost: number;
  hasSelectedFlight: boolean;
  handleSelectedFlight: (type: 'add' | 'remove', flight: BasicFlight, flightType: 'outbound' | 'inbound') => void;
}

interface FlightProviderProps {
  children: ReactNode;
}

const FlightContext = createContext<FlightContextProps>({
  selectedFlights: [],
  totalCost: 0,
  hasSelectedFlight: false,
  handleSelectedFlight: () => {},
});

const FlightProvider: React.FC<FlightProviderProps> = ({ children }) => {
  const [selectedFlights, setSelectedFlights] = useState<BasicFlight[]>([]);
  const [totalCost, setTotalCost] = useState<number>(0);
  const [hasSelectedFlight, setHasSelectedFlight] = useState<boolean>(false);

  const [outboundFlightSelected, setOutboundFlightSelected] = useState<BasicFlight>();
  const [inboundFlightSelected, setInboundFlightSelected] = useState<BasicFlight>();

  const handleSelectedFlight = (type: 'add' | 'remove', flight: BasicFlight, flightType: 'outbound' | 'inbound') => {
    let updatedFlights: BasicFlight[] = [];

    if (type === 'add') {
      if (selectedFlights.some((selectedFlight) => selectedFlight.id === flight.id)) {
        updatedFlights = selectedFlights;
      } else {
        if (flightType === 'outbound') {
          if (outboundFlightSelected) {
            updatedFlights = [
              ...selectedFlights.filter((selectedFlight) => selectedFlight.id !== outboundFlightSelected.id),
            ];

            setTotalCost((prev) => (prev -= outboundFlightSelected.price));
          } else {
            updatedFlights = selectedFlights;
          }

          setOutboundFlightSelected(flight);
        } else {
          if (inboundFlightSelected) {
            updatedFlights = [
              ...selectedFlights.filter((selectedFlight) => selectedFlight.id !== inboundFlightSelected.id),
            ];

            setTotalCost((prev) => (prev -= inboundFlightSelected.price));
          } else {
            updatedFlights = selectedFlights;
          }

          setInboundFlightSelected(flight);
        }

        updatedFlights.push(flight);

        setTotalCost((prev) => (prev += flight.price));
      }

      setHasSelectedFlight(updatedFlights.length > 0);

      setSelectedFlights(updatedFlights);
    } else if (type === 'remove') {
      updatedFlights = selectedFlights.filter((selectedFlight) => selectedFlight.id !== flight.id);

      if (outboundFlightSelected?.id === flight.id) {
        setOutboundFlightSelected(undefined);
      }

      if (inboundFlightSelected?.id === flight.id) {
        setInboundFlightSelected(undefined);
      }

      setTotalCost((prev) => (prev -= flight.price));

      setHasSelectedFlight(updatedFlights.length > 0);

      setSelectedFlights(updatedFlights);
    }
  };

  return (
    <FlightContext.Provider
      value={{
        outboundFlightSelected,
        inboundFlightSelected,
        selectedFlights,
        totalCost,
        hasSelectedFlight,
        handleSelectedFlight,
      }}
    >
      {children}
    </FlightContext.Provider>
  );
};

export { FlightProvider, FlightContext };
