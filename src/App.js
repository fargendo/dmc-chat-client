import React from 'react';
import { connect } from 'react-redux';
import { isMobile } from 'react-device-detect';

import { makeStyles } from '@material-ui/core/styles';

import background from './assets/img/background5.png';
import { ConnectedChat } from './containers/ChatContainer/ChatContainer';
import { toggleOpenAction } from './containers/DrawerContainer/actions';

const useStyles = makeStyles(() => ({
	root: {
		backgroundImage: `url(${background})`,
		height: '100%',
		width: '100%',
		position: 'fixed',
	},
}));

const App = (props) => {
	const classes = useStyles();
	if (isMobile) {
		props.toggleOpen(false);
	}
	return (
		<div className={classes.root}>
			<ConnectedChat />
		</div>
	);
};
const mapDispatchtoProps = (dispatch) => ({
	toggleOpen: (bool) => dispatch(toggleOpenAction(bool)),
});
export default connect(null, mapDispatchtoProps)(App);
