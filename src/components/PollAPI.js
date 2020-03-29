import React from 'react';
import ReactPolling from 'react-polling';

const PollAPI = () => {
	return (
		<ReactPolling
			url={'https://destroymc.net/status.json'}
			interval={10000} // in milliseconds(ms)
			retryCount={3} // this is optional
			onSuccess={() => console.log('handle success')}
			onFailure={() => console.log('handle failure')} // this is optional
			method={'GET'}
			render={({ startPolling, stopPolling, isPolling }) => {
				if (isPolling) {
					return <div> Hello I am polling</div>;
				} else {
					return <div> Hello I stopped polling</div>;
				}
			}}
		/>
	);
};

export default PollAPI;
