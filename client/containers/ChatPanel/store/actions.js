import * as actionTypes from './constants';
import { fromJS } from 'immutable';

export const changeMsgList = data => ({
    type: actionTypes.CHANGE_MSG_LIST,
    data: fromJS(data)
});

export const setTargetType = data => ({
    type: actionTypes.SET_TARGET_TYPE,
    data
});

export const setTargetInfo = data => ({
    type: actionTypes.SET_TARGET_INFO,
    data: fromJS(data)
});