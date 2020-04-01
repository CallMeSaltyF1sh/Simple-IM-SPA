import * as actionTypes from './constants';
import { fromJS } from 'immutable';

export const changeMsgList = data => dispatch => {dispatch({
    type: actionTypes.CHANGE_MSG_LIST,
    data: fromJS(data)
})};

export const setTargetInfo = data => dispatch => {dispatch({
    type: actionTypes.SET_TARGET_INFO,
    data: fromJS(data)
})};