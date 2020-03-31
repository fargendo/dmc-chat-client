import React, { useState } from 'react';
import ReactPolling from 'react-polling';
import PlayerList from './PlayerList';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import ServerStats from './ServerStats';
import InfoDrawer from './InfoDrawer';

const useStyles = makeStyles(theme => ({
	fetching: {
		textAlign: 'left',
	},
}));

const PollAPI = props => {
	const { showTPS } = props;
	const [users, setUsers] = useState([]);
	const [TPS, setTPS] = useState('');
	const [uptime, setUptime] = useState('');
	const [worldSize, setWorldSize] = useState('');
	const classes = useStyles();

	return (
		<div>
			<ReactPolling
				url={'https://destroymc.net/status'}
				interval={10000} // in milliseconds(ms)
				// retryCount={3} // this is optional
				onSuccess={data => {
					setUsers(data.players);
					setTPS(data.tps);
					setUptime(data.uptime);
					setWorldSize(data.worldSize);

					if (data) {
						return true;
					}
				}}
				onFailure={() => console.log('handle failure')} // this is optional
				method={'GET'}
				render={({ startPolling, stopPolling, isPolling }) => {
					if (isPolling && !showTPS) {
						// return <PlayerList users={users} />;
						return <InfoDrawer users={users} TPS={TPS} uptime={uptime} />;
					} else {
						return <div />;
					}
				}}
			/>
			{showTPS && (
				<ServerStats TPS={TPS} uptime={uptime} worldSize={worldSize} />
			)}
		</div>
	);
};

export default PollAPI;
