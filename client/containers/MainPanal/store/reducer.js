import * as actionTypes from './constants';
import { fromJS } from 'immutable';

const defaultState = fromJS({
    isLogin: false,
    userInfo: {}
});

export default (state = defaultState, action) => {
    switch(action.type) {
        case actionTypes.CHANGE_LOGIN_STATE:
            return state.set('isLogin', action.data);
        case actionTypes.SET_USER_INFO:
            return state.set('userInfo', action.data);
        default:
            return state;
    }
};
