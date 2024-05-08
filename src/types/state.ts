import { store } from '../store';
import { rootReducer } from '../store/root-reduser';

export type TState = ReturnType<typeof rootReducer>;
export type TAppDispatch = typeof store.dispatch;
