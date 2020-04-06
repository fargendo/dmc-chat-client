import { INITIAL_STATE } from './store';

export const reducer = (state = INITIAL_STATE, action) => {
	let newState = state;
	switch (action.type) {
		case 'ADD_MESSAGE':
			//limit maximum number of messages in state (15)
			if (state.messages.length >= 15) state.messages.shift();

			newState = {
				...state,
				messages: [...newState.messages, action.payload],
			};
			break;

		case 'UPDATE_PLAYERS':
			newState = {
				...state,
				players: action.payload,
			};
			break;

		case 'UPDATE_TPS':
			newState = {
				...state,
				tps: action.payload,
			};
			break;

		case 'UPDATE_WORLD_SIZE':
			newState = {
				...state,
				worldSize: action.payload,
			};
			break;
		case 'TOGGLE_OPEN':
			newState = {
				...state,
				open: action.payload,
			};
			break;
		case 'UPDATE_PLAYER_ICON':
			newState = {
				...state,
				icons: action.payload,
			};
			break;

		default:
			break;
	}

	return newState;
};
