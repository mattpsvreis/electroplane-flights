import FlightList from '@components/flight-list';
import FlightPreview from '@components/flight-preview';
import useFlight from '@hooks/use-flight';

function App() {
  const { hasSelectedFlight, totalCost } = useFlight();

  return (
    <main className='w-full px-12 py-8 flex flex-col gap-4 mb-24 justify-center items-center'>
      <FlightList type='outbound' />
      <hr className='border my-4 min-w-[425px]' />
      <FlightList type='inbound' />
      <FlightPreview hasSelectedFlight={hasSelectedFlight} totalCost={totalCost} />
    </main>
  );
}

export default App;
