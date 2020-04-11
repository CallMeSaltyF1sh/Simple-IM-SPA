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
import { 
	changeLoginState, 
	setUserInfo, 
	setGroupList, 
	setFriendList, 
	setDialogList, 
	addGroupMsg, 
	addUserMsg, 
	updateDialogList 
} from './store/actions';
import { changeLoginModalDisplay } from '../LoginModal/store/actions';
import { changeMsgList } from '../ChatPanel/store/actions';
import { changeItemType } from '../ListPanel/store/actions';
import { setTargetInfo } from '../ChatPanel/store/actions';
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
	const { changeLoginState, setUserInfo, changeLoginModalDisplay } = props;
	const { setGroupList, setFriendList, setDialogList } = props;
	const { changeMsgList, updateDialogList, setTargetInfo } = props;
	const { addGroupMsg, addUserMsg, changeItemType } = props;

	useEffect(() => {
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
						changeLoginModalDisplay(true);
						window.localStorage.setItem('token', '');
					} else {
						const { userInfo, groups, friends } = res.data;

						changeLoginState(true);
						let list = [...groups, ...friends];
						list = list.map(item => {
							let latestMsg, time, sender,
								msgs = item.msgs;
							if(msgs && msgs.length) {
								latestMsg = msgs[msgs.length-1].content;
								time = msgs[msgs.length-1].created_at;
								if(item.owner) sender = msgs[msgs.length-1].nickname;
							}
							
							return {
								...item,
								latestMsg,
								time,
								sender
							}
						});
						list = list.filter(item => item.latestMsg);
						//console.log(list);

						setUserInfo(userInfo);
						setGroupList(groups);
						setFriendList(friends);
						setDialogList(list);
					}
				});
			} else {
				//未登录
				socket.emit('guest', {}, res => { 
					console.log(res);
					if(res.status === 0 && res.data.msgs.length) {
						const msgs = res.data.msgs;
						const latestMsg = msgs[msgs.length - 1];
						const dialog = {
							...res.data,
							msgs,
							latestMsg: latestMsg.content,
							time: latestMsg.created_at,
							sender: latestMsg.nickname
						};

						changeItemType('dialog');
						setTargetInfo(res.data)
						setGroupList([dialog]);
						setDialogList([dialog]);
						changeMsgList(msgs);
					}
				})
			}
		});
	
		socket.on('disconnect', () => {
			alert('连接已中断，请刷新页面w(ﾟДﾟ)w');
			changeLoginState(false);
			setUserInfo({});	
			setGroupList([]);
			setDialogList([]);
			setTargetInfo({});
			changeMsgList([]);
		});

		socket.on('message', res => {
			console.log('get msg', res);
			if(res.content) {
				const { content, to, from, type, targetType } = res;
				const msg = {
					created_at: new Date(),
					content,
					id: from.id,
					avatar: from.avatar,
					nickname: from.nickname,
					description: from.description,
					msg_type: type
				};
				if(targetType === 'group') {
					addGroupMsg(to.id, msg);
				} else if (targetType === 'user') {
					addUserMsg(from.id, msg);
				}
				const newTo = to.owner ? to : from;
				updateDialogList(newTo, msg, targetType);
			}
		});

		return () => {
			socket.close();
		}
	}, []);
	
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

export default connect(mapStateToProps, {
	changeLoginModalDisplay,
	changeLoginState,
	setUserInfo,
	setGroupList,
	setFriendList,
	setDialogList,
	addGroupMsg,
	addUserMsg,
	updateDialogList,
	changeItemType,
	setTargetInfo,
	changeMsgList
})(memo(MainPanal));
