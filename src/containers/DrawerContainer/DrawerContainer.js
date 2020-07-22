import React, { useEffect } from 'react'
// import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'

import InfoDrawer from '../../components/InfoDrawer'
import { toggleOpenAction, updatePlayerIcon, setUUID } from './actions'
import {
	updatePlayersAction,
	updateTPSAction,
	updateWorldSizeAction,
} from '../ChatContainer/actions'
import Menu from '../../components/Menu'
import getUUID from '../../js/getUUID'

const useStyles = makeStyles(() => ({
	root: {
		display: 'flex',
	},
}))

export const DrawerContainer = props => {
	const { players } = props
	const classes = useStyles()

	const [drawerOpen, setDrawerOpen] = React.useState(true)

	const handleDrawerToggle = () => {
		setDrawerOpen(!drawerOpen)
	}

	useEffect(() => {
		let playerIconArray = []

		if (!players.length) {
			console.log('fetching info')
			fetch('https://destroymc.net/status')
				.then(response => response.json())
				.then(data => {
					props.updatePlayers(data.players)
					props.updateTps(data.tps)
					props.updateWorldSize(data.worldSize)
				})
				.catch(err => console.log(err))
		}

		players.forEach(player => {
			playerIconArray.push(`https://minotar.net/avatar/${player}/25.png`)
		})

		props.updatePlayerIcon(playerIconArray)
	}, [players])

	return (
		<div className={classes.root}>
			<Menu drawerOpen={drawerOpen} handleDrawerToggle={handleDrawerToggle} />
			<InfoDrawer
				drawerOpen={drawerOpen}
				handleDrawerToggle={handleDrawerToggle}
			/>
		</div>
	)
}

const mapStateToProps = ({
	players,
	tps,
	worldSize,

	icons,
	drawerColor,
}) => ({
	players,
	tps,
	worldSize,

	icons,
	drawerColor,
})

const mapDispatchtoProps = dispatch => ({
	toggleOpen: bool => dispatch(toggleOpenAction(bool)),
	updatePlayers: players => dispatch(updatePlayersAction(players)),
	updateTps: tps => dispatch(updateTPSAction(tps)),
	updateWorldSize: worldSize => dispatch(updateWorldSizeAction(worldSize)),
	updatePlayerIcon: icons => dispatch(updatePlayerIcon(icons)),
	setPlayerUUID: uuid => dispatch(setUUID(uuid)),
})

export const ConnectedDrawerContainer = connect(
	mapStateToProps,
	mapDispatchtoProps
)(DrawerContainer)
