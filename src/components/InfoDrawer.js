import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
	Drawer,
	IconButton,
	List,
	ListItem,
	ListItemText,
	Divider,
	ListItemIcon,
	Link,
} from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import {
	toggleOpenAction,
	updatePlayerIcon,
} from '../containers/DrawerContainer/actions';
import {
	updatePlayersAction,
	updateTPSAction,
	updateWorldSizeAction,
} from '../containers/ChatContainer/actions';
import Player from './Player';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
	},
	default: {
		width: drawerWidth,
		[theme.breakpoints.up('lg')]: {
			backgroundColor: 'rgba(0,0,0,0.7)',
		},
		[theme.breakpoints.down('md')]: {
			backgroundColor: 'rgba(0,0,0,0.9)',
		},
	},
	mobile: {
		width: drawerWidth,
	},

	// necessary for content to be below app bar
	toolbar: theme.mixins.toolbar,
	content: {
		flexGrow: 1,
		backgroundColor: theme.palette.background.default,
		padding: theme.spacing(3),
	},
	titles: {
		color: '#ffffff',
	},
	iconButton: {
		color: '#ffffff',
	},
	divider: {
		backgroundColor: '#ffffff',
	},
	info: {
		color: '#ffffff',
		fontSize: '20px',
	},
}));

const InfoDrawer = (props) => {
	const { players, tps, worldSize, icons } = props;

	// console.log(icons);
	// console.log(playerUUID.length);
	// console.log(typeof playerUUID);
	const theme = useTheme();
	const classes = useStyles();

	const handleDrawerClose = () => {
		props.toggleOpen(false);
	};

	const playerList = players.map((player, i) => (
		// <Player player={player} key={i} />
		<ListItem button key={i}>
			<ListItemIcon>
				<img src={icons[i]} alt='player head link' />
			</ListItemIcon>
			<ListItemText className={classes.titles} primary={player} />
			<Divider className={classes.divider} />
		</ListItem>
	));

	return (
		<Drawer
			variant='persistent'
			anchor='left'
			open={props.open}
			classes={{ paper: classes.default }}
			ModalProps={{ onBackdropClick: handleDrawerClose }}
		>
			<div className={classes.drawerHeader}>
				<IconButton className={classes.iconButton} onClick={handleDrawerClose}>
					{theme.direction === 'ltr' ? (
						<ChevronLeftIcon />
					) : (
						<ChevronRightIcon />
					)}
				</IconButton>
			</div>
			<Divider className={classes.divider} />

			<List>
				<ListItem>
					<ListItemText
						className={classes.info}
						disableTypography
						primary={'Server Info'}
					/>
				</ListItem>
				<ListItem>
					<ListItemText
						className={classes.titles}
						disableTypography
						primary={tps ? 'TPS: ' + tps : 'TPS: Loading...'}
					/>
				</ListItem>
				<ListItem>
					<ListItemText
						className={classes.titles}
						disableTypography
						primary={
							worldSize ? 'World Size: ' + worldSize : 'World Size: Loading...'
						}
					/>
				</ListItem>
			</List>
			<Divider className={classes.divider} />
			<List>
				<ListItem>
					<ListItemText
						className={classes.info}
						disableTypography
						primary={
							players.length
								? 'Players Online: ' + players.length
								: 'Server is dead.'
						}
					/>
				</ListItem>
				{playerList}
			</List>
		</Drawer>
	);
};

InfoDrawer.propTypes = {
	playerUUID: PropTypes.array.isRequired,
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
	updatePlayers: (players) => dispatch(updatePlayersAction(players)),
	updateTps: (tps) => dispatch(updateTPSAction(tps)),
	updateWorldSize: (worldSize) => dispatch(updateWorldSizeAction(worldSize)),
	updatePlayerIcon: (icons) => dispatch(updatePlayerIcon(icons)),
});

export default connect(mapStateToProps, mapDispatchtoProps)(InfoDrawer);
