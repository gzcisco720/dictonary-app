import { fireEvent, render, screen } from '@testing-library/react';
import axios from 'axios';
import { Provider } from 'react-redux';
import WordLinkList from '.';
import { DICTIONARY_EN_BASE_URL } from '../../config/constants';
import { getTestStore } from '../../_mocks_/store.mock';

jest.mock('axios');
const mockAxios = axios as jest.Mocked<typeof axios>;
describe('WordLinkList', () => {
  it('should render WordLinkList correctly', () => {
    const mockStore = getTestStore();
    render(
      <Provider store={mockStore}>
        <WordLinkList links={['hello', 'world']} />
      </Provider>,
    );
    expect(screen.getByText('hello')).toBeInTheDocument();
    expect(screen.getByText('world')).toBeInTheDocument();
  });
  it('should fetch word from dictionary api when click the link', () => {
    const mockStore = getTestStore();
    render(
      <Provider store={mockStore}>
        <WordLinkList links={['hello']} />
      </Provider>,
    );
    expect(screen.getByText('hello')).toBeInTheDocument();
    fireEvent(
      screen.getByText('hello'),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    );
    expect(mockAxios.get).toBeCalledWith(`${DICTIONARY_EN_BASE_URL}/hello`);
  });
});
