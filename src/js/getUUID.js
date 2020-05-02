const getUUID = (player) => {
	let playerUUID = '';
	const URL = `https://playerdb.co/api/player/minecraft/${player}`;
	fetch(URL)
		.then((response) => response.json())
		.then((data) => {
			playerUUID = 'https://stats.destroymc.net/#player:' + data.data.player.id;
			console.log(data.data.player.id); //STRING
		})
		.catch((err) => console.log(err));
	console.log(playerUUID);
	return playerUUID;
};
export default getUUID;
