import * as actionTypes from './constants';
import { fromJS } from 'immutable';

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
            return  state.set('dialogs', action.data);
        default:
            return state;
    }
};
