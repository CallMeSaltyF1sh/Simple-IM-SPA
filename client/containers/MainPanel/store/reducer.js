import * as actionTypes from './constants';
import { fromJS } from 'immutable';
//import socket from '@/socket';

const defaultState = fromJS({
    isLogin: false,
    userInfo: {},
    groups: [],
    friends: [],
    dialogs: []
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
            const index = state.getIn(['groups']).findIndex(group => group.get('id') === action.groupId);
            return state.updateIn(['groups', index], group => (
                group.update('msgs', msgs => (
                    msgs.push(action.msg)
                ))
            ))
        }
        case actionTypes.ADD_USER_MSG: {
            const index = state.getIn(['friends']).findIndex(friend => friend.get('id') === action.userId);
            return state.updateIn(['friends', index], friend => (
                friend.update('msgs', msgs => (
                    msgs.push(action.msg)
                ))
            ))
        }
        case actionTypes.UPDATE_DIALOG_LIST: {
            console.log(action.msg);
            const index = state.getIn(['dialogs']).findIndex(item => item.get('id') === action.to_id);
            if(index !== -1) {
                return state.updateIn(['dialogs', index], dialog => (
                    dialog.update('msgs', msgs => (
                        msgs.push(fromJS(action.msg))
                    ))
                    .set('latestMsg', action.msg.content)
                    .set('sender', action.msg.nickname)
                    .set('time', action.msg.created_at)
                )) 
            } else {
                /*
                let newDialog;
                if(action.targetType === 'group') {
                    socket.emit('getGroupInfo', {
                        id: action.to_id
                    }, res => {
                        console.log(res);
                        if(res.data) {
                            newDialog = {
                                ...res.data,
                                latestMsg: action.msg.content,
                                sender: action.msg.nickname,
                                time: action.msg.created_at
                            };
                        }
                    })
                } else {

                }
                */
            }
        }
        default:
            return state;
    }
};
