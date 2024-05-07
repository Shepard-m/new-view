import Footer from './footer';
import Header from './header';

type TContainer = {
  children: JSX.Element;
}

export default function Container({ children }: TContainer) {
  return (
    <>
      <Header />
      <main>
        {children}
      </main>
      <Footer />
    </>
  );
}
