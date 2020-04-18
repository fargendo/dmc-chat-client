import { createStore } from 'redux';
import { reducer } from './index';

export const INITIAL_STATE = {
	messages: [],
	players: [],
	icons: [],
	tps: '',
	worldSize: '',
	open: true,
};

export const buildStore = () => {
	const store = createStore(
		reducer,
		INITIAL_STATE,
		// Remove in production
		window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
	);
	return store;
};
