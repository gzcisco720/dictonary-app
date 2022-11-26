import { render, screen } from '@testing-library/react';
import WordCard from '.';
import singleWord from '../../_mocks_/singleWord.mock';

describe('WordCard', () => {
  it('should render wordCard correctly', () => {
    render(<WordCard word={singleWord} favouriteBtn={<button />} />);
    expect(screen.getByText('test')).toBeInTheDocument();
    expect(screen.getByText('/test/')).toBeInTheDocument();
    expect(screen.getByText('noun')).toBeInTheDocument();
    expect(screen.getByText('A challenge, trial.')).toBeInTheDocument();
  });

  it('should render double phonetics', () => {
    const mockWord = { ...singleWord };
    mockWord.phonetics.push({
      text: '/expectOther/',
      audio: 'test',
      sourceUrl: 'test',
      license: {
        name: 'test',
        url: 'test',
      },
    });
    render(<WordCard word={mockWord} favouriteBtn={<button />} />);
    expect(screen.getByText('/test/')).toBeInTheDocument();
    expect(screen.getByText('/expectOther/')).toBeInTheDocument();
  });

  it('should not render any phonetic', () => {
    const mockWord = { ...singleWord };
    mockWord.phonetics = [];
    render(<WordCard word={mockWord} favouriteBtn={<button />} />);
    expect(screen.queryByTestId('WordCard_phonetics')).not.toBeInTheDocument();
  });
});
