export const toggleOpenAction = (bool) => ({
	type: 'TOGGLE_OPEN',
	payload: bool,
});

export const updatePlayerIcon = (playerIcons) => ({
	type: 'UPDATE_PLAYER_ICON',
	payload: playerIcons,
});

export const setUUID = (UUIDs) => ({
	type: 'SET_UUID',
	payload: UUIDs,
});
