import * as actionTypes from './constants';
import { fromJS } from 'immutable';

export const changeLoginState = data => ({
    type: actionTypes.CHANGE_LOGIN_STATE,
    data
});

export const setUserInfo = data => ({
    type: actionTypes.SET_USER_INFO,
    data: fromJS(data)
});

export const setGroupList = data => ({
    type: actionTypes.SET_GROUP_LIST,
    data: fromJS(data)
});

export const setFriendList = data => ({
    type: actionTypes.SET_FRIEND_LIST,
    data: fromJS(data)
});

export const setDialogList = data => ({
    type: actionTypes.SET_DIALOG_LIST,
    data: fromJS(data)
});

export const addGroup = data => ({
    type: actionTypes.ADD_GROUP,
    data: fromJS(data)
});

export const addGroupMsg = (groupId, msg) => ({
    type: actionTypes.ADD_GROUP_MSG,
    msg: fromJS(msg),
    groupId
});

export const addUserMsg = (userId, msg) => ({
    type: actionTypes.ADD_USER_MSG,
    msg: fromJS(msg),
    userId
});

export const updateDialogList = (id, msg, targetType) => ({
    type: actionTypes.UPDATE_DIALOG_LIST,
    msg,
    to_id: id,
    targetType
});