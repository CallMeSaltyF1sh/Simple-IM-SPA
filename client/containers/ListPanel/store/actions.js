import * as actionTypes from './constants';

export const changeItemType = data => ({
    type: actionTypes.CHANGE_ITEM_TYPE,
    data: data
});

export const setFocusItem = data => ({
    type: actionTypes.SET_FOCUS_ITEM,
    data: data
});