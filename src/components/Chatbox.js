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
	const URL = 'https://dmcchat.com:9000/api/getLast15Messages';

	useEffect(() => {
		let lastMessages = [];
		if (!messages.length) {
			console.log('Fetching messages from DB');
			fetch(URL, {
				method: 'GET',
				headers: {
					authorization:
						'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkhEckMtZ3VuTTVyNzlVV3h1cFBRRiJ9.eyJpc3MiOiJodHRwczovL2RtY2NoYXQuYXV0aDAuY29tLyIsInN1YiI6IjFhMmZmRlltejFkNjhXZG5MWjEyTWoxVVA4RnVrMzFDQGNsaWVudHMiLCJhdWQiOiJodHRwOi8vZG1jY2hhdC5jb20iLCJpYXQiOjE1ODczMjU0NTksImV4cCI6MTU4NzQxMTg1OSwiYXpwIjoiMWEyZmZGWW16MWQ2OFdkbkxaMTJNajFVUDhGdWszMUMiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.IUMQ6F_ZkbWeMuayzG56Sbz4iC-YUlDoxVxAUzN8AUeteq4Lzx4xtn8Tp03XX8Xwd5IYzLjey8Bfqz5r7oflVhcW_2aYxl3zsxQDU6p9oP1-v2UBAa3AXMEnrN9k7-qJp_jLjkPOoqX4RlJHuP6aT3u6kGOrKlcDCK-kFakz6rq7rt68jkUUfFSME6QKFvohCWGoQAUNcjKRLyoaYwUj7FBcdDGygsGz4YgfLo_JpFgQ7vw2qv_dm_EppT53gVfe51jwXN4O-gOdspW08AEepJtlFrTUpV_GRXaTi4wRfhmtkeN4K7TT5f0b9KIkC1XrVAtc2lD9i5Jo6z_aLt32Ww',
				},
			})
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
