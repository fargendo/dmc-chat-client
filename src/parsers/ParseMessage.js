import React from 'react';

const ParseMessage = props => {
	const { message, addToState } = props;
	const pm = /^([[]From)/;
	if (message.test(pm)) {
		message = null;
	} else {
		return props.addToState(message);
	}
};

export default ParseMessage;
