import { mockPromos } from '../../utils/moсks';
import { render, screen } from '@testing-library/react';
import ButtonPromo from './button-promo';

describe('Button-promo', () => {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  function mockHandler() {
  }
  it('should return component ButtonPromo', () => {
    const buttonPromoTestId = 'button-promo';
    const componentButtonPromo = <ButtonPromo idPromo={mockPromos[0].id} selectedPromoId={mockPromos[1].id} handleSelectPromoClick={mockHandler} indexButton={1} />;

    render(componentButtonPromo);

    expect(screen.getByTestId(buttonPromoTestId)).toBeInTheDocument();
  });
});
