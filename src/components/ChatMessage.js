import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	root: {
		paddingLeft: '20px',
	},
	name: (props) => ({
		width: '100%',
		color: props.nameColor,
		fontSize: '20px',
		[theme.breakpoints.up('md')]: {
			fontSize: '20px',
		},
		[theme.breakpoints.down('sm')]: {
			fontSize: '18px',
		},
		[theme.breakpoints.down('xs')]: {
			fontSize: '15px',
		},
	}),

	gridItem: (props) => ({
		width: '100%',
		color: props.messageColor,
		fontSize: '20px',
		paddingLeft: '5px',
		[theme.breakpoints.up('md')]: {
			fontSize: '20px',
		},
		[theme.breakpoints.down('sm')]: {
			fontSize: '18px',
		},
		[theme.breakpoints.down('xs')]: {
			fontSize: '15px',
		},
	}),
}));

const ChatMessage = (props) => {
	const { message, name } = props;
	const classes = useStyles(props);

	return (
		<div className={classes.root}>
			<Typography component='span' className={classes.name}>
				{name}
			</Typography>
			<Typography component='span' className={classes.gridItem}>
				{message}
			</Typography>
		</div>
	);
};

export default ChatMessage;
