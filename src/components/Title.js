import React from 'react';
import { Typography, createMuiTheme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	title: {
		// paddingTop: '10%',
		textAlign: 'center',

		fontWeight: '800',
		fontSize: '70px',
	},
}));
const theme = createMuiTheme();
theme.typography.h2 = {
	fontSize: '75px',
	'@media (min-width:600px)': {
		fontSize: '1.5rem',
	},
	[theme.breakpoints.up('md')]: {
		fontSize: '50px',
	},
};
const Title = () => {
	const classes = useStyles();
	return (
		<Typography className={classes.title} variant='h2'>
			DESTROYMC
		</Typography>
	);
};

export default Title;
