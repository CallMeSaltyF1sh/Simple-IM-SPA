import React, { memo } from 'react';
import { connect } from 'react-redux';
import { css } from 'astroturf';
import { changeLoginModalDisplay } from '../LoginModal/store/actions';
import { changeLoginState } from '../MainPanel/store/actions';
import { changeItemType, changeLinkmanList } from '../ListPanel/store/actions';

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
        background-color: rgba(252,210,118,0.75);
        border-top-left-radius: 30px;
        border-bottom-left-radius: 30px;
        box-shadow: 5px 0px 10px -5px #888;
        .avator {
            width: 64%;
            padding-top: 64%;
            margin: 30px 0 0 18%;
            background-image: url('../../assets/images/avators/1.png');
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
                background-color: rgba(208,181,166,0.5);
            }
            .icon {
                font-size: 30px;
                color: #b57c5c;
            }
        }
    }
`;

const SideBar = (props) => {
    const { isLogin } = props;
    const { changeLoginModalDisplayDispatch, changeLoginStateDispatch } = props;
    const { changeItemTypeDispatch, changeLinkmanListDispatch } = props;
    const { groups, friends, dialogs, userInfo } = props;

    const groupsJS = groups ? groups.toJS() : [];
    const friendsJS = friends ? friends.toJS() : [];
    const dialogsJS = dialogs ? dialogs.toJS() : [];
    const userInfoJS = userInfo ? userInfo.toJS() : {};

    const handleLogin = () => {
        changeLoginModalDisplayDispatch(true);
    };
    const handleLogOut = () => {
        changeLoginStateDispatch(false);
        if(window.localStorage.getItem('token')) {
            window.localStorage.setItem('token', '');
        }
    };
    const handleViewDialogList = () => {
        changeItemTypeDispatch('dialog');
        changeLinkmanListDispatch(dialogsJS);
    };
    const handleViewFriendList = () => {
        changeItemTypeDispatch('linkman');
        changeLinkmanListDispatch(friendsJS);
    };
    const handleViewGroupList = () => {
        changeItemTypeDispatch('linkman');
        changeLinkmanListDispatch(groupsJS);
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
            <div className='avator'></div>
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
    groups: state.getIn(['mainPanel', 'groups']),
    friends: state.getIn(['mainPanel', 'friends']),
    dialogs: state.getIn(['mainPanel', 'dialogs']),
    userInfo: state.getIn(['mainPanel', 'userInfo'])
});

const mapDispatchToProps = dispatch => {
	return {
		changeLoginModalDisplayDispatch(bool) {
			dispatch(changeLoginModalDisplay(bool));
		},
        changeLoginStateDispatch(bool) {
            dispatch(changeLoginState(bool));
        },
        changeItemTypeDispatch(type) {
            dispatch(changeItemType(type));
        },
        changeLinkmanListDispatch(list) {
            dispatch(changeLinkmanList(list));
        }
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(memo(SideBar));
