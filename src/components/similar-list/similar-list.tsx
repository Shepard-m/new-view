import { useEffect, useState } from 'react';
import { TProduct } from '../../types/product';
import ProductCard from '../product-card/product-card';
import { STEP_SLIDERS_SIMILAR } from '../../const';
import { sortingSimilarList } from '../../utils/utils';

type TSimilarList = {
  similar: TProduct[];
}

export default function SimilarList({ similar }: TSimilarList) {
  const [step, setStep] = useState({ start: 0, end: STEP_SLIDERS_SIMILAR });
  const sorSimilar = sortingSimilarList(similar);
  const listSimilar = sorSimilar.slice(step.start, step.end);

  useEffect(() => {
    setStep({ start: 0, end: STEP_SLIDERS_SIMILAR });
  }, [similar]);

  function onNextListSimilarClick() {
    setStep({ start: step.start + STEP_SLIDERS_SIMILAR, end: step.end + STEP_SLIDERS_SIMILAR });
  }
  function onBackListSimilarClick() {
    setStep({ start: step.start - STEP_SLIDERS_SIMILAR, end: step.end - STEP_SLIDERS_SIMILAR });
  }

  return (
    <section className="product-similar" data-testId={'similar-list'}>
      <div className="container">
        <h2 className="title title--h3">Похожие товары</h2>
        <div className="product-similar__slider">
          <div className="product-similar__slider-list">
            {listSimilar.map((item) => <ProductCard key={item.id} camera={item} isSimilar />)}
          </div>
          <button className="slider-controls slider-controls--prev" type="button" aria-label="Предыдущий слайд" disabled={step.start <= 0} onClick={onBackListSimilarClick}>
            <svg width={7} height={12} aria-hidden="true" onClick={onBackListSimilarClick}>
              <use xlinkHref="#icon-arrow" />
            </svg>
          </button>
          <button className="slider-controls slider-controls--next" type="button" aria-label="Следующий слайд" disabled={step.end >= similar.length} onClick={onNextListSimilarClick}>
            <svg width={7} height={12} aria-hidden="true" onClick={onNextListSimilarClick}>
              <use xlinkHref="#icon-arrow" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
