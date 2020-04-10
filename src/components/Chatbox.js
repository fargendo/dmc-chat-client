import React from 'react';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';

import Title from './Title';
import ChatMessage from './ChatMessage';

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
	const msgs = messages;

	return (
		<div className={classes.root}>
			<Title className={classes.title} />
			<Container spacing={8} className={classes.container}>
				{messages.length ? (
					msgs.map((message, index) => (
						<ChatMessage key={index} message={message} />
					))
				) : (
					<ChatMessage message={'No messages yet...'} />
				)}
			</Container>
		</div>
	);
};

const mapStateToProps = ({ messages }) => ({
	messages,
});

export default connect(mapStateToProps, null)(Chatbox);
