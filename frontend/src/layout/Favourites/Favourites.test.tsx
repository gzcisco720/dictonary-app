import { render, screen, within } from '@testing-library/react';
import { Provider } from 'react-redux';
import Favourites from '.';
import { getTestStore } from '../../_mocks_/store.mock';

describe('Favourites', () => {
  it('should render loading spinner', () => {
    const mockStore = getTestStore({
      favourites: {
        loading: true,
        data: [],
        error: null
      }
    });
    render(
      <Provider store={mockStore}>
        <Favourites />
      </Provider>,
    );
    expect(screen.getByTestId('blocks-svg')).toBeInTheDocument();
  });
  it('should render Favourites with list and title', () => {
    const mockStore = getTestStore();
    render(
      <Provider store={mockStore}>
        <Favourites />
      </Provider>,
    );
    const { getByText } = within(screen.getByRole('heading'));
    expect(getByText('Favourites')).toBeInTheDocument();
    expect(screen.getByRole('list')).toBeInTheDocument();
  });
});


