import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
	ListItem,
	ListItemIcon,
	ListItemText,
	Divider,
} from '@material-ui/core';
import {
	toggleOpenAction,
	updatePlayerIcon,
} from '../containers/DrawerContainer/actions';

const useStyles = makeStyles((theme) => ({
	titles: {
		color: '#ffffff',
	},

	divider: {
		backgroundColor: '#ffffff',
	},
}));
const Player = ({ players, icons, playerUUID, key, player }) => {
	const classes = useStyles();

	return (
		<ListItem button onClick={console.log('clicked')}>
			<ListItemIcon>
				<img src={icons[key]} alt='player head link' />
			</ListItemIcon>
			<ListItemText className={classes.titles} primary={player} />
			<Divider className={classes.divider} />
		</ListItem>
	);
};

const mapStateToProps = ({
	players,
	tps,
	worldSize,
	open,
	icons,
	drawerColor,
	playerUUID,
}) => ({
	players,
	tps,
	worldSize,
	open,
	icons,
	drawerColor,
	playerUUID,
});

const mapDispatchtoProps = (dispatch) => ({
	toggleOpen: (bool) => dispatch(toggleOpenAction(bool)),
	updatePlayerIcon: (icons) => dispatch(updatePlayerIcon(icons)),
});

export default connect(mapStateToProps, mapDispatchtoProps)(Player);
