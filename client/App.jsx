import React from 'react';
import { Provider } from 'react-redux';
import store from './store/index';
import MainPanel from '@/containers/MainPanel/index';
import socket from './socket';
/*
socket.emit('login', { test: 1 }, res => {
	console.log(res);
});
*/

function App() {
	return (
		<Provider store={store}>
			<MainPanel />
		</Provider>
	);
}

export default App;
