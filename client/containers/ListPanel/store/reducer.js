import * as actionTypes from './constants';
import { fromJS } from 'immutable';

const defaultState = fromJS({
    list: [],
    itemType: 'dialog',
    focus: ''
});

export default (state = defaultState, action) => {
    switch(action.type) {
        case actionTypes.CHANGE_DIALOG_LIST:
            return state.set('list', action.data);
        case actionTypes.CHANGE_ITEM_TYPE:
            return state.set('itemType', action.data);
        case actionTypes.SET_FOCUS_ITEM:
            return state.set('focus', action.data);
        default:
            return state;
    }
};
