import FlightList from '@components/flight-list';

function App() {
  return (
    <main className='w-full p-12 flex flex-col gap-4'>
      <FlightList type='outbound' />
      <hr className='border my-4' />
      <FlightList type='inbound' />
    </main>
  );
}

export default App;
