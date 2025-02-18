import { describe, expect, it, Mock, vi } from 'vitest';
import FlightList from '.';
import { render, screen, waitFor } from '@testing-library/react';
import FlightDataMock from '@mocks/flight-data-mock';
import { getOutboundFlightData, getInboundFlightData } from '@services/flight-data';
import { FlightProvider } from '@providers/flight-provider';

vi.mock('@services/flight-data', () => ({
  getOutboundFlightData: vi.fn(),
  getInboundFlightData: vi.fn(),
}));

describe('FlightList Component', () => {
  it('renders outbound flights data correctly', async () => {
    const mockOutboundFlights = FlightDataMock.outbound[0];

    (getOutboundFlightData as Mock).mockResolvedValue([mockOutboundFlights]);

    await expect(getOutboundFlightData()).resolves.toEqual([mockOutboundFlights]);

    render(<FlightList type='outbound' />);

    expect(screen.getByText('Outbound Flights')).toBeInTheDocument();
    expect(screen.getByText('(Departing)')).toBeInTheDocument();

    waitFor(() => expect(screen.getByText('2:05 AM')).toBeInTheDocument());
    waitFor(() => expect(screen.getByText('11:15 AM')).toBeInTheDocument());
    waitFor(() => expect(screen.getByText('1')).toBeInTheDocument());
    waitFor(() => expect(screen.getByText('5')).toBeInTheDocument());
    waitFor(() => expect(screen.getByText('12')).toBeInTheDocument());
    waitFor(() => expect(screen.getByText('$328.60')).toBeInTheDocument());
    waitFor(() => expect(screen.getByText('$344.00')).toBeInTheDocument());
  });

  it('renders inbound flights data correctly', async () => {
    const mockInboundFlights = FlightDataMock.inbound[0];

    (getInboundFlightData as Mock).mockResolvedValue([mockInboundFlights]);

    await expect(getInboundFlightData()).resolves.toEqual([mockInboundFlights]);

    render(
      <FlightProvider>
        <FlightList type='inbound' />
      </FlightProvider>
    );

    expect(screen.getByText('Inbound Flights')).toBeInTheDocument();
    expect(screen.getByText('(Returning)')).toBeInTheDocument();

    waitFor(() => expect(screen.getByText('1:45 PM')).toBeInTheDocument());
    waitFor(() => expect(screen.getByText('2:15 AM')).toBeInTheDocument());
    waitFor(() => expect(screen.getByText('Next Day')).toBeInTheDocument());
    waitFor(() => expect(screen.getByText('1')).toBeInTheDocument());
    waitFor(() => expect(screen.getByText('3')).toBeInTheDocument());
    waitFor(() => expect(screen.getByText('9')).toBeInTheDocument());
    waitFor(() => expect(screen.getByText('$326.80')).toBeInTheDocument());
    waitFor(() => expect(screen.getByText('$344.00')).toBeInTheDocument());
  });

  it('renders loading indicator when flight data is not yet available', () => {
    render(<FlightList type='outbound' />);

    expect(screen.getByRole('status')).toBeInTheDocument();
  });
});
