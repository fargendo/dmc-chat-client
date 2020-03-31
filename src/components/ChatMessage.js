import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Typography, Divider } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
	gridItem: {
		width: '100%',
		color: '#ffffff',
		fontSize: '20px',
		paddingLeft: '20px',
	},
	divider: {
		backgroundColor: '#808080',
	},
}));

const ChatMessage = ({ name, message }) => {
	const classes = useStyles();
	return (
		<Typography className={classes.gridItem}>
			{name} {message}
		</Typography>
	);
};

export default ChatMessage;
