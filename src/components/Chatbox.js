import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { animateScroll } from 'react-scroll';

import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';

import Title from './Title';
import ChatMessage from './ChatMessage';

import { getMessagesAction } from '../containers/ChatContainer/actions';

const useStyles = makeStyles((theme) => ({
	root: { marginTop: '10vh' },
	title: {
		marginTop: '10vh',
		textAlign: 'center',
	},
	container: {
		maxHeight: '60vh',
		marginLeft: 'auto',
		marginRight: 'auto',
		overflow: 'auto',
		backgroundColor: 'rgba(0,0,0,0.7)',
		borderRadius: '5px',
		wordWrap: 'break-word',
		paddingTop: '20px',
		paddingBottom: '20px',
		maxWidth: '90%',
		[theme.breakpoints.up('lg')]: {
			minHeight: '490px',
		},
		[theme.breakpoints.down('md')]: {
			minHeight: '490px',
		},
		[theme.breakpoints.down('sm')]: {
			minHeight: '445px',
		},
		[theme.breakpoints.down('xs')]: {
			minHeight: '370px',
		},
	},
}));

const Chatbox = (props) => {
	const classes = useStyles();
	const { messages } = props;

	// const msgs = messages;
	const URL = 'http://35.239.214.133:9000/api/getLast15Messages';

	useEffect(() => {
		let lastMessages = [];
		if (!messages.length) {
			console.log('Fetching messages from DB');
			fetch(URL)
				.then((response) => response.json())
				.then((data) => {
					data.forEach((message) => {
						props.getMessages(message.message);
					});
				})

				.catch((err) => console.log(err));
		}
	}, [messages]);

	const scrollToBottom = () => {
		animateScroll.scrollToBottom();
	};

	return (
		<div className={classes.root}>
			<Title className={classes.title} />
			<Container spacing={8} className={classes.container}>
				{messages.length ? (
					messages.map((message, index) => (
						<ChatMessage key={index} message={message} />
					))
				) : (
					<ChatMessage message={'No messages yet...'} />
				)}
				{scrollToBottom()}
			</Container>
		</div>
	);
};

const mapStateToProps = ({ messages }) => ({
	messages,
});
const mapDispatchToProps = (dispatch) => ({
	getMessages: (message) => dispatch(getMessagesAction(message)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Chatbox);
