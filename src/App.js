import React from 'react'
import { connect } from 'react-redux'
import { isMobile } from 'react-device-detect'

import { makeStyles } from '@material-ui/core/styles'

import { ConnectedChat } from './containers/ChatContainer/ChatContainer'
import { toggleOpenAction } from './containers/DrawerContainer/actions'
import background from './assets/img/background7.png'

const useStyles = makeStyles(() => ({
	root: {
		backgroundImage: `url(${background})`,
		height: '100%',
		width: '100%',
		position: 'fixed',
	},
}))

const App = props => {
	const classes = useStyles()
	if (isMobile) {
		props.toggleOpen(false)
	}
	return (
		<div className={classes.root}>
			<ConnectedChat />
			{/* <AdSense.Google
				client='ca-pub-5016075289889293'
				slot='7806394673'
				style={{ display: 'block' }}
				format='auto'
				responsive='true'
				layoutKey='-gw-1+2a-9x+5c'
			/> */}
		</div>
	)
}
const mapDispatchtoProps = dispatch => ({
	toggleOpen: bool => dispatch(toggleOpenAction(bool)),
})
export default connect(null, mapDispatchtoProps)(App)
