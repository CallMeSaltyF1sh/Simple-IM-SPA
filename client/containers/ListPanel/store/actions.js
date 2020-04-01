import * as actionTypes from './constants';

export const changeItemType = data => dispatch => {dispatch({
    type: actionTypes.CHANGE_ITEM_TYPE,
    data: data
})};

export const setFocusItem = data => dispatch => {dispatch({
    type: actionTypes.SET_FOCUS_ITEM,
    data: data
})};