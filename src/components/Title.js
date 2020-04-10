import React from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Fade from '@material-ui/core/Fade';
const useStyles = makeStyles((theme) => ({
	root: {
		paddingBottom: '30px',
	},
	title: {
		// color: '#ffffff',
		color: '#000000',
		textAlign: 'center',

		fontWeight: '800',
		[theme.breakpoints.up('lg')]: {
			fontSize: '70px',
		},
		[theme.breakpoints.down('md')]: {
			fontSize: '50px',
		},
		[theme.breakpoints.down('sm')]: {
			fontSize: '42px',
		},
		[theme.breakpoints.down('xs')]: {
			fontSize: '35px',
		},
	},
	description: {
		// color: '#ffffff',
		color: '#000000',
		textAlign: 'center',
		[theme.breakpoints.up('lg')]: {
			fontSize: '35px',
		},
		[theme.breakpoints.down('md')]: {
			fontSize: '25px',
		},
		[theme.breakpoints.down('sm')]: {
			fontSize: '20px',
		},
		[theme.breakpoints.down('xs')]: {
			fontSize: '16px',
		},
	},
}));

const Title = () => {
	const classes = useStyles();
	return (
		<div className={classes.root}>
			<Fade in={true}>
				<Typography className={classes.title} variant='h2'>
					DMC Chat
				</Typography>
			</Fade>
			<Fade in={true}>
				<Typography className={classes.description} variant='h6'>
					A live chat site for destroymc.net
				</Typography>
			</Fade>
		</div>
	);
};

export default Title;
