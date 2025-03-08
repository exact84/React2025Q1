import { render, screen } from '@testing-library/react';
import Custom404 from '../pages/404';

describe('Custom 404 Page', () => {
  it('renders the 404 error message', () => {
    render(<Custom404 />);
    expect(screen.getByText(/404\. Next Error\./i)).toBeInTheDocument();
  });
});
