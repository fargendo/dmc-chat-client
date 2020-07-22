import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { Grid } from '@material-ui/core'

import {
	addMessageAction,
	updatePlayersAction,
	updateTPSAction,
	updateWorldSizeAction,
	setMessageColorAction,
	setNameColorAction,
	addNameAction,
	getNameAction,
} from './actions'
import Chatbox from '../../components/Chatbox'
import { ConnectedDrawerContainer } from '../DrawerContainer/DrawerContainer'
import parseData from '../../parsers/parseData'
import { getNameColor, getMessageColor } from './../../parsers/getChatColor'

// const URL = 'wss://dmcchat.com:9000';
const URL = 'ws://localhost:9000'

export class ChatContainer extends Component {
	ws = new WebSocket(URL)

	componentDidMount() {
		this.ws.onopen = () => {
			// on connecting, do nothing but log it to the console
			console.log('Connected to chat.')
		}

		this.ws.onmessage = evt => {
			const data = JSON.parse(evt.data)

			if (!data.players) {
				const parsedMessage = parseData(data)

				const nameColor = getNameColor(data)
				const messageColor = getMessageColor(data)

				if (parsedMessage) {
					this.props.addName(parsedMessage.name)
					this.props.addMessages(parsedMessage.message)
					this.props.setNameColor(nameColor)
					this.props.setMsgColor(messageColor)
				}
			} else {
				this.props.updatePlayers(data.players)
				this.props.updateTps(data.tps)
				this.props.updateWorldSize(data.worldSize)
			}
		}

		this.ws.onclose = () => {
			console.log('Disconnect from chat.')
			// automatically try to reconnect on connection loss
			this.setState({
				ws: new WebSocket(URL),
			})
		}
	}

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
		)
	}
}

ChatContainer.propTypes = {
	messages: PropTypes.array,
	players: PropTypes.array,
	tps: PropTypes.string,
	worldSize: PropTypes.string,
}

const mapStateToProps = ({ messages, players, tps, worldSize }) => ({
	messages,
	players,
	tps,
	worldSize,
})

const mapDispatchToProps = dispatch => ({
	addMessages: message => dispatch(addMessageAction(message)),
	updatePlayers: players => dispatch(updatePlayersAction(players)),
	updateTps: tps => dispatch(updateTPSAction(tps)),
	updateWorldSize: worldSize => dispatch(updateWorldSizeAction(worldSize)),
	setMsgColor: color => dispatch(setMessageColorAction(color)),
	addName: name => dispatch(addNameAction(name)),
	setNameColor: color => dispatch(setNameColorAction(color)),
})

export const ConnectedChat = connect(
	mapStateToProps,
	mapDispatchToProps
)(ChatContainer)
