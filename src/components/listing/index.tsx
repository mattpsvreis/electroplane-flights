import { BasicFlight } from '@interfaces/flight-data';
import { getHoursAndMinutes12, isArrivalNextDay } from '@utils/time-conversion-utils';
import { useState } from 'react';

interface ListingProps {
  flight: BasicFlight;
}

const Listing = ({ flight }: ListingProps) => {
  const [selectedOption, setSelectedOption] = useState<'premium' | 'standard' | null>(null);

  const premiumPrice = (flight.price * 0.95).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  const fullPrice = flight.price.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  const handleRadioChange = (value: 'premium' | 'standard') => {
    setSelectedOption(selectedOption === value ? null : value);
  };

  return (
    <div className='col-span-7 grid grid-cols-7 rounded-md border px-4 min-h-24 place-content-center'>
      <div className='place-content-center'>
        <p className='text-sm'>{flight.departure_city}</p>
        <p className='text-lg'>{getHoursAndMinutes12(flight.departure_time)}</p>
      </div>
      <div className='text-center place-content-center'>flighticongraphy</div>
      <div className='text-right place-content-center'>
        <p className='text-sm'>{flight.arrival_city}</p>
        <p className='text-lg'>{getHoursAndMinutes12(flight.arrival_time)}</p>
        {isArrivalNextDay(flight.departure_time, flight.arrival_time) ? (
          <p className='text-sm text-black/70 italic'>Next Day</p>
        ) : null}
      </div>
      <button type='button' className='text-center cursor-pointer w-fit place-self-center text-blue-500 font-bold'>
        <p>{flight.stops} Stop</p>
      </button>
      <button className='text-center cursor-pointer w-fit place-self-center text-blue-500 font-bold'>
        <p>View Seat Map</p>
      </button>
      <div className='text-center place-content-center bg-yellow-300/80 min-h-24 p-4'>
        <div className='flex flex-row gap-2 justify-start items-center'>
          <input
            type='checkbox'
            name={'billingType' + flight.id}
            value='premium'
            className='hidden'
            checked={selectedOption === 'premium'}
            onChange={() => handleRadioChange('premium')}
            id={'radio1' + flight.id}
          />
          <label
            htmlFor={'radio1' + flight.id}
            className='flex justify-center items-center size-4 bg-white rounded-full border border-black/75 hover:border-black/90 active:border-black/50'
          >
            {selectedOption === 'premium' ? (
              <div className='bg-black/75 hover:bg-black/90 active:bg-black/50 size-2 rounded-full' />
            ) : null}
          </label>
          <span className='text-xl font-bold'>{premiumPrice}</span>
        </div>
        {flight.seatsLeftPremium < 10 ? (
          <p className='text-left text-sm'>Only {flight.seatsLeftPremium} seats left at this price</p>
        ) : null}
      </div>
      <div className='text-center place-content-center p-4 gap-2'>
        <div className='flex flex-row gap-2 justify-start items-center'>
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
            className='flex justify-center items-center size-4 bg-white rounded-full border border-black/75 hover:border-black/90 active:border-black/50'
          >
            {selectedOption === 'standard' ? (
              <div className='bg-black/75 hover:bg-black/90 active:bg-black/50 size-2 rounded-full' />
            ) : null}
          </label>
          <span className='text-xl font-bold'>{fullPrice}</span>
        </div>
        {flight.seatsLeft < 10 ? (
          <p className='text-left text-sm'>Only {flight.seatsLeft} seats left at this price</p>
        ) : null}
      </div>
    </div>
  );
};

export default Listing;
