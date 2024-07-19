import { mockPromos } from '../../utils/moks';
import { render, screen } from '@testing-library/react';
import ButtonPromo from './button-promo';
import { useState } from 'react';
import { useAppDispatch } from '../../types/indexStore';
import { promosActions } from '../../store/slice/promo/promo';

describe('Button-promo', () => {
  const [step, setStep] = useState(0);
  const dispatch = useAppDispatch();
  function mockHandler(id: string, index: string): void {
    setStep(+index);
    dispatch(promosActions.selectPromo({ id }));
    setStep(step + 1);
  }
  it('should return component ButtonPromo', () => {
    const buttonPromoTestId = 'button-promo';
    const componentButtonPromo = <ButtonPromo idPromo={mockPromos[0].id} selectedPromoId={mockPromos[1].id} handleSelectPromoClick={mockHandler} indexButton={1} />;

    render(componentButtonPromo);

    expect(screen.getByTestId(buttonPromoTestId)).toBeInTheDocument();
  });
});
