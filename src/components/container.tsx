import Footer from './footer';
import Header from './header';

type TContainer = {
  children: JSX.Element;
  scroll?: boolean;
}

export default function Container({ children, scroll }: TContainer) {
  function onScrollTopClick() {
    window.scrollTo(0, 0);
  }
  return (
    <div className='wrapper'>
      <Header />
      <main>
        {children}
      </main>
      {scroll
        &&
        <a className="up-btn" href="#header" onClick={onScrollTopClick}>
          <svg width={12} height={18} aria-hidden="true">
            <use xlinkHref="#icon-arrow2" />
          </svg>
        </a>}
      <Footer />
    </div>
  );
}
