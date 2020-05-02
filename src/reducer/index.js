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
		case 'ADD_NAME':
			if (state.names.length >= 15) state.names.shift();

			newState = {
				...state,
				names: [...newState.names, action.payload],
			};
			break;
		case 'GET_MESSAGES':
			//limit maximum number of messages in state (15)
			if (state.messages.length >= 15) state.messages.shift();
			// state.messages.reverse();

			newState = {
				...state,
				messages: [action.payload, ...newState.messages],
			};
			break;
		case 'GET_NAMES':
			//limit maximum number of messages in state (15)
			if (state.names.length >= 15) state.names.shift();
			// state.messages.reverse();

			newState = {
				...state,
				names: [action.payload, ...newState.names],
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
		case 'SET_UUID':
			newState = {
				...state,
				playerUUID: action.payload,
			};
			break;
		case 'SET_MESSAGE_COLORS':
			if (state.messageColor.length >= 15) state.messageColor.shift();

			newState = {
				...state,
				messageColor: [...newState.messageColor, action.payload],
			};
			break;
		case 'SET_NAME_COLOR':
			if (state.nameColor.length >= 15) state.nameColor.shift();

			newState = {
				...state,
				nameColor: [...newState.nameColor, action.payload],
			};
			break;
		case 'GET_NAME_COLOR':
			//limit maximum number of messages in state (15)
			if (state.nameColor.length >= 15) state.nameColor.shift();
			// state.messages.reverse();

			newState = {
				...state,
				nameColor: [action.payload, ...newState.nameColor],
			};
			break;
		case 'GET_MESSAGE_COLOR':
			//limit maximum number of messages in state (15)
			if (state.messageColor.length >= 15) state.messageColor.shift();
			// state.messages.reverse();

			newState = {
				...state,
				messageColor: [action.payload, ...newState.messageColor],
			};
			break;
		default:
			break;
	}

	return newState;
};
