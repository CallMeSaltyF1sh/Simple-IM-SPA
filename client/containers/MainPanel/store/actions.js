import * as actionTypes from './constants';
import { fromJS } from 'immutable';

export const changeLoginState = data => dispatch => {dispatch({
    type: actionTypes.CHANGE_LOGIN_STATE,
    data
})};

export const setUserInfo = data => dispatch => {dispatch({
    type: actionTypes.SET_USER_INFO,
    data: fromJS(data)
})};

export const setGroupList = data => dispatch => {dispatch({
    type: actionTypes.SET_GROUP_LIST,
    data: fromJS(data)
})};

export const setFriendList = data => dispatch => {dispatch({
    type: actionTypes.SET_FRIEND_LIST,
    data: fromJS(data)
})};

export const setDialogList = data => dispatch => {dispatch({
    type: actionTypes.SET_DIALOG_LIST,
    data: fromJS(data)
})};

export const addGroup = data => dispatch => {dispatch({
    type: actionTypes.ADD_GROUP,
    data: fromJS(data)
})};

export const addGroupMsg = (groupId, msg) => dispatch => {dispatch({
    type: actionTypes.ADD_GROUP_MSG,
    msg: fromJS(msg),
    groupId
})};

export const addUserMsg = (userId, msg) => dispatch => {dispatch({
    type: actionTypes.ADD_USER_MSG,
    msg: fromJS(msg),
    userId
})};

export const updateDialogList = (to, msg, targetType) => dispatch => {dispatch({
    type: actionTypes.UPDATE_DIALOG_LIST,
    msg,
    to,
    targetType
})};

export const changeMsgList = data => dispatch => {dispatch({
    type: actionTypes.CHANGE_MSG_LIST,
    data: fromJS(data)
})};

export const setTargetInfo = data => dispatch => {dispatch({
    type: actionTypes.SET_TARGET_INFO,
    data: fromJS(data)
})};

export const addMsgItem = (id, msg) => dispatch => {dispatch({
    type: actionTypes.ADD_MSG_ITEM,
    msg: fromJS(msg),
    id
})};

export const clearUnread = (id) => dispatch => { dispatch({
    type: actionTypes.CLEAR_UNREAD,
    id
})};