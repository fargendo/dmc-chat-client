import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	gridItem: {
		width: '100%',
		color: '#ffffff',
		fontSize: '20px',
		paddingLeft: '20px',
		[theme.breakpoints.up('md')]: {
			fontSize: '20px',
		},
		[theme.breakpoints.down('sm')]: {
			fontSize: '18px',
		},
		[theme.breakpoints.down('xs')]: {
			fontSize: '15px',
		},
	},
}));

const ChatMessage = (props) => {
	const { message } = props;

	const classes = useStyles();
	return <Typography className={classes.gridItem}>{message}</Typography>;
};

export default ChatMessage;
