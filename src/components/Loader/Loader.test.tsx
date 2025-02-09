import { render, screen } from '@testing-library/react';
import Loader from '../Loader/Loader';

it('renders the Loader component correctly', () => {
  render(<Loader />);

  expect(screen.getByAltText('Loader')).toBeInTheDocument();
  expect(screen.getByText('Loading, please wait...')).toBeInTheDocument();
});
