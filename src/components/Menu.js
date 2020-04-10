import React from 'react';
import clsx from 'clsx';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import { CssBaseline, AppBar, Toolbar, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { toggleOpenAction } from '../containers/DrawerContainer/actions';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
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

	menuButton: {
		marginRight: theme.spacing(2),
	},
	hide: {
		display: 'none',
	},
}));

const Menu = (props) => {
	const classes = useStyles();
	const handleDrawerOpen = () => {
		props.toggleOpen(true);
	};
	return (
		<div>
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
		</div>
	);
};

const mapStateToProps = ({ open }) => ({
	open,
});

const mapDispatchToProps = (dispatch) => ({
	toggleOpen: (bool) => dispatch(toggleOpenAction(bool)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
