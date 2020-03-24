import * as actionTypes from './constants';
import { fromJS } from 'immutable';

const defaultState = fromJS({
    isLogin: false,
    userInfo: {},
    groups: [],
    friends: []
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
        default:
            return state;
    }
};
