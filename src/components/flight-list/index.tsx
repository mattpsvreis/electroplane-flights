import Listing from '@components/listing';
import { BasicFlight } from '@interfaces/flight-data';
import { getInboundFlightData, getOutboundFlightData } from '@services/flight-data';
import { useEffect, useState } from 'react';
import { Riple } from 'react-loading-indicators';

interface FlightListProps {
  type: 'outbound' | 'inbound';
}

const FlightList = ({ type }: FlightListProps) => {
  const [flightData, setFlightData] = useState<BasicFlight[]>([]);

  const flightType = type === 'outbound' ? 'Outbound' : 'Inbound';
  const flightTypeHelper = type === 'outbound' ? 'Departing' : 'Returning';

  const handleFlightData = async () => {
    if (type === 'outbound') {
      setFlightData(await getOutboundFlightData());
    } else {
      setFlightData(await getInboundFlightData());
    }
  };

  useEffect(() => {
    handleFlightData();
  }, []);

  return (
    <div className='w-full flex flex-col gap-4 justify-center items-center'>
      <h2 className='font-bold text-xl'>
        {flightType + ' '}
        Flights <span className='text-xs italic text-black/40'>({flightTypeHelper})</span>
      </h2>
      <div className='grid grid-cols-3 grid-rows-1 gap-4 bg-gray-200 py-2 px-4 rounded-md text-lg font-semibold border border-gray-300 min-w-[425px]'>
        <p>Depart</p>
        <p className='text-right'>Arrive</p>
        <p className='text-center'>Standard</p>
      </div>
      <div className='flex flex-col gap-6 mt-2 justify-center items-start min-w-[425px]'>
        {flightData.length > 0 ? (
          flightData.map((flight, key) => {
            return <Listing key={key} flight={flight} flightType={type} />;
          })
        ) : (
          <Riple size='large' color='#111a' />
        )}
      </div>
    </div>
  );
};

export default FlightList;
