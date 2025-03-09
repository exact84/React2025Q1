import { render, screen } from '@testing-library/react';
import Custom404 from '../app/not-found';

describe('Custom not-found Page', () => {
  it('renders the not-found error message', () => {
    render(<Custom404 />);
    expect(
      screen.getByText(/404\. Next App Router Error\./i)
    ).toBeInTheDocument();
  });
});
