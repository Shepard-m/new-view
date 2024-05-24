import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { RenderOptions, render } from '@testing-library/react';
import { AppStore, RootState, setupStore } from '../store';
import { PropsWithChildren, ReactElement } from 'react';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: Partial<RootState>;
  store?: AppStore;
}

export function renderWithRouterAndRedux(component: ReactElement, { route = '/', preloadedState = {}, store: Store = setupStore(preloadedState) }: ExtendedRenderOptions & { route?: string } = {}) {
  window.history.pushState({}, document.title, route);
  function Wrapper({ children }: PropsWithChildren) {
    return (
      <HelmetProvider>
        <BrowserRouter>
          <Provider store={Store}>
            {children}
          </Provider>
        </BrowserRouter>
      </HelmetProvider>
    );
  }

  return { store: Store, ...render(component, { wrapper: Wrapper }) };
}
