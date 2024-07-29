import { screen } from '@testing-library/react';
import { renderWithRouterAndRedux } from '../../utils/mocks-component';
import ButtonAddBasket from './button-add-basket';
import { mockProduct } from '../../utils/moсks';
import { TypeButton } from '../../const';

describe('button-add-basket', () => {
  it('should return component button-add-basket with the typeButton = CAMERA_PAGE', () => {
    const buttonAddBasketTestId = 'button-add-basket';
    renderWithRouterAndRedux(<ButtonAddBasket camera={mockProduct} typeButtons={TypeButton.CAMERA_PAGE}/>);

    expect(screen.getByTestId(buttonAddBasketTestId)).toBeInTheDocument();
  });
  it('should return component button-add-basket with the typeButton = CARD', () => {
    const buttonAddBasketTestId = 'button-card';
    renderWithRouterAndRedux(<ButtonAddBasket camera={mockProduct} typeButtons={TypeButton.CARD}/>);

    expect(screen.getByTestId(buttonAddBasketTestId)).toBeInTheDocument();
  });
});
