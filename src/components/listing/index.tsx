import useFlight from '@hooks/use-flight';
import { BasicFlight } from '@interfaces/flight-data';
import { AirplaneTakeoff, Seat, WifiHigh } from '@phosphor-icons/react';
import { differenceInHoursAndMinutes, getHoursAndMinutes12, isArrivalNextDay } from '@utils/time-conversion-utils';
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

  const { selectedFlights, handleSelectedFlight } = useFlight();

  const isSelectedFlight = selectedFlights.some((selectedFlight) => selectedFlight.id === flight.id);
  console.log('isSelectedFlight:', isSelectedFlight);

  const handleRadioChange = (value: 'premium' | 'standard') => {
    console.log('value:', value);

    if (selectedOption === value) {
      setSelectedOption(null);
      handleSelectedFlight('remove', flight, value);
    } else {
      setSelectedOption(value);
      if (selectedFlights.some((selectedFlight) => selectedFlight.id === flight.id)) {
        handleSelectedFlight('change', flight, value);
      } else {
        handleSelectedFlight('add', flight, value);
      }
    }
  };

  return (
    <div
      className={`w-full col-span-7 grid grid-cols-7 rounded-md border px-4 min-h-24 place-content-center shadow-md ${
        isSelectedFlight ? 'bg-blue-100 hover:bg-blue-200' : 'hover:bg-blue-50'
      }`}
    >
      <div className='place-content-center'>
        <p className='text-sm'>{flight.departure_city}</p>
        <p className='text-lg'>{getHoursAndMinutes12(flight.departure_time)}</p>
      </div>
      <div className='text-center place-content-center'>
        <div className='flex flex-row items-center justify-center gap-4 font-semibold'>
          <p>––––––––</p>
          <AirplaneTakeoff size={32} weight='thin' />
          <p>––––––––</p>
        </div>
        <p className='text-black/70 text-xs italic'>
          {differenceInHoursAndMinutes(flight.departure_time, flight.arrival_time)}
        </p>
      </div>
      <div className='text-right place-content-center'>
        <p className='text-sm'>{flight.arrival_city}</p>
        <p className='text-lg'>{getHoursAndMinutes12(flight.arrival_time)}</p>
        {isArrivalNextDay(flight.departure_time, flight.arrival_time) ? (
          <p className='text-sm text-black/70 italic'>Next Day</p>
        ) : null}
      </div>
      <button
        type='button'
        className='text-center cursor-pointer w-fit place-self-center text-blue-500 font-bold flex flex-row gap-2 justify-center items-center'
      >
        <p>{flight.stops} Stop</p>
        <WifiHigh size={24} weight='bold' />
      </button>
      <button className='text-center cursor-pointer w-fit place-self-center text-blue-500 font-bold flex flex-row justify-center items-center'>
        <p>View Seat Map</p>
        <Seat size={32} weight='regular' />
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
            className='flex justify-center items-center size-4 bg-white rounded-full border border-black/75 hover:border-black/90 active:border-black/50 cursor-pointer'
          >
            {selectedOption === 'premium' ? (
              <div className='bg-black/75 hover:bg-black/90 active:bg-black/50 size-2 rounded-full' />
            ) : null}
          </label>
          <span className='text-xl font-bold'>{premiumPrice}</span>
        </div>
        {flight.seatsLeftPremium < 10 ? (
          <p className='text-left text-sm'>
            Only <u>{flight.seatsLeftPremium}</u> seats left at this price
          </p>
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
            className='flex justify-center items-center size-4 bg-white rounded-full border border-black/75 hover:border-black/90 active:border-black/50 cursor-pointer'
          >
            {selectedOption === 'standard' ? (
              <div className='bg-black/75 hover:bg-black/90 active:bg-black/50 size-2 rounded-full' />
            ) : null}
          </label>
          <span className='text-xl font-bold'>{fullPrice}</span>
        </div>
        {flight.seatsLeft < 10 ? (
          <p className='text-left text-sm'>
            Only <u>{flight.seatsLeft}</u> seats left at this price
          </p>
        ) : null}
      </div>
    </div>
  );
};

export default Listing;
