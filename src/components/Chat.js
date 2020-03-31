import React, { Component, useState, useEffect } from 'react';
import ChatMessage from './ChatMessage';
import { withStyles } from '@material-ui/styles';
import { Container, Typography, Grid } from '@material-ui/core';
import Title from './Title';
import PropTypes from 'prop-types';
import background from '../assets/img/background.png';
import PollAPI from './PollAPI';
import InfoDrawer from './InfoDrawer';
const URL = 'ws://35.239.214.133:9000';

const styles = theme => ({
	container: {
		// width: '60%',
		minHeight: '50vh',
		maxHeight: '60vh',
		marginLeft: 'auto',
		marginRight: 'auto',
		marginTop: '10vh',
		// marginTop: '20vh',
		// border: '2px solid black',
		// position: 'relative',
		overflow: 'auto',
		backgroundColor: '#000000',
		borderRadius: '15px',
		opacity: '.7',
		// margin: '27px',
		paddingTop: '20px',
		wordWrap: 'break-word',
	},
	// root: {
	// 	backgroundImage: `url(${background})`,
	// 	backgroundSize: 'cover',
	// 	// width: 'auto',
	// 	height: '100%',
	// },
	noMessages: {
		width: '100%',
		color: '#ffffff',
		fontSize: '20px',
		paddingLeft: '20px',
	},
	title: {
		marginTop: '10vh',
		textAlign: 'center',
	},
});

class Chat extends Component {
	state = {
		messages: [],
		players: [],
		tps: '',
		uptime: '',
		worldSize: '',
	};

	ws = new WebSocket(URL);

	componentDidMount() {
		this.ws.onopen = () => {
			// on connecting, do nothing but log it to the console
			console.log('Connected to chat.');
		};

		this.ws.onmessage = evt => {
			const message = JSON.parse(evt.data);

			this.parseIncomingMessage(message);
			this.scrollToBottom();
			// console.log(this.state.players);
		};

		this.ws.onclose = () => {
			console.log('Disconnect from chat.');
			// automatically try to reconnect on connection loss
			this.setState({
				ws: new WebSocket(URL),
			});
		};
	}

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

	addMessage = message => {
		//Check if message from in game or node server poll
		if (!message.players) {
			this.setState(state => ({ messages: [message, ...state.messages] }));
		} else {
			this.setState({ players: message.players });
			this.setState({ tps: message.tps });
			// this.setState({ uptime: message.uptime });
			this.setState({ worldSize: message.worldSize });
			// console.log(message.players);
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
				<Grid container>
					<Grid item md={3} lg={3} xl={3}>
						<InfoDrawer
							players={this.state.players}
							tps={this.state.tps}
							// uptime={this.state.uptime}
							worldSize={this.state.worldSize}
						/>
					</Grid>

					<Grid item xs={12} sm={12} md={6} lg={6}>
						<Title className={classes.title} />
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
					</Grid>
				</Grid>
			</div>
		);
	}
}

Chat.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Chat);
