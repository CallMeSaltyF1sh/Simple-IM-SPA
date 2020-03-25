import * as actionTypes from './constants';
import { fromJS } from 'immutable';

const defaultState = fromJS({
    list: [],
    targetType: '',
    targetInfo: {}
});

export default (state = defaultState, action) => {
    switch(action.type) {
        case actionTypes.CHANGE_MSG_LIST:
            return state.set('list', action.data);
        case actionTypes.SET_TARGET_TYPE:
            return state.set('targetType', action.data);
        case actionTypes.SET_TARGET_INFO:
            return state.set('targetInfo', action.data);
        default:
            return state;
    }
};
