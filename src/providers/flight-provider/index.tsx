import { BasicFlight } from '@interfaces/flight-data';
import React, { createContext, ReactNode, useState } from 'react';

interface FlightContextProps {
  outboundFlightSelected?: BasicFlight;
  inboundFlightSelected?: BasicFlight;
  selectedFlights: BasicFlight[];
  totalCost: number;
  hasSelectedFlight: boolean;
  handleSelectedFlight: (
    type: 'add' | 'remove' | 'change',
    flight: BasicFlight,
    flightType: 'outbound' | 'inbound',
    value: 'premium' | 'standard'
  ) => void;
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
  const [outboundFlightSelectedValue, setOutboundFlightSelectedValue] = useState<'premium' | 'standard'>();
  const [inboundFlightSelected, setInboundFlightSelected] = useState<BasicFlight>();
  const [inboundFlightSelectedValue, setInboundFlightSelectedValue] = useState<'premium' | 'standard'>();

  const handleSelectedFlight = (
    type: 'add' | 'remove' | 'change',
    flight: BasicFlight,
    flightType: 'outbound' | 'inbound',
    value: 'premium' | 'standard'
  ) => {
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

            if (outboundFlightSelectedValue === 'premium') {
              setTotalCost((prev) => (prev -= Number((outboundFlightSelected.price * 0.95).toFixed(2))));
            } else {
              setTotalCost((prev) => (prev -= outboundFlightSelected.price));
            }
          } else {
            updatedFlights = selectedFlights;
          }

          setOutboundFlightSelectedValue(value);

          setOutboundFlightSelected(flight);
        } else {
          if (inboundFlightSelected) {
            updatedFlights = [
              ...selectedFlights.filter((selectedFlight) => selectedFlight.id !== inboundFlightSelected.id),
            ];

            if (inboundFlightSelectedValue === 'premium') {
              setTotalCost((prev) => (prev -= Number((inboundFlightSelected.price * 0.95).toFixed(2))));
            } else {
              setTotalCost((prev) => (prev -= inboundFlightSelected.price));
            }
          } else {
            updatedFlights = selectedFlights;
          }

          setInboundFlightSelectedValue(value);

          setInboundFlightSelected(flight);
        }

        updatedFlights.push(flight);

        if (value === 'premium') {
          setTotalCost((prev) => (prev += Number((flight.price * 0.95).toFixed(2))));
        } else {
          setTotalCost((prev) => (prev += flight.price));
        }
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

      if (value === 'premium') {
        setTotalCost((prev) => (prev -= Number((flight.price * 0.95).toFixed(2))));
      } else {
        setTotalCost((prev) => (prev -= flight.price));
      }

      setHasSelectedFlight(updatedFlights.length > 0);

      setSelectedFlights(updatedFlights);
    } else {
      if (flightType === 'outbound') {
        setOutboundFlightSelectedValue(value);
      } else {
        setInboundFlightSelectedValue(value);
      }

      if (value === 'premium') {
        setTotalCost((prev) => (prev -= flight.price - Number((flight.price * 0.95).toFixed(2))));
      } else {
        setTotalCost((prev) => (prev += flight.price - Number((flight.price * 0.95).toFixed(2))));
      }
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
