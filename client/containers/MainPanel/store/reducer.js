import * as actionTypes from './constants';
import { fromJS } from 'immutable';
import socket from '@/socket';

const defaultState = fromJS({
    isLogin: false,
    userInfo: {},
    groups: [],
    friends: [],
    dialogs: [],
    targetInfo: {},
    msgList: []
});

export default (state = defaultState, action) => {
    switch(action.type) {
        case actionTypes.CHANGE_LOGIN_STATE:
            return state.set('isLogin', action.data);
        case actionTypes.SET_USER_INFO:
            return state.set('userInfo', action.data);
        case actionTypes.SET_GROUP_LIST:
            return state.set('groups', action.data);
        case actionTypes.SET_FRIEND_LIST:
            return state.set('friends', action.data);
        case actionTypes.SET_DIALOG_LIST:
            return state.set('dialogs', action.data);
        case actionTypes.ADD_GROUP:
            return state.updateIn(['groups'], groups => (
                groups.unshift(action.data)
            ))
        case actionTypes.ADD_GROUP_MSG: {
            const targetId = state.getIn(['targetInfo', 'id']);
            const index = state.getIn(['groups']).findIndex(group => group.get('id') === action.groupId);
            return state.updateIn(['groups', index], group => (
                group.update('msgs', msgs => (
                    msgs.push(action.msg)
                )).update('unread', cnt => targetId === action.groupId ? 0 : cnt + 1)
            ))
        }
        case actionTypes.ADD_USER_MSG: {
            const targetId = state.getIn(['targetInfo', 'id']);
            const index = state.getIn(['friends']).findIndex(friend => friend.get('id') === action.userId);
            return state.updateIn(['friends', index], friend => (
                friend.update('msgs', msgs => (
                    msgs.push(action.msg)
                )).update('unread', cnt => targetId === action.userId ? 0 : cnt + 1)
            ))
        }
        case actionTypes.UPDATE_DIALOG_LIST: {
            //console.log(action.msg);
            const { msg, to } = action;
            const targetId = state.getIn(['targetInfo', 'id']);
            const index = state.getIn(['dialogs']).findIndex(item => item.get('id') === to.id);
            if(index !== -1) {
                return state.updateIn(['dialogs', index], dialog => (
                    dialog.update('msgs', msgs => (
                        msgs.push(fromJS(msg))
                    ))
                    .set('latestMsg', msg.content)
                    .set('sender', to.owner ? msg.nickname : '')
                    .set('time', msg.created_at)
                    .update('unread', cnt => targetId === to.id ? 0 : cnt + 1)
                )) 
            } else {
                const newDialog = {
                    ...to,
                    msgs: [msg],
                    time: msg.created_at,
                    latestMsg: msg.content,
                    sender: to.owner ? msg.nickname : '',
                    unread: targetId === to.id ? 0 : 1
                };
                return state.updateIn(['dialogs'], dialogs => (
                    dialogs.unshift(fromJS(newDialog))
                ))
            }
        }
        case actionTypes.CHANGE_MSG_LIST:
            return state.set('msgList', action.data);
        case actionTypes.SET_TARGET_INFO:
            return state.set('targetInfo', action.data);
        case actionTypes.ADD_MSG_ITEM: {
            const targetId = state.getIn(['targetInfo', 'id']);
            if(action.id === targetId) {
                return state.update('msgList', list => (
                    list.push(action.msg)
                ))
            } else {
                return state
            }
        }
        case actionTypes.CLEAR_UNREAD:
            const targetId = state.getIn(['targetInfo', 'id']);
            if(targetId === action.id) {
                const owner = state.getIn(['targetInfo', 'owner']);
                const index = state.getIn(['dialogs']).findIndex(item => item.get('id') === targetId);
                socket.emit('clearUnread', {
                    targetType: owner ? 'group' : 'user',
                    targetId
                }, res => {
                    console.log(res);
                });
                return state.updateIn(['dialogs', index], dialog => (
                    dialog.set('unread', 0)
                )) 
            } else {
                return state;
            }
        default:
            return state;
    }
};
