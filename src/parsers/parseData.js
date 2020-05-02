const parseData = (data) => {
	if (!data.players) {
		if (data.name.startsWith('[From') || data.name.startsWith('[!]')) {
			return null;
		} else {
			return data;
		}
	}
};

export default parseData;
