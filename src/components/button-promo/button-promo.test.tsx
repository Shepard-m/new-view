import { mockPromos } from '../../utils/moсks';
import { render, screen } from '@testing-library/react';
import ButtonPromo from './button-promo';
import { useAppDispatch } from '../../types/indexStore';
import { promosActions } from '../../store/slice/promo/promo';

describe('Button-promo', () => {
  let step = 0;
  const dispatch = useAppDispatch();
  function mockHandler(id: string, index: string): void {
    step = +index;
    dispatch(promosActions.selectPromo({ id }));
  }
  it('should return component ButtonPromo', () => {
    const buttonPromoTestId = 'button-promo';
    const componentButtonPromo = <ButtonPromo idPromo={mockPromos[step].id} selectedPromoId={mockPromos[1].id} handleSelectPromoClick={mockHandler} indexButton={1} />;

    render(componentButtonPromo);

    expect(screen.getByTestId(buttonPromoTestId)).toBeInTheDocument();
  });
});
