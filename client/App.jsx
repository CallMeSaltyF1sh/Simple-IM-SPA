import React from 'react';
import { css } from 'astroturf';
import 'normalize.css';
import SideBar from './containers/SideBar';
import ListPanel from './containers/ListPanel';

const styles = css`
	.app{
		width: 100%;
		height: 100vh;
		background-image: url('./assets/images/1.png');
		background-size: 100% 100%;
		background-repeat: no-repeat;
		.container {
			display: flex;
			flex-direction: row;
			position: relative;
			width: 76%;
			margin-left: 12%;
			height: 90%;
			top: 5%;
			background-color: rgba(245,245, 245, 0.5);
			border-radius: 30px;
			box-shadow: 0px 5px 25px #666;
		}
	}
`;

function App() {
	return (
		<div className='app'>
			<div className='container'>
				<SideBar />
				<ListPanel />
			</div>
		</div>
	);
}

export default App;
