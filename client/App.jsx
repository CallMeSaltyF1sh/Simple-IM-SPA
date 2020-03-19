import React from 'react';
import { Provider } from 'react-redux';
import store from './store/index';
import MainPanal from '@/containers/MainPanal/index';

function App() {
	return (
		<Provider store={store}>
			<MainPanal />
		</Provider>
	);
}

export default App;
