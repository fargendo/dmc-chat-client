import React, { Component, useState, useEffect } from 'react';
import ChatMessage from './ChatMessage';
import { withStyles } from '@material-ui/styles';
import { Container, Typography } from '@material-ui/core';
import Title from './Title';
import PropTypes from 'prop-types';
import background from '../assets/img/background.png';
// import PollAPI from './PollAPI';
const URL = 'wss://dmcchat.com:9000';

const styles = theme => ({
	container: {
		width: '60%',
		height: '50vh',
		marginLeft: 'auto',
		marginRight: 'auto',
		// border: '2px solid black',
		position: 'relative',
		overflow: 'auto',
		backgroundColor: '#000000',
		borderRadius: '15px',
		opacity: '.7',
		margin: '27px',
		paddingTop: '20px',
		wordWrap: 'break-word',
	},
	root: {
		backgroundImage: `url(${background})`,
		backgroundSize: 'cover',
		// width: 'auto',
		height: '100%',
	},
	noMessages: {
		width: '100%',
		color: '#ffffff',
		fontSize: '20px',
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
			console.log('Connected to chat.');
		};

		this.ws.onmessage = evt => {
			// on receiving a message, add it to the list of messages
			const message = JSON.parse(evt.data);
			// this.addMessage(message);
			this.parseIncomingMessage(message);
			this.scrollToBottom();
		};

		this.ws.onclose = () => {
			console.log('Disconnect from chat.');
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
	//Send incoming message to parser
	parseIncomingMessage = message => {
		if (message.name == '[From') {
			message = null;
		} else if (message.name == '[!]') {
			message = null;
		} else {
			this.addMessage(message);
		}
	};

	render() {
		const numberOfMessages = 15;
		const reversedMessages = this.state.messages.reverse();
		if (this.state.messages.length > numberOfMessages) {
			this.state.messages.shift();
		}
		const { classes } = this.props;
		return (
			<div className={classes.root}>
				<Title />
				{/* <PollAPI /> */}
				<Container className={classes.container}>
					{this.state.messages.length ? (
						reversedMessages.map((message, index) => (
							<ChatMessage
								key={index}
								message={message.message}
								name={message.name}
							/>
						))
					) : (
						<Typography className={classes.noMessages}>
							No messages yet...
						</Typography>
					)}
					<div
						style={{ float: 'left', clear: 'both' }}
						ref={el => {
							this.messagesEnd = el;
						}}
					/>
				</Container>
			</div>
		);
	}
}

Chat.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Chat);
