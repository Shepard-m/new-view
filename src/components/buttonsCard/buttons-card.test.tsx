import { screen } from '@testing-library/react';
import { renderWithRouterAndRedux } from '../../utils/mocks-component';
import { ButtonCard } from './buttons-card';
import { mockProduct } from '../../utils/moсks';
import { TypeButton } from '../../const';

describe('button-add-basket', () => {
  let listCardInBasket = `${mockProduct.id}`;
  function mockHandler() {
    listCardInBasket = `${mockProduct.id}`;
  }

  it('should return component ButtonCard', () => {
    const buttonAddBasketTestId = 'button-card';
    renderWithRouterAndRedux(<ButtonCard camera={mockProduct} typeButton={TypeButton.CAMERA_PAGE} listCardInBasket={listCardInBasket} onOpenModalBuyClick={mockHandler}/>);

    expect(screen.getByTestId(buttonAddBasketTestId)).toBeInTheDocument();
  });
});
