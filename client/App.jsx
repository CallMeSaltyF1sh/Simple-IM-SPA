import React from 'react';
import { Provider } from 'react-redux';
import store from '@/store/index';
import MainPanel from '@/containers/MainPanel/index';

function App() {
	return (
		<Provider store={store}>
			<MainPanel />
		</Provider>
	);
}

export default App;
