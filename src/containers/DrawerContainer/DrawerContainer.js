import React, { useEffect } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

import InfoDrawer from '../../components/InfoDrawer';
import { toggleOpenAction, updatePlayerIcon } from './actions';
import {
	updatePlayersAction,
	updateTPSAction,
	updateWorldSizeAction,
} from '../ChatContainer/actions';
import Menu from '../../components/Menu';

const useStyles = makeStyles(() => ({
	root: {
		display: 'flex',
	},
}));

export const DrawerContainer = (props) => {
	const { players } = props;
	const classes = useStyles();

	useEffect(() => {
		let playerIconArray = [];
		if (!players.length) {
			console.log('fetching info');
			fetch('https://destroymc.net/status')
				.then((response) => response.json())
				.then((data) => {
					props.updatePlayers(data.players);
					props.updateTps(data.tps);
					props.updateWorldSize(data.worldSize);
				})
				.catch((err) => console.log(err));
		}

		players.forEach((player) => {
			playerIconArray.push(`https://minotar.net/avatar/${player}/25.png`);
		});

		props.updatePlayerIcon(playerIconArray);
	}, [players]);

	return (
		<div className={classes.root}>
			<Menu />
			<InfoDrawer />
		</div>
	);
};

const mapStateToProps = ({
	players,
	tps,
	worldSize,
	open,
	icons,
	drawerColor,
}) => ({
	players,
	tps,
	worldSize,
	open,
	icons,
	drawerColor,
});

const mapDispatchtoProps = (dispatch) => ({
	toggleOpen: (bool) => dispatch(toggleOpenAction(bool)),
	updatePlayers: (players) => dispatch(updatePlayersAction(players)),
	updateTps: (tps) => dispatch(updateTPSAction(tps)),
	updateWorldSize: (worldSize) => dispatch(updateWorldSizeAction(worldSize)),
	updatePlayerIcon: (icons) => dispatch(updatePlayerIcon(icons)),
});

export const ConnectedDrawerContainer = connect(
	mapStateToProps,
	mapDispatchtoProps
)(DrawerContainer);
