import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
	text: {
		textAlign: 'left',
	},
}));

const TPSTracker = props => {
	const classes = useStyles();
	const { TPS, uptime } = props;
	return (
		<div className={classes.text}>
			<Typography>TPS: {TPS ? TPS : 'Loading...'}</Typography>
			<Typography>Uptime: {uptime ? uptime : 'Loading...'}</Typography>
		</div>
	);
};

export default TPSTracker;
