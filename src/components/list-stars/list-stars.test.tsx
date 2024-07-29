import { screen } from '@testing-library/react';
import { renderWithRouterAndRedux } from '../../utils/mocks-component';
import ListStars from './list-stars';
import { mockProduct } from '../../utils/moсks';
import { OptionsStars } from '../../const';

describe('list-stars', () => {
  it('should return a component list-stars with the correct class', () => {
    const listStarsTestId = 'list-stars';
    const classListStars = `rate ${OptionsStars.PRODUCT.class}-card__rate`;
    renderWithRouterAndRedux(<ListStars countStar={mockProduct.rating} countComments={mockProduct.reviewCount} optionsStars={OptionsStars.PRODUCT} />);

    expect(screen.getByTestId(listStarsTestId)).toBeInTheDocument();
    expect(screen.getByTestId(listStarsTestId)).toHaveClass(classListStars);
  });
});
