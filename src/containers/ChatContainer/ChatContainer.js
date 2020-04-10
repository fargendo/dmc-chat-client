import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
	addMessageAction,
	updatePlayersAction,
	updateTPSAction,
	updateWorldSizeAction,
} from './actions';
import Chatbox from '../../components/Chatbox';
import { ConnectedDrawerContainer } from '../DrawerContainer/DrawerContainer';
import { Grid } from '@material-ui/core';

const URL = 'ws://35.239.214.133:9000';

export class ChatContainer extends Component {
	ws = new WebSocket(URL);

	componentDidMount() {
		this.ws.onopen = () => {
			// on connecting, do nothing but log it to the console
			console.log('Connected to chat.');
		};

		this.ws.onmessage = (evt) => {
			const message = JSON.parse(evt.data);

			this.parseIncomingMessage(message);

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

	//Send incoming message to parser
	parseIncomingMessage = (message) => {
		if (!message.players) {
			if (message.name === '[From') {
				message = null;
			} else if (message.name === '[!]') {
				message = null;
			} else {
				const newMessage = message.name + ' ' + message.message;
				this.props.addMessages(newMessage);
			}
		} else {
			this.props.updatePlayers(message.players);
			this.props.updateTps(message.tps);
			this.props.updateWorldSize(message.worldSize);
		}
	};

	render() {
		return (
			<div>
				<Grid container>
					<Grid item md={2} lg={3} xl={3}>
						<ConnectedDrawerContainer />
					</Grid>
					<Grid item xs={12} sm={12} md={8} lg={6}>
						<Chatbox />
					</Grid>
				</Grid>
			</div>
		);
	}
}

ChatContainer.propTypes = {
	messages: PropTypes.array,
	players: PropTypes.array,
	tps: PropTypes.string,
	worldSize: PropTypes.string,
};

const mapStateToProps = ({ messages, players, tps, worldSize }) => ({
	messages,
	players,
	tps,
	worldSize,
});

const mapDispatchToProps = (dispatch) => ({
	addMessages: (message) => dispatch(addMessageAction(message)),
	updatePlayers: (players) => dispatch(updatePlayersAction(players)),
	updateTps: (tps) => dispatch(updateTPSAction(tps)),
	updateWorldSize: (worldSize) => dispatch(updateWorldSizeAction(worldSize)),
});

export const ConnectedChat = connect(
	mapStateToProps,
	mapDispatchToProps
)(ChatContainer);
