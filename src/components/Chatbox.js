import React from 'react';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography } from '@material-ui/core';

import Title from './Title';
import ChatMessage from './ChatMessage';

const useStyles = makeStyles(() => ({
	root: { marginTop: '15vh' },
	title: {
		marginTop: '10vh',
		textAlign: 'center',
	},
	container: {
		minHeight: '490px',
		maxHeight: '60vh',
		marginLeft: 'auto',
		marginRight: 'auto',
		overflow: 'auto',
		backgroundColor: '#000000',
		borderRadius: '15px',
		opacity: '.7',
		wordWrap: 'break-word',
		paddingTop: '20px',
	},
	noMessages: {
		width: '100%',
		color: '#ffffff',
		fontSize: '20px',
		paddingLeft: '20px',
		paddingTop: '20px',
	},
}));

const Chatbox = (props) => {
	const classes = useStyles();
	const { messages } = props;
	const msgs = messages;

	return (
		<div className={classes.root}>
			<Title className={classes.title} />
			<Container className={classes.container}>
				{messages.length ? (
					msgs.map((message, index) => (
						<ChatMessage key={index} message={message} />
					))
				) : (
					<Typography className={classes.noMessages}>
						No messages yet...
					</Typography>
				)}
			</Container>
		</div>
	);
};

const mapStateToProps = ({ messages }) => ({
	messages,
});

export default connect(mapStateToProps, null)(Chatbox);
