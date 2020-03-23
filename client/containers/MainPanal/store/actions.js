import * as actionTypes from './constants';
import { fromJS } from 'immutable';

export const changeLoginState = data => ({
    type: actionTypes.CHANGE_LOGIN_STATE,
    data
});

export const setUserInfo = data => ({
    type: actionTypes.SET_USER_INFO,
    data: fromJS(data)
})