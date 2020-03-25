import React, { memo, useEffect } from 'react';
import { connect } from 'react-redux';
import { css } from 'astroturf';
import 'normalize.css';
import SideBar from '../SideBar/index';
import ListPanel from '../ListPanel/index';
import ChatPanel from '../ChatPanel/index';
import LoginModal from '../LoginModal/index';
import RegisterModal from '../RegisterModal/index';
import CreateGroupModal from '../CreateGroupModal/index';
import { changeLoginState, setUserInfo, setGroupList, setFriendList, setDialogList } from './store/actions';
import { changeLoginModalDisplay } from '../LoginModal/store/actions';
import { changeLinkmanList } from '../ListPanel/store/actions';
import { changeMsgList } from '../ChatPanel/store/actions';
import socket from '@/socket';

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

const MainPanal = (props) => {
	const { loginModalDisplay, registerModalDisplay, cgModalDisplay } = props;
	const { changeLoginStateDispatch, setUserInfoDispatch, changeLoginModalDisplayDispatch } = props;
	const { setGroupListDispatch, setFriendListDispatch, setDialogListDispatch } = props;
	const { changeLinkmanListDispatch, changeMsgListDispatch } = props;
	
	socket.on('connect', () => {
		const token = window.localStorage.getItem('token');
		console.log(token);
		if(token) {
			socket.emit('checkToken', {
				token: token
			}, res => {
				console.log(res)
				if(res.status !== 0) {
					alert('登录已过期，请重新登录w(ﾟДﾟ)w');
					changeLoginModalDisplayDispatch(true);
					window.localStorage.setItem('token', '');
				} else {
					const { userInfo, groups, friends, defaultMsgs } = res.data;
					const newGroups = groups.map(group => {
						return { ...group, type: 'group' };
					});
					const newFriends = friends.map(friend => {
						return { ...friend, type: 'user' };
					});
					const list = [...newGroups, ...newFriends];
					changeLoginStateDispatch(true);
					setUserInfoDispatch(userInfo);
					setGroupListDispatch(groups);
					setFriendListDispatch(friends);
					changeLinkmanListDispatch(list);
					changeMsgListDispatch(defaultMsgs);
					setDialogListDispatch(list);
				}
			});
		}
	});
	socket.on('disconnect', () => {
		changeLoginStateDispatch(false);
		setUserInfoDispatch({});
		alert('连接中断，请检查网络状态w(ﾟДﾟ)w');
	});
	socket.on('message', (msg) => {
		console.log('get msg', msg);
	});
	
	return (
		<div className='app'>
			<div className='container'>
				<SideBar />
				<ListPanel />
				<ChatPanel />
			</div>

			{loginModalDisplay && <LoginModal />}
			{registerModalDisplay && <RegisterModal />}
			{cgModalDisplay && <CreateGroupModal />}
		</div>
	);
}

const mapStateToProps = state => ({
	loginModalDisplay: state.getIn(['loginModal', 'display']),
	registerModalDisplay: state.getIn(['registerModal', 'display']),
	cgModalDisplay: state.getIn(['createGroupModal', 'display'])
});

const mapDispatchToProps = dispatch => {
	return {
		changeLoginStateDispatch(bool) {
            dispatch(changeLoginState(bool));
        },
		setUserInfoDispatch(info) {
			dispatch(setUserInfo(info));
		},
		changeLoginModalDisplayDispatch(bool) {
			dispatch(changeLoginModalDisplay(bool));
		},
		setGroupListDispatch(groups) {
			dispatch(setGroupList(groups));
		},
		setFriendListDispatch(friends) {
			dispatch(setFriendList(friends));
		},
		changeLinkmanListDispatch(list) {
			dispatch(changeLinkmanList(list));
		},
		changeMsgListDispatch(list) {
			dispatch(changeMsgList(list));
		},
		setDialogListDispatch(list) {
			dispatch(setDialogList(list));
		}
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(memo(MainPanal));
