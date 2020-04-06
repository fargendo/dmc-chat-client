import React, { useEffect } from 'react';
import clsx from 'clsx';
import { connect } from 'react-redux';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
	Drawer,
	CssBaseline,
	AppBar,
	Toolbar,
	List,
	Divider,
	IconButton,
	ListItem,
	ListItemIcon,
	ListItemText,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import { toggleOpenAction, updatePlayerIcon } from './actions';
import {
	updatePlayersAction,
	updateTPSAction,
	updateWorldSizeAction,
} from '../ChatContainer/actions';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
	},
	appBar: {
		transition: theme.transitions.create(['margin', 'width'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		background: 'transparent',
		boxShadow: 'none',
	},
	appBarShift: {
		width: `calc(100% - ${drawerWidth}px)`,
		marginLeft: drawerWidth,
		background: 'transparent',
		boxShadow: 'none',
		transition: theme.transitions.create(['margin', 'width'], {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
	},
	drawerPaper: {
		width: drawerWidth,
		backgroundColor: 'rgba(0,0,0,0.7)',
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	hide: {
		display: 'none',
	},
	// necessary for content to be below app bar
	toolbar: theme.mixins.toolbar,
	content: {
		flexGrow: 1,
		backgroundColor: theme.palette.background.default,
		padding: theme.spacing(3),
	},
	titles: {
		fontSize: '18px',
		color: '#ffffff',

		opacity: '1',
	},
	icon: {
		opacity: '1',
	},
	iconButton: {
		color: '#ffffff',
	},
	divider: {
		backgroundColor: '#ffffff',
	},
}));

export const InfoDrawer = (props) => {
	const { players, tps, worldSize, icons } = props;
	const theme = useTheme();
	const classes = useStyles();

	const handleDrawerOpen = () => {
		props.toggleOpen(true);
	};
	const handleDrawerClose = () => {
		props.toggleOpen(false);
	};

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

	const playerList = players.map((player, i) => (
		<ListItem key={i}>
			<ListItemIcon>
				<img className={classes.icon} src={icons[i]} alt='player head link' />
			</ListItemIcon>
			<ListItemText className={classes.titles} primary={player} />
			<Divider className={classes.divider} />
		</ListItem>
	));

	return (
		<div className={classes.root}>
			<CssBaseline />
			<AppBar
				position='fixed'
				className={clsx(classes.appBar, {
					[classes.appBarShift]: props.open,
				})}
			>
				<Toolbar>
					<IconButton
						color='inherit'
						aria-label='open drawer'
						onClick={handleDrawerOpen}
						edge='start'
						className={clsx(classes.menuButton, props.open && classes.hide)}
					>
						<MenuIcon />
					</IconButton>
				</Toolbar>
			</AppBar>

			<Drawer
				variant='persistent'
				anchor='left'
				open={props.open}
				classes={{
					paper: classes.drawerPaper,
				}}
			>
				<div className={classes.drawerHeader}>
					<IconButton
						className={classes.iconButton}
						onClick={handleDrawerClose}
					>
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
								worldSize
									? 'World Size: ' + worldSize
									: 'World Size: Loading...'
							}
						/>
					</ListItem>
				</List>
				<Divider className={classes.divider} />
				<List>
					<ListItem>
						<ListItemText
							className={classes.titles}
							disableTypography
							primary={
								players.length
									? 'Players Online: ' + players.length
									: 'Loading Players...'
							}
						/>
					</ListItem>
					{playerList}
				</List>
			</Drawer>
		</div>
	);
};

const mapStateToProps = ({ players, tps, worldSize, open, icons }) => ({
	players,
	tps,
	worldSize,
	open,
	icons,
});

const mapDispatchtoProps = (dispatch) => ({
	toggleOpen: (bool) => dispatch(toggleOpenAction(bool)),
	updatePlayers: (players) => dispatch(updatePlayersAction(players)),
	updateTps: (tps) => dispatch(updateTPSAction(tps)),
	updateWorldSize: (worldSize) => dispatch(updateWorldSizeAction(worldSize)),
	updatePlayerIcon: (icons) => dispatch(updatePlayerIcon(icons)),
});

export const ConnectedInfoDrawer = connect(
	mapStateToProps,
	mapDispatchtoProps
)(InfoDrawer);
