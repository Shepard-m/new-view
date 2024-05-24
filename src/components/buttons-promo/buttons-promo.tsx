import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../types/indexStore';
import { promosActions } from '../../store/slice/promo/promo';
import { TPromo } from '../../types/promo';
import ButtonPromo from '../button-promo/button-promo';


import './buttons-promo-style.css';
type TButtonsPromo = {
  promos: TPromo[];
  promo: TPromo;
}

export default function ButtonsPromo({ promos, promo }: TButtonsPromo) {
  const dispatch = useAppDispatch();
  const [step, setStep] = useState(0);

  const selectPromo = () => {
    if (step === promos?.length - 1) {
      dispatch(promosActions.selectPromo({ id: `${promos[0].id}` }));
      setStep(0);
      return;
    }

    setStep(step + 1);
    dispatch(promosActions.selectPromo({ id: `${promos[step + 1].id}` }));
  };
  useEffect(() => {
    const intervalId = setInterval(selectPromo, 3000);

    return () => {
      clearInterval(intervalId);
    };
  }, [step]);

  function handleSelectPromoClick(id: string, index: string) {
    dispatch(promosActions.selectPromo({ id }));
    setStep(+index);
  }

  return (
    <ul className="banner__buttons-promo" data-testid={'buttons-promo'}>
      {promos.map((item, index) => <ButtonPromo key={item.id} idPromo={item.id} selectedPromoId={promo.id} handleSelectPromoClick={handleSelectPromoClick} indexButton={index} />)}
    </ul>
  );
}
