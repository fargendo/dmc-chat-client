import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles(() => ({
	gridItem: {
		width: '100%',
		color: '#ffffff',
		fontSize: '20px',
		paddingLeft: '20px',
	},
}));

const ChatMessage = ({ message }) => {
	const classes = useStyles();
	return <Typography className={classes.gridItem}>{message}</Typography>;
};

export default ChatMessage;
