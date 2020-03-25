import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Typography, Divider } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
	gridItem: {
		width: '100%',
		color: '#ffffff',
	},
	divider: {
		backgroundColor: '#808080',
	},
}));

const ChatMessage = ({ name, message }) => {
	const classes = useStyles();
	return (
		<div>
			<Typography className={classes.gridItem}>
				{name} {message}
			</Typography>
			<Divider className={classes.divider} />
		</div>
	);
};

export default ChatMessage;
