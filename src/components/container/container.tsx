import Footer from '../footer/footer';
import Header from '../header/header';

type TContainer = {
  children: JSX.Element;
  scroll?: boolean;
}

export default function Container({ children, scroll }: TContainer) {
  function onScrollTopClick() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  return (
    <div className='wrapper' data-testid={'container'}>
      <Header />
      <main>
        {children}
      </main>
      {scroll
        &&
        <a className="up-btn" onClick={onScrollTopClick} data-testid={'container-scroll'}>
          <svg width={12} height={18} aria-hidden="true">
            <use xlinkHref="#icon-arrow2" />
          </svg>
        </a>}
      <Footer />
    </div>
  );
}
