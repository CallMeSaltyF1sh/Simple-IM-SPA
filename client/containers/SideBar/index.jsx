import React, { memo } from 'react';
import { connect } from 'react-redux';
import { css } from 'astroturf';
import { changeLoginModalDisplay } from '../LoginModal/store/actions';
import { 
    changeLoginState,
    setUserInfo, 
    setGroupList, 
    setFriendList, 
    setDialogList,
    changeMsgList, 
    setTargetInfo 
} from '../MainPanel/store/actions';
import { changeItemType } from '../ListPanel/store/actions';
import socket from '@/socket';

const sideBarBgColor = 'rgba(252,210,118,0.75)';
const listItemOnHoverBgColor = 'rgba(208,181,166,0.5)';
const iconColor = '#b57c5c';

const styles = css`
    .side-bar {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        position: relative;
        width: 96px;
        min-width: 96px;
        max-width: 96px;
        height: 100%;
        background-color: ${sideBarBgColor};
        border-top-left-radius: 30px;
        border-bottom-left-radius: 30px;
        box-shadow: 5px 0px 10px -5px #888;
        .avatar {
            width: 64%;
            padding-top: 64%;
            margin: 30px 0 0 18%;
            background-image: url('../../assets/images/avatars/1.png');
            background-size: 100% 100%;
            box-sizing: border-box;
            border-radius: 50%;
            cursor: pointer;
        }
        .icon-list {
            display: flex;
            flex-direction: column;
            width: 100%;
            margin-bottom: 42%;
            cursor: pointer;
        }
        .icon-list-item {
            width: 100%;
            height: 55px;
            padding-top: 11px;
            box-sizing: border-box;
            text-align: center;
            transition: all 0.3s;
            &:hover {
                background-color: ${listItemOnHoverBgColor};
            }
            .icon {
                font-size: 30px;
                color: ${iconColor};
            }
        }
    }
`;

const SideBar = (props) => {
    const { isLogin, userInfo } = props;
    const { changeLoginModalDisplay, changeLoginState } = props;
    const { setDialogList, setUserInfo, changeItemType } = props;
    const { setGroupList, setFriendList, changeMsgList } = props;
    const { setTargetInfo } = props;

    const userInfoJS = userInfo ? userInfo.toJS() : {};

    const handleLogin = () => {
        changeLoginModalDisplay(true);
    };
    const handleLogOut = () => {
        changeLoginState(false);
        setUserInfo({});
        setFriendList([]);
        setGroupList([]);
        if(window.localStorage.getItem('token')) {
            window.localStorage.setItem('token', '');
        }
        socket.emit('guest', {}, res => { 
			console.log(res);
			if(res.status === 0 && res.data.msgs.length) {
				const msgs = res.data.msgs.reverse();
				const latestMsg = msgs[msgs.length - 1];
				const dialog = {
					...res.data,
					msgs,
					latestMsg: latestMsg.content,
					time: latestMsg.created_at,
					sender: latestMsg.nickname
				};

				changeItemType('dialog');
				setTargetInfo(res.data);
				setDialogList([dialog]);
				changeMsgList(msgs);
			}
		});
        /*
        const dialog = dialogsJS.find(item => item.is_default === 1);
        setGroupList([dialog]);
        setDialogList([dialog]);
        changeItemType('dialog');
        setTargetInfo(dialog);
        changeMsgList(dialog.msgs);
        */
    };
    const handleViewDialogList = () => {
        changeItemType('dialog');
    };
    const handleViewFriendList = () => {
        changeItemType('friend');
    };
    const handleViewGroupList = () => {
        changeItemType('group');
    };

    const iconList = [
        {
            id: 0,
            desc: '消息',
            unicode: '&#xe603;',
            handler: handleViewDialogList
        },
        {
            id: 1,
            desc: '好友',
            unicode: '&#xe651;',
            handler: handleViewFriendList
        },
        {
            id: 2,
            desc: '群聊',
            unicode: '&#xe69f;',
            handler: handleViewGroupList
        },
        {
            id: 3,
            desc: '设置',
            unicode: '&#xe660;',
            handler: () => {}
        }, 
        {
            id: 4,
            desc: '退出',
            unicode: '&#xe89c;',
            handler: handleLogOut
        }
    ];

    return (
        <div className='side-bar'>
            <div className='avatar'></div>
            <div className='icon-list'>
                {
                    isLogin ? 
                    iconList.map(item => (
                        <div className='icon-list-item' key={item.id} onClick={item.handler}>
                            <i className='iconfont icon' dangerouslySetInnerHTML={{ __html: item.unicode}}></i>
                        </div>
                    )) : <div className='icon-list-item' onClick={handleLogin}>
                        <i className='iconfont icon'>&#xe65a;</i>
                    </div>
                }
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    isLogin: state.getIn(['mainPanel', 'isLogin']),
    userInfo: state.getIn(['mainPanel', 'userInfo'])
});

export default connect(mapStateToProps, {
    changeLoginModalDisplay,
    changeLoginState,
    changeItemType,
    setUserInfo,
    setGroupList,
    setFriendList,
    changeMsgList,
    setDialogList,
    setTargetInfo
})(memo(SideBar));
