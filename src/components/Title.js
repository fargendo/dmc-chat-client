import React from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	title: {
		paddingTop: '10%',
		textAlign: 'center',

		fontWeight: '600',
	},
}));

const Title = () => {
	const classes = useStyles();
	return (
		<Typography className={classes.title} variant='h2'>
			DESTROYMC CHAT
		</Typography>
	);
};

export default Title;
