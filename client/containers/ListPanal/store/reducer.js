import * as actionTypes from './constants';
import { fromJS } from 'immutable';

const defaultState = fromJS({
    list: []
});

export default (state = defaultState, action) => {
    switch(action.type) {
        case actionTypes.CHANGE_DIALOG_LIST:
            return state.set('list', action.data);
        default:
            return state;
    }
};
