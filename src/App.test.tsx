import { render, screen } from '@testing-library/react';
import App from './App';
import { describe, expect, it } from 'vitest';

describe('App Component', () => {
  it('renders two FlightList components with correct titles', () => {
    render(<App />);

    expect(screen.getByText('Outbound Flights')).toBeInTheDocument();
    expect(screen.getByText('Inbound Flights')).toBeInTheDocument();
  });
});
