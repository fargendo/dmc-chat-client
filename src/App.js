import React from 'react';
import Chat from './components/Chat';
import background from './assets/img/background.png';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	root: {
		backgroundImage: `url(${background})`,
		height: '100%',
		width: '100%',
		position: 'fixed',
	},
}));

const App = () => {
	const classes = useStyles();
	return (
		<div className={classes.root}>
			<Chat />
		</div>
	);
};

export default App;
