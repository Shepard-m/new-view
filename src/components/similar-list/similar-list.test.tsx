import { screen } from '@testing-library/react';
import { renderWithRouterAndRedux } from '../../utils/mocks-component';
import { mockProduct } from '../../utils/moсks';
import SimilarList from './similar-list';

describe('similar-list', () => {
  it('should return a component similar-list', () => {
    const similarListTestId = 'similar-list';
    renderWithRouterAndRedux(<SimilarList similar={[mockProduct]} />);

    expect(screen.getByTestId(similarListTestId)).toBeInTheDocument();
  });
});
