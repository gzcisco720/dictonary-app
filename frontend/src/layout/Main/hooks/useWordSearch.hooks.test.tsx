import { act, renderHook, waitFor } from '@testing-library/react';
import axios from 'axios';
import { ChangeEvent } from 'react';
import { DICTIONARY_EN_BASE_URL } from '../../../config/constants';
import { getHooksWrapper } from '../../../_mocks_/store.mock';
import useWordSearch from './useWordSearch.hooks';

jest.mock('axios');
const mockAxios = axios as jest.Mocked<typeof axios>;
describe('useWordSearch.hooks', () => {
  it('should load new word when search input changes', async () => {
    const { result } = renderHook(() => useWordSearch(), {
      wrapper: getHooksWrapper(),
    });
    const mockEvent = { target: { value: 'test' } };
    act(() =>
      result.current[1](mockEvent as ChangeEvent<HTMLInputElement>),
    );
    await waitFor(() => {
      expect(result.current[0]).toBe('test');
      expect(mockAxios.get).toBeCalledWith(`${DICTIONARY_EN_BASE_URL}/test`);
    }, { timeout: 1500 });
  });
});
