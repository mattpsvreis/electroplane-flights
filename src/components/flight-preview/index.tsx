import { ArrowSquareRight } from '@phosphor-icons/react';

interface FlightPreviewProps {
  totalCost: number;
  hasSelectedFlight: boolean;
}

const FlightPreview = ({ totalCost, hasSelectedFlight }: FlightPreviewProps) => {
  return hasSelectedFlight ? (
    <footer className='fixed bottom-0 w-full -mx-12 min-h-24 bg-yellow-100 border-t-1 gap-4 border-t-black flex flex-row justify-end items-center px-12'>
      <p className='text-lg'>
        <b>Total cost:</b> {totalCost.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
      </p>
      <button className='flex flex-row gap-2 items-center justify-center cursor-pointer border px-3 py-1 rounded-md bg-white/80'>
        <p className='text-lg font-semibold'>Continue to checkout</p>
        <ArrowSquareRight size={32} weight='fill' />
      </button>
    </footer>
  ) : null;
};

export default FlightPreview;
