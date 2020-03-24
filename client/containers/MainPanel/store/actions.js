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