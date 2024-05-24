import { mockPromos } from '../../utils/moks';
import { render, screen } from '@testing-library/react';
import ButtonPromo from './button-promo';

describe('Button-promo', () => {
  function mockHandler(id: string, index: string): void {
    id = index;
  }
  it('should return component ButtonPromo', () => {
    const buttonPromoTestId = 'button-promo';
    const componentButtonPromo = <ButtonPromo idPromo={mockPromos[0].id} selectedPromoId={mockPromos[1].id} handleSelectPromoClick={mockHandler} indexButton={1} />;

    render(componentButtonPromo);

    expect(screen.getByTestId(buttonPromoTestId)).toBeInTheDocument();
  });
});
