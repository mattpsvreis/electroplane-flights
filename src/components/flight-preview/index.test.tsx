import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import FlightPreview from '.';

describe('FlightPreview Component', () => {
  it('renders correctly when hasSelectedFlight is true and totalCost is provided', () => {
    render(<FlightPreview totalCost={1234.56} hasSelectedFlight={true} />);

    expect(screen.getByText('Total cost:')).toBeInTheDocument();
    expect(screen.getByText('$1,234.56')).toBeInTheDocument();
    expect(screen.getByText('Continue to checkout')).toBeInTheDocument();
  });

  it('does not render when hasSelectedFlight is false', () => {
    render(<FlightPreview totalCost={1234.56} hasSelectedFlight={false} />);

    expect(screen.queryByText('Total cost:')).not.toBeInTheDocument();
    expect(screen.queryByText('Continue to checkout')).not.toBeInTheDocument();
  });
});
