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
