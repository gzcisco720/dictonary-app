import { fireEvent, render, screen } from '@testing-library/react';
import axios from 'axios';
import { act } from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import Main from '.';
import singleWord from '../../_mocks_/singleWord.mock';
import { getTestStore } from '../../_mocks_/store.mock';

jest.mock('axios');
const mockAxios = axios as jest.Mocked<typeof axios>;
describe('Main', () => {
  it('should render word card on Main', async () => {
    const mockStore = getTestStore({
      words: {
        loading: false,
        data: [singleWord],
        error: null,
      },
    });
    render(
      <Provider store={mockStore}>
        <Main />
      </Provider>,
    );
    expect(screen.getByText('A challenge, trial.')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
    // Note: await act(async) for fix 'not wrapped in act' warning
    await act(async () => {
      fireEvent(
        screen.getByRole('button'),
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
        }),
      );
    });
    expect(mockAxios.post).toBeCalled();
  });
  it('should render loading when loading word', () => {
    const mockStore = getTestStore({
      words: {
        loading: true,
        data: [],
        error: null,
      },
    });
    render(
      <Provider store={mockStore}>
        <Main />
      </Provider>,
    );
    expect(screen.getByTestId('blocks-svg')).toBeInTheDocument();
  });
  it('should render Unknown word when word not found', () => {
    const mockStore = getTestStore({
      words: {
        loading: false,
        data: [],
        error: {
          code: '404',
          message: 'not found',
        },
      },
    });
    render(
      <Provider store={mockStore}>
        <Main />
      </Provider>,
    );
    expect(screen.getByText('Unknown word')).toBeInTheDocument();
  });
  it('should render favourite checked word on Main', () => {
    const mockStore = getTestStore({
      favourites: {
        loading: false,
        data: ['test'],
        error: null,
      },
      words: {
        loading: false,
        data: [singleWord],
        error: null,
      },
    });
    const { container } = render(
      <Provider store={mockStore}>
        <Main />
      </Provider>,
    );
    expect(
      container.getElementsByClassName('Main_favouriteBtn--checked').length,
    ).toBe(1);
  });
  it('should fire a post api call when click favourite icon', async () => {
    const mockStore = getTestStore({
      words: {
        loading: false,
        data: [singleWord],
        error: null,
      },
    });
    render(
      <Provider store={mockStore}>
        <Main />
      </Provider>,
    );
    // Note: await act(async) for fix 'not wrapped in act' warning
    await act(async () => {
      fireEvent(
        screen.getByRole('button'),
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
        }),
      );
    });
    expect(mockAxios.post).toBeCalled();
  });
});
