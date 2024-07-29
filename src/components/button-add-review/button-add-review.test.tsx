import { screen } from '@testing-library/react';
import { renderWithRouterAndRedux } from '../../utils/mocks-component';
import { ButtonAddReview } from './button-add-review';
import { mockProduct } from '../../utils/moсks';

describe('button-add-review', () => {
  it('should return component button-add-review', () => {
    const buttonAddReviewTestId = 'button-add-review';
    renderWithRouterAndRedux(<ButtonAddReview cameraId={mockProduct.id}/>);

    expect(screen.getByTestId(buttonAddReviewTestId)).toBeInTheDocument();
  });
});
