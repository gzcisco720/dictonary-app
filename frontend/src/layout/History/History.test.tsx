import { render, screen, within } from '@testing-library/react';
import { Provider } from 'react-redux';
import History from '.';
import { getTestStore } from '../../_mocks_/store.mock';

describe('History', () => {
  it('should render History with list and title', () => {
    const mockStore = getTestStore();
    render(
      <Provider store={mockStore}>
        <History />
      </Provider>,
    );
    const { getByText } = within(screen.getByRole('heading'));
    expect(getByText('Search History')).toBeInTheDocument();
    expect(screen.getByRole('list')).toBeInTheDocument();
  });
});
