import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { List, ListItem, Typography } from '@material-ui/core';
const useStyles = makeStyles(theme => ({
	root: {
		width: '100%',
		maxWidth: '36ch',
		backgroundColor: theme.palette.background.paper,
	},
	inline: {
		display: 'inline',
	},
}));
const PlayerList = props => {
	const { users } = props;
	const classes = useStyles();
	const ListOfPlayers = users.map(user => (
		<ListItem>
			<p>{user}</p>
		</ListItem>
	));

	return (
		<List>
			{!users.length && (
				<Typography className={classes.fetching}>
					Fetching player list...{' '}
				</Typography>
			)}
			{ListOfPlayers}
		</List>
	);
};

export default PlayerList;
