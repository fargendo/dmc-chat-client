export const addMessageAction = (message) => ({
	type: 'ADD_MESSAGE',
	payload: message,
});
export const getMessagesAction = (message) => ({
	type: 'GET_MESSAGES',
	payload: message,
});
export const updatePlayersAction = (playerList) => ({
	type: 'UPDATE_PLAYERS',
	payload: playerList,
});
export const updateTPSAction = (tps) => ({
	type: 'UPDATE_TPS',
	payload: tps,
});
export const updateWorldSizeAction = (worldSize) => ({
	type: 'UPDATE_WORLD_SIZE',
	payload: worldSize,
});
export const addNameAction = (name) => ({
	type: 'ADD_NAME',
	payload: name,
});
export const getNameAction = (name) => ({
	type: 'GET_NAMES',
	payload: name,
});
export const setMessageColorAction = (color) => ({
	type: 'SET_MESSAGE_COLORS',
	payload: color,
});
export const setNameColorAction = (color) => ({
	type: 'SET_NAME_COLOR',
	payload: color,
});
export const getMessageColorAction = (color) => ({
	type: 'GET_MESSAGE_COLOR',
	payload: color,
});
export const getNameColorAction = (color) => ({
	type: 'GET_NAME_COLOR',
	payload: color,
});
