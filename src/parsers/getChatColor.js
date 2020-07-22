export const getNameColor = data => {
	if (!data.name.startsWith('<')) {
		if (
			data.message === 'has joined the server.' ||
			data.message === 'has left the server.' ||
			data.message.includes('has joined the server for the first time!')
		) {
			return '#ffaa00' // join/leave message, gold
		} else {
			return '#5555ff' // death msg and server alert, blue
		}
	} else {
		return '#ffffff' // basic chat, white
	}
}

export const getMessageColor = data => {
	if (!data.name.startsWith('<')) {
		if (
			data.message === 'has joined the server.' ||
			data.message === 'has left the server.' ||
			data.message.includes('has joined the server for the first time!')
		) {
			return '#ffff55' // join/leave message, yellow
		} else {
			return '#aa0000' // death msg and server alert, red
		}
	} else if (data.message.startsWith('>')) {
		return '#55ff55' // >greentext, green
	} else {
		return '#ffffff' // basic chat, white
	}
}

// export const getChatColorPast = (message) => {
// 	if (!message.startsWith('<')) {
// 		if (
// 			message.includes('has joined the server.') ||
// 			message.includes('has left the server.') ||
// 			message.includes('has joined the server for the first time!')
// 		) {
// 			return '#ffff55';
// 		} else {
// 			return '#aa0000';
// 		}
// 	} else {
// 		return '#ffffff';
// 	}
// };
