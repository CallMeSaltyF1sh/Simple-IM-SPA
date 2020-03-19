import React, { memo } from 'react';
import { connect } from 'react-redux';
import { css } from 'astroturf';
import 'normalize.css';
import SideBar from '@/containers/SideBar/index';
import ListPanel from '@/containers/ListPanal/index';
import ChatPanel from '@/containers/ChatPanel/index';
import LoginModal from '@/containers/LoginModal/index';
import RegisterModal from '@/containers/RegisterModal/index';
//import { changeLoginModalDisplay } from '../LoginModal/store/actions';
//import { changeRegisterModalDisplay } from '../RegisterModal/store/actions';

const styles = css`
	.app{
		width: 100%;
		min-width: 850px;
		height: 100vh;
		background-image: url('../../assets/images/bg.png');
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
		src: url('../../assets/fonts/iconfont.eot');
		src: url('../../assets/fonts/iconfont.woff') format('woff'),
			url('../../assets/fonts/iconfont.ttf') format('truetype'),
			url('../../assets/fonts/iconfont.svg') format('svg');
	}
	.iconfont {
		font-family: 'iconfont' !important;
		font-style: normal;
		-webkit-font-smoothing: antialiased;
    	-webkit-text-stroke-width: 0.2px;
    	-moz-osx-font-smoothing: grayscale;
		cursor: pointer;
	}
       
	body::-webkit-scrollbar {
        width: 1px;
        height: 1px;
		background: #FCD276;
    }
    body::-webkit-scrollbar-thumb {
        border-radius: 10px;
        box-shadow: inset 0 0 3px rgba(0,0,0,0.2);
        background: rgba(153, 115, 91, 0.6);
    }
    body::-webkit-scrollbar-track {
        border-radius: 10px;
        background: transparent;
    }
	body::-webkit-scrollbar-corner {
		background: #FCD276;
	}
`;

const MainPanal = ({ loginModalDisplay, registerModalDisplay }) => {
	return (
		<div className='app'>
			<div className='container'>
				<SideBar />
				<ListPanel />
				<ChatPanel />
			</div>

			{loginModalDisplay && <LoginModal />}
			{registerModalDisplay && <RegisterModal />}
		</div>
	);
}

const mapStateToProps = state => ({
	loginModalDisplay: state.getIn(['loginModal', 'display']),
	registerModalDisplay: state.getIn(['registerModal', 'display'])
});

const mapDispatchToProps = dispatch => {
	return {
		
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(memo(MainPanal));
