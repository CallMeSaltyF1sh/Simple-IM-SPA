import React from 'react';
import { css } from 'astroturf';
import 'normalize.css';
import SideBar from './containers/SideBar/SideBar';
import ListPanel from './containers/ListPanal/ListPanel';
import ChatPanel from './containers/ChatPanel/ChatPanel';

const styles = css`
	.app{
		width: 100%;
		min-width: 850px;
		height: 100vh;
		background-image: url('./assets/images/bg.png');
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
			background-color: rgba(235,235, 235, 0.8);
			border-radius: 30px;
			box-shadow: 0px 5px 25px #666;
		}
	}
	@font-face {
		font-family: 'iconfont';
		src: url('./assets/fonts/iconfont.eot');
		src: url('./assets/fonts/iconfont.woff') format('woff'),
			url('./assets/fonts/iconfont.ttf') format('truetype'),
			url('./assets/fonts/iconfont.svg') format('svg');
	}
	.iconfont {
		font-family: 'iconfont' !important;
		font-style: normal;
		-webkit-font-smoothing: antialiased;
    	-webkit-text-stroke-width: 0.2px;
    	-moz-osx-font-smoothing: grayscale;
	}
`;

function App() {
	return (
		<div className='app'>
			<div className='container'>
				<SideBar />
				<ListPanel />
				<ChatPanel />
			</div>
		</div>
	);
}

export default App;
