import React, { Component, useState, useEffect } from 'react';
import ChatMessage from './ChatMessage';
import { withStyles } from '@material-ui/styles';
import { Container, Grid } from '@material-ui/core';
import Title from './Title';
import PropTypes from 'prop-types';
import background from '../assets/img/background.png';
const URL = 'ws://35.239.214.133:9000';

const styles = theme => ({
	container: {
		maxWidth: '50%',
		height: '40vh',
		marginLeft: 'auto',
		marginRight: 'auto',
		border: '2px solid black',
		position: 'relative',
		overflow: 'auto',
		backgroundColor: '#000000',
		borderRadius: '15px',
		opacity: '.7',
		margin: '25px',
	},
	gridItem: {
		overflowY: 'scroll',
	},

	root: {
		backgroundImage: `url(${background})`,
		backgroundSize: 'auto',
		height: '100vh',
	},
});

class Chat extends Component {
	state = {
		messages: [],
	};

	ws = new WebSocket(URL);

	componentDidMount() {
		this.ws.onopen = () => {
			// on connecting, do nothing but log it to the console
			console.log('connected');
		};

		this.ws.onmessage = evt => {
			// on receiving a message, add it to the list of messages
			const message = JSON.parse(evt.data);
			this.addMessage(message);
			this.scrollToBottom();
		};

		this.ws.onclose = () => {
			console.log('disconnected');
			// automatically try to reconnect on connection loss
			this.setState({
				ws: new WebSocket(URL),
			});
		};
	}

	addMessage = message =>
		this.setState(state => ({ messages: [message, ...state.messages] }));

	scrollToBottom = () => {
		this.messagesEnd.scrollIntoView({ behavior: 'smooth' });
	};

	render() {
		const numberOfMessages = 15;
		const reversedMessages = this.state.messages.reverse();
		if (this.state.messages.length > numberOfMessages) {
			this.state.messages.shift();
			console.log(this.state.messages);
		}
		//TODO populate array and add new messages to end

		// else {
		// 	for (let i = numberOfMessages; i > 0; i--) {
		// 		this.state.messages.fill('', 0, i - 1);
		// 		console.log(this.state.messages);
		// 	}
		// }
		const { classes } = this.props;
		return (
			<div className={classes.root}>
				<Title className={classes.title} />
				<Container className={classes.container}>
					{reversedMessages.map((message, index) => (
						<ChatMessage
							key={index}
							message={message.message}
							name={message.name}
						/>
					))}
					<div
						style={{ float: 'left', clear: 'both' }}
						ref={el => {
							this.messagesEnd = el;
						}}
					></div>
				</Container>
			</div>
		);
	}
}

Chat.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Chat);
