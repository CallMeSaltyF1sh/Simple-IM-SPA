import * as actionTypes from './constants';
import { fromJS } from 'immutable';

const defaultState = fromJS({
    itemType: 'dialog',
    focus: ''
});

export default (state = defaultState, action) => {
    switch(action.type) {
        case actionTypes.CHANGE_ITEM_TYPE:
            return state.set('itemType', action.data);
        case actionTypes.SET_FOCUS_ITEM:
            return state.set('focus', action.data);
        default:
            return state;
    }
};
