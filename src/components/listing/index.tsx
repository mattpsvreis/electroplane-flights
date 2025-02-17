import useFlight from '@hooks/use-flight';
import { BasicFlight } from '@interfaces/flight-data';
import { getHoursAndMinutes12, isArrivalNextDay } from '@utils/time-conversion-utils';
import { useEffect, useState } from 'react';

interface ListingProps {
  flight: BasicFlight;
  flightType: 'outbound' | 'inbound';
}

const Listing = ({ flight, flightType }: ListingProps) => {
  const [selectedOption, setSelectedOption] = useState<'premium' | 'standard' | null>(null);

  const fullPrice = flight.price.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  const { outboundFlightSelected, inboundFlightSelected, selectedFlights, handleSelectedFlight } = useFlight();

  const isSelectedFlight =
    flightType === 'outbound' ? outboundFlightSelected?.id === flight.id : inboundFlightSelected?.id === flight.id;

  const handleRadioChange = (value: 'premium' | 'standard') => {
    if (selectedOption === value) {
      setSelectedOption(null);
      handleSelectedFlight('remove', flight, flightType);
    } else {
      setSelectedOption(value);
      handleSelectedFlight('add', flight, flightType);
    }
  };

  useEffect(() => {
    if (!isSelectedFlight) {
      setSelectedOption(null);
    }
  }, [selectedFlights]);

  return (
    <div
      className={`min-w-[650px] col-span-3 grid grid-cols-3 rounded-md border px-4 min-h-24 place-content-center shadow-md ${
        isSelectedFlight ? 'bg-blue-100 hover:bg-blue-200' : 'hover:bg-blue-50'
      }`}
    >
      <div className='place-content-center'>
        <p className='text-sm'>{flight.departure_city}</p>
        <p className='text-lg'>{getHoursAndMinutes12(flight.departure_time)}</p>
      </div>
      <div className='text-right place-content-center'>
        <p className='text-sm'>{flight.arrival_city}</p>
        <p className='text-lg'>{getHoursAndMinutes12(flight.arrival_time)}</p>
        {isArrivalNextDay(flight.departure_time, flight.arrival_time) ? (
          <p className='text-sm text-black/70 italic'>Next Day</p>
        ) : null}
      </div>

      <div className='text-center place-content-center p-4 gap-2'>
        <div className='flex flex-row gap-2 justify-center items-center'>
          <input
            type='checkbox'
            name={'billingType' + flight.id}
            value='standard'
            className='hidden'
            checked={selectedOption === 'standard'}
            onChange={() => handleRadioChange('standard')}
            id={'radio2' + flight.id}
          />
          <label
            htmlFor={'radio2' + flight.id}
            className='flex justify-center items-center size-4 bg-white rounded-full border border-black/75 hover:border-black/90 active:border-black/50 cursor-pointer'
          >
            {selectedOption === 'standard' ? (
              <div className='bg-black/75 hover:bg-black/90 active:bg-black/50 size-2 rounded-full' />
            ) : null}
          </label>
          <span className='text-xl font-bold'>{fullPrice}</span>
        </div>
      </div>
    </div>
  );
};

export default Listing;
