import * as actionTypes from './constants';
import { fromJS } from 'immutable';

export const changeLinkmanList = data => ({
    type: actionTypes.CHANGE_DIALOG_LIST,
    data: fromJS(data)
});

export const changeItemType = data => ({
    type: actionTypes.CHANGE_ITEM_TYPE,
    data: data
});

export const setFocusItem = data => ({
    type: actionTypes.SET_FOCUS_ITEM,
    data: data
});